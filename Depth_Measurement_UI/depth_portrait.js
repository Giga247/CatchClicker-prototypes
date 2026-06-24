function buildDisplay() {
  const disp = document.getElementById("seg-disp");
  const sub = document.getElementById("sub-row");
  if (disp) disp.textContent = "00:00:00";
  if (sub) sub.innerHTML = "";
}

let prev = {};
let t0 = null;
let msEl = 0;
let run = false;
let iv = null;
let yAxisMode = "auto";
let controlsOpen = true;
let pts = [];
let undo = [];
let redo = [];
let chart = null;
let lo = false;
let ei = null;
let ef = null;
let conn = false;
let hasUnsavedChanges = false;
let selectionMode = false;
let selectedPoints = new Set();
let longPressTimer = null;
let longPressPointIndex = null;
let suppressNextPointClick = false;
const POINT_COLORS = { green: "#ADD144", red: "#EA523E" };
const CHART_PLOT_TOP = 12;
const CHART_PLOT_BOTTOM = 61;

function refreshSaveState() {
  const b = document.getElementById("bsave");
  if (b) b.disabled = run || msEl <= 0;
  updateStartPrompt();
}
function setDirty(isDirty = true) {
  hasUnsavedChanges = isDirty;
  const saveBtn = document.getElementById("page-save");
  if (saveBtn) {
    saveBtn.classList.toggle("clean", !hasUnsavedChanges);
    saveBtn.setAttribute("aria-label", hasUnsavedChanges ? "Save chart changes" : "Saved");
  }
}
function saveSession() {
  setDirty(false);
}
function handleBack() {
  if (hasUnsavedChanges && !confirm("You have unsaved changes. Leave without saving?")) return;
  if (window.history.length > 1) window.history.back();
}
function updateStartPrompt() {
  const hint = document.getElementById("start-hint");
  const startBtn = document.getElementById("btoggle") || document.getElementById("bst");
  const show = !run && msEl <= 0;
  if (hint) hint.classList.toggle("hidden", !show);
  if (startBtn) startBtn.classList.toggle("start-attn", show);
}
function adjustDistance(delta) {
  const inp = document.getElementById("din");
  if (!inp) return;
  const min = 1;
  const max = 300;
  const cur = parseFloat(inp.value || "0") || min;
  const next = Math.max(min, Math.min(max, Math.round(cur + delta)));
  inp.value = String(next);
  if (typeof inp.setSelectionRange === "function") {
    const end = inp.value.length;
    inp.setSelectionRange(end, end);
  }
  inp.blur();
  setDirty();
}
function toggleControls() {
  controlsOpen = !controlsOpen;
  const phone = document.getElementById("phone");
  if (phone) phone.classList.toggle("controls-collapsed", !controlsOpen);
  const btn = document.getElementById("bpanel");
  if (btn) {
    btn.textContent = controlsOpen ? "-" : "+";
    btn.title = controlsOpen ? "Hide controls" : "Show controls";
  }
  setTimeout(() => renderAll(), 280);
}
function setYAxisMode(mode, btn) {
  yAxisMode = mode;
  document
    .querySelectorAll(".ymb")
    .forEach((x) => x.classList.toggle("active", x.dataset.mode === mode));
  if (btn) btn.classList.add("active");
  renderAll();
}
function updateSeg(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const hh = Math.floor((ms % 1000) / 10);
  const mm = String(m % 100).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  const tt = String(hh).padStart(2, "0");
  const disp = document.getElementById("seg-disp");
  if (disp) disp.textContent = `${mm}:${ss}:${tt}`;
}
function syncTimerButton() {
  const toggleBtn = document.getElementById("btoggle");
  const toggleLabel = document.getElementById("toggle-label");
  if (toggleBtn) {
    toggleBtn.classList.toggle("is-running", run);
    toggleBtn.classList.toggle("btn-stop", run);
    toggleBtn.classList.toggle("btn-start", !run);
    toggleBtn.setAttribute("aria-label", run ? "Stop timer" : "Start timer");
  }
  if (toggleLabel) toggleLabel.textContent = run ? "Stop" : "Start";
}
function toggleSW() {
  if (run) stopSW();
  else startSW();
}
function startSW() {
  if (run) return;
  msEl = 0;
  prev = {};
  updateSeg(0);
  run = true;
  t0 = Date.now();
  refreshSaveState();
  iv = setInterval(() => {
    msEl = Date.now() - t0;
    updateSeg(msEl);
  }, 30);
  syncTimerButton();
  const oldStart = document.getElementById("bst");
  const oldStop = document.getElementById("bsp");
  if (oldStart) {
    oldStart.style.opacity = ".35";
    oldStart.disabled = true;
  }
  if (oldStop) {
    oldStop.style.opacity = "1";
    oldStop.disabled = false;
  }
}
function stopSW() {
  clearInterval(iv);
  run = false;
  syncTimerButton();
  const oldStart = document.getElementById("bst");
  const oldStop = document.getElementById("bsp");
  if (oldStart) {
    oldStart.style.opacity = "1";
    oldStart.disabled = false;
  }
  if (oldStop) {
    oldStop.style.opacity = ".35";
    oldStop.disabled = true;
  }
  refreshSaveState();
}
function resetSW() {
  msEl = 0;
  updateSeg(0);
  prev = {};
  refreshSaveState();
}

const PRELOAD_POINTS = [];

function snapshot(v) {
  return JSON.parse(JSON.stringify(v));
}
function refreshHistoryButtons() {
  const bu = document.getElementById("bundo");
  const br = document.getElementById("bredo");
  if (bu) bu.disabled = !undo.length;
  if (br) br.disabled = !redo.length;
}
function pointColor(point) {
  return point.color || "green";
}
function hasMultiplePointColors() {
  return new Set(pts.map(pointColor)).size > 1;
}
function updateLegendVisibility() {
  const legend = document.getElementById("chart-legend");
  const chartWrap = document.getElementById("cw");
  if (!legend) return;
  const show = selectionMode || hasMultiplePointColors();
  legend.classList.toggle("is-hidden", !show);
  legend.setAttribute("aria-hidden", show ? "false" : "true");
  if (chartWrap) chartWrap.classList.toggle("selecting", selectionMode);
}
function clearPointSelection() {
  selectionMode = false;
  selectedPoints.clear();
  updateLegendVisibility();
  if (chart) chart.update("none");
}
function togglePointSelection(index) {
  if (index == null || index < 0 || index >= pts.length) return;
  selectionMode = true;
  if (selectedPoints.has(index)) selectedPoints.delete(index);
  else selectedPoints.add(index);
  if (!selectedPoints.size) selectionMode = false;
  updateLegendVisibility();
  if (chart) chart.update("none");
}
function applySelectedColor(color) {
  if (!selectedPoints.size || !POINT_COLORS[color]) return;
  undo.push(snapshot(pts));
  redo = [];
  selectedPoints.forEach((index) => {
    if (pts[index]) pts[index].color = color;
  });
  setDirty();
  clearPointSelection();
  renderAll();
}
function plotPoint() {
  if (run || msEl <= 0) return;
  const d = parseFloat(document.getElementById("din").value);
  if (!d || d <= 0) return;
  const prevPts = pts.map((p) => ({ ...p }));
  undo.push(snapshot(pts));
  redo = [];
  pts.push({ dist: d, sink: msEl, color: "green" });
  stopSW();
  resetSW();
  setDirty();
  renderAll("add", prevPts);
}
function undoLast() {
  if (!undo.length) return;
  redo.push(snapshot(pts));
  pts = undo.pop();
  ei = null;
  selectedPoints.clear();
  selectionMode = false;
  setDirty();
  renderAll();
}
function redoLast() {
  if (!redo.length) return;
  undo.push(snapshot(pts));
  pts = redo.pop();
  ei = null;
  selectedPoints.clear();
  selectionMode = false;
  setDirty();
  renderAll();
}
function deletePoint(i) {
  undo.push(snapshot(pts));
  redo = [];
  pts.splice(i, 1);
  ei = null;
  selectedPoints.clear();
  selectionMode = false;
  setDirty();
  renderAll();
}
function clearAll(e) {
  if (e) e.stopPropagation();
  if (!pts.length) return;
  if (!confirm("Clear all?")) return;
  undo.push(snapshot(pts));
  redo = [];
  pts = [];
  ei = null;
  selectedPoints.clear();
  selectionMode = false;
  setDirty();
  renderAll();
}
function toggleList() {
  if (lo) closeTableModal();
  else openTableModal();
}
function openTableModal() {
  lo = true;
  const modal = document.getElementById("table-modal");
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  const lw = document.getElementById("lw");
  if (lw) lw.classList.add("open");
  const la = document.getElementById("la");
  if (la) la.style.transform = "rotate(180deg)";
  document.body.classList.add("modal-open");
  renderList();
}
function closeTableModal() {
  lo = false;
  const modal = document.getElementById("table-modal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
  const lw = document.getElementById("lw");
  if (lw) lw.classList.remove("open");
  const la = document.getElementById("la");
  if (la) la.style.transform = "rotate(0)";
  document.body.classList.remove("modal-open");
}
function toggleConnect() {
  conn = !conn;
  document.getElementById("cbtn").classList.toggle("on", conn);
  document.getElementById("clbl").textContent = conn ? "Connected" : "Connect";
  setDirty();
}
function startEdit(i, f) {
  ei = i;
  ef = f;
  renderList();
  setTimeout(() => {
    const el = document.getElementById("ei");
    if (el) {
      el.focus();
      el.select();
    }
  }, 20);
}
function commitEdit(i) {
  const el = document.getElementById("ei");
  if (!el) return;
  const v = parseFloat(el.value);
  if (isNaN(v) || v < 0) {
    ei = null;
    ef = null;
    renderList();
    return;
  }
  undo.push(snapshot(pts));
  redo = [];
  if (ef === "dist") pts[i].dist = v;
  else pts[i].sink = Math.round(v * 1000);
  ei = null;
  ef = null;
  setDirty();
  renderAll();
}
function xMax(v) {
  if (!v.length) return 60;
  return Math.max(60, Math.ceil(Math.max(...v) / 10) * 10);
}
function yNice(v) {
  if (!v) return { max: 6, step: 1 };
  const s = v > 6 ? 2 : 1;
  return { max: Math.max(6, Math.ceil(v / s) * s), step: s };
}
function getYSpec(sourcePts) {
  const yDataMax = sourcePts.length ? Math.max(...sourcePts.map((p) => p.sink / 1000)) : 6;
  return yNice(yDataMax);
}
function applyEqualViewport(xM, yn) {
  const frame = document.getElementById("plot-frame");
  const wrap = document.getElementById("cw");
  if (!frame || !wrap) return;
  if (yAxisMode !== "equal") {
    frame.style.height = "auto";
    frame.style.top = CHART_PLOT_TOP + "px";
    frame.style.bottom = CHART_PLOT_BOTTOM + "px";
    return;
  }
  const w = wrap.clientWidth || 1;
  const h = wrap.clientHeight || 1;
  const desired = Math.round(w * (yn.max / Math.max(xM, 1)));
  const available = Math.max(140, h - CHART_PLOT_TOP - CHART_PLOT_BOTTOM);
  const clamped = Math.max(140, Math.min(available, desired));
  frame.style.bottom = "auto";
  frame.style.height = clamped + "px";
  frame.style.top = CHART_PLOT_TOP + Math.max(0, Math.round((available - clamped) / 2)) + "px";
}
function toChartData(arr) {
  return arr.map((p, i) => ({ x: p.dist, y: +(p.sink / 1000).toFixed(2), color: pointColor(p), index: i }));
}
function renderAll(mode, prevPts) {
  const n = pts.length;
  document.getElementById("pc").textContent = n + " pts";
  document.getElementById("lb").textContent = "Points: " + n;
  const mc = document.getElementById("modal-count");
  if (mc) mc.textContent = n + " pts";
  refreshHistoryButtons();
  updateLegendVisibility();
  renderChart(mode, prevPts);
  renderList();
}
function setChartState(data, xM, yn, anim) {
  if (!chart) {
    chart = new Chart(document.getElementById("c"), {
      type: "scatter",
      data: {
        datasets: [{
          data,
          backgroundColor: (ctx) => POINT_COLORS[(ctx.raw && ctx.raw.color) || "green"],
          pointRadius: (ctx) => (ctx.raw && selectedPoints.has(ctx.raw.index) ? 7 : 5),
          pointHoverRadius: 7,
          pointBorderColor: (ctx) => (ctx.raw && selectedPoints.has(ctx.raw.index) ? "#FFFFFF" : "rgba(0,0,0,0)"),
          pointBorderWidth: (ctx) => (ctx.raw && selectedPoints.has(ctx.raw.index) ? 2 : 0),
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: anim,
        layout: { padding: { top: 0, right: 6, bottom: 4, left: 0 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#272525",
            borderColor: "#6A6264",
            borderWidth: 1,
            titleColor: "#ADD144",
            bodyColor: "#A9A2A4",
            padding: 10,
            callbacks: { title: (i) => "Distance: " + i[0].parsed.x + "m", body: (i) => "Sink: " + i[0].parsed.y.toFixed(1) + "s" },
          },
        },
        scales: {
          x: {
            type: "linear",
            min: 0,
            max: xM,
            title: { display: true, text: "Distance [m]", color: "#A9A2A4", font: { family: "Jost", size: 10 } },
            grid: { color: "rgba(169,162,164,0.16)", drawBorder: false },
            border: { display: false },
            ticks: { color: "#A9A2A4", font: { family: "Jost", size: 10 }, stepSize: 10 },
          },
          y: {
            min: 0,
            max: yn.max,
            reverse: true,
            title: { display: true, text: "Sink time [s]", color: "#A9A2A4", font: { family: "Jost", size: 10 } },
            grid: { color: "rgba(169,162,164,0.16)", drawBorder: false },
            border: { display: false },
            ticks: { color: "#A9A2A4", font: { family: "Jost", size: 10 }, stepSize: yn.step },
          },
        },
      },
    });
    return;
  }
  chart.data.datasets[0].data = data;
  chart.options.animation = anim;
  chart.options.scales.x.max = xM;
  chart.options.scales.y.max = yn.max;
  chart.options.scales.y.ticks.stepSize = yn.step;
  chart.update();
}
function renderChart(mode, prevPts) {
  const data = toChartData(pts);
  const xM = xMax(pts.map((p) => p.dist));
  const yn = getYSpec(pts);
  applyEqualViewport(xM, yn);
  if (mode === "add" && prevPts && prevPts.length + 1 === pts.length) {
    const oldYn = getYSpec(prevPts);
    applyEqualViewport(xM, oldYn);
    const oldData = toChartData(prevPts);
    const last = pts[pts.length - 1];
    const dropFromTop = [...oldData, { x: last.dist, y: 0 }];
    const dropToTarget = [...oldData, { x: last.dist, y: +(last.sink / 1000).toFixed(2) }];
    setChartState(dropFromTop, xM, oldYn, { duration: 0 });
    setChartState(dropToTarget, xM, oldYn, {
      duration: 800,
      easing: "easeOutCubic",
      onComplete: () => {
        applyEqualViewport(xM, yn);
        setChartState(data, xM, yn, { duration: 320, easing: "easeOutCubic" });
      },
    });
    return;
  }
  setChartState(data, xM, yn, { duration: 200, easing: "easeOutCubic" });
}
function renderList() {
  const a = [...pts.map((p, i) => ({ ...p, oi: i }))].reverse();
  const h = a
    .map((p, ri) => {
      const i = p.oi;
      const dc = ei === i && ef === "dist"
        ? `<input class="ei" id="ei" value="${p.dist}" type="number" inputmode="decimal" style="color:#ADD144;" onkeydown="if(event.key==='Enter')commitEdit(${i});if(event.key==='Escape'){ei=null;ef=null;renderList();}" onblur="commitEdit(${i})">`
        : `<div class="rv ${pointColor(p) === "red" ? "" : "g"} e" onclick="startEdit(${i},'dist')" ondblclick="startEdit(${i},'dist')">${p.dist}m</div>`;
      const sc = ei === i && ef === "sink"
        ? `<input class="ei" id="ei" value="${(p.sink / 1000).toFixed(1)}" type="number" inputmode="decimal" min="0" step="0.1" onkeydown="if(event.key==='Enter')commitEdit(${i});if(event.key==='Escape'){ei=null;ef=null;renderList();}" onblur="commitEdit(${i})">`
        : `<div class="rv e" onclick="startEdit(${i},'sink')" ondblclick="startEdit(${i},'sink')">${(p.sink / 1000).toFixed(1)}s</div>`;
      return `<div class="lrow${ei === i ? " ed" : ""}"><div class="rn">${pts.length - ri}</div>${dc}${sc}<button class="bdel" onclick="deletePoint(${i})" aria-label="Delete point">x</button></div>`;
    })
    .join("");
  const modalRows = document.getElementById("lr-modal");
  if (modalRows) {
    modalRows.innerHTML = h || '<div style="padding:10px;text-align:center;font-size:11px;color:#A9A2A4;">No data</div>';
  }
}
function initMetaDefaults() {
  const t = document.getElementById("chart-time");
  if (t && !t.value) t.value = "19/06/2026";
  ["chart-name", "chart-time", "chart-location"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", () => setDirty());
  });
}
function initDistanceInputBehavior() {
  const din = document.getElementById("din");
  if (!din) return;
  const selectAll = () => din.select();
  const normalize = () => {
    const digits = (din.value || "").replace(/[^\d]/g, "").slice(0, 3);
    if (!digits) {
      din.value = "1";
      return;
    }
    const clamped = Math.max(1, Math.min(300, parseInt(digits, 10)));
    din.value = String(clamped);
  };
  din.addEventListener("input", () => {
    din.value = (din.value || "").replace(/[^\d]/g, "").slice(0, 3);
    setDirty();
  });
  din.addEventListener("blur", normalize);
  din.addEventListener("focus", selectAll);
  din.addEventListener("click", selectAll);
}
function chartPointIndexFromEvent(event) {
  if (!chart) return null;
  const hits = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false);
  if (!hits.length) return null;
  const raw = chart.data.datasets[hits[0].datasetIndex].data[hits[0].index];
  return raw ? raw.index : null;
}
function initChartPointSelection() {
  const canvas = document.getElementById("c");
  if (!canvas) return;
  canvas.addEventListener("pointerdown", (event) => {
    const index = chartPointIndexFromEvent(event);
    longPressPointIndex = index;
    clearTimeout(longPressTimer);
    if (index == null) return;
    longPressTimer = setTimeout(() => {
      suppressNextPointClick = true;
      togglePointSelection(longPressPointIndex);
    }, 520);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    canvas.addEventListener(eventName, () => {
      clearTimeout(longPressTimer);
      longPressTimer = null;
      longPressPointIndex = null;
    });
  });
  canvas.addEventListener("click", (event) => {
    const index = chartPointIndexFromEvent(event);
    if (suppressNextPointClick) {
      suppressNextPointClick = false;
      return;
    }
    if (selectionMode && index != null) togglePointSelection(index);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && selectionMode) clearPointSelection();
  });
}
function initLegendEditing() {
  ["legend-green", "legend-red"].forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.addEventListener("input", () => setDirty());
  });
}

buildDisplay();
updateSeg(0);
refreshSaveState();
pts = [...PRELOAD_POINTS];
renderAll();
initMetaDefaults();
initDistanceInputBehavior();
initChartPointSelection();
initLegendEditing();
setDirty(false);
window.addEventListener("resize", () => renderAll());
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lo) closeTableModal();
});
