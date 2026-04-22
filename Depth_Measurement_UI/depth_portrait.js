const SEG_P = [
  "M9.34 0.71c0,0-5.17,5.11-5.17,5.11-0.48,0.47-0.67,1.05-0.53,1.67 0.13,0.62 0.54,1.1 1.19,1.41 0,0 13.28,6.23 13.28,6.23 0.37,0.17 0.73,0.25 1.15,0.26 0,0 25.85,0.11 25.85,0.11 0.95,0 1.76-0.43 2.17-1.15 0,0 6.5-11.44 6.5-11.44 0.37-0.65 0.32-1.34-0.13-1.95-0.45-0.6-1.18-0.94-2.02-0.94 0,0-40.45-0.01-40.45-0.01c-0.73,0-1.35,0.24-1.82,0.71z",
  "M64.95 10.61c0,0-2.8-5.63-2.8-5.63-0.36-0.74-1.15-1.2-2.1-1.23-0.95-0.03-1.78,0.37-2.22,1.08 0,0-8.92,14.42-8.92,14.42-0.19,0.3-0.27,0.59-0.27,0.93 0,0 0.01,26.58 0.01,26.58 0,0.79 0.5,1.47 1.34,1.81 0,0 9.13,3.74 9.13,3.74 0.92,0.38 1.98,0.24 2.71-0.37 0,0 2.56-2.1 2.56-2.1 0.48-0.39 0.73-0.88 0.73-1.45 0,0 0.01-37.02 0.01-37.02 0-0.28-0.06-0.52-0.19-0.78z",
  "M64.98 105.4c0,0-2.8,5.63-2.8,5.63-0.37,0.74-1.16,1.2-2.1,1.24-0.95,0.03-1.78-0.37-2.22-1.08 0,0-8.92-14.42-8.92-14.42-0.19-0.3-0.27-0.59-0.27-0.93 0,0 0.01-26.58 0.01-26.58 0-0.79 0.5-1.47 1.34-1.81 0,0 9.13-3.75 9.13-3.75 0.92-0.38 1.98-0.23 2.71,0.37 0,0 2.56,2.1 2.56,2.1 0.48,0.39 0.72,0.88 0.72,1.44 0,0 0.01,37.02 0.01,37.02 0,0.28-0.06,0.52-0.19,0.78z",
  "M9.37 115.3c0,0-5.17-5.11-5.17-5.11-0.48-0.48-0.66-1.05-0.53-1.67 0.13-0.62 0.54-1.1 1.19-1.41 0,0 13.28-6.23 13.28-6.23 0.37-0.17 0.73-0.25 1.15-0.26 0,0 25.84-0.11 25.84-0.11 0.95,0 1.76,0.43 2.17,1.15 0,0 6.49,11.44 6.49,11.44 0.37,0.64 0.32,1.34-0.13,1.95-0.45,0.61-1.18,0.95-2.02,0.95 0,0-40.45,0-40.45,0-0.73,0-1.35-0.24-1.82-0.71z",
  "M3.55 103.85c0,0 11.79-5.35 11.79-5.35 0.8-0.36 1.26-1.01 1.26-1.78 0,0-0.01-26.98-0.01-26.98 0-0.75-0.45-1.4-1.23-1.76 0,0-8.94-4.17-8.94-4.17-0.98-0.45-2.16-0.29-2.91,0.4 0,0-2.76,2.53-2.76,2.53-0.42,0.39-0.63,0.84-0.63,1.36 0,0-0.09,33.96-0.09,33.96 0,0.73 0.42,1.36 1.16,1.73 0.74,0.38 1.6,0.39 2.36,0.05z",
  "M3.52 12.16c0,0 11.79,5.35 11.79,5.35 0.8,0.36 1.26,1.02 1.26,1.78 0,0-0.01,26.97-0.01,26.97 0,0.75-0.45,1.4-1.24,1.77 0,0-8.93,4.16-8.93,4.16-0.98,0.45-2.16,0.29-2.91-0.4 0,0-2.76-2.53-2.76-2.53-0.42-0.39-0.63-0.84-0.63-1.36 0,0-0.09-33.96-0.09-33.96 0-0.73 0.42-1.36 1.16-1.73 0.74-0.38 1.6-0.39 2.36-0.04z",
  "M18 50.83c0,0-11.47,5.02-11.47,5.02-0.81,0.35-1.29,1.02-1.29,1.79 0,0.77 0.47,1.44 1.29,1.79 0,0 11.04,4.86 11.04,4.86 0.36,0.16 0.7,0.23 1.11,0.23 0,0 28.27-0.01 28.27-0.01 0.39,0 0.72-0.07 1.07-0.21 0,0 11.3-4.77 11.3-4.77 0.83-0.35 1.32-1.02 1.32-1.8 0-0.78-0.48-1.45-1.31-1.81 0,0-11.89-5.1-11.89-5.1-0.35-0.15-0.69-0.22-1.08-0.22 0,0-27.25,0-27.25,0-0.4,0-0.75,0.07-1.1,0.23z",
];
const SEG_MAP = [
  [1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
];
const ON = "#FFFFFF";
const OFF = "rgba(255,255,255,0.06)";
const GLOW = "drop-shadow(0 0 3px rgba(255,255,255,0.85))";
const H_BIG = 44;
const H_SM = 28;
const W_BIG = H_BIG * 0.5617;
const W_SM = H_SM * 0.5617;
const COL1_W = 14;
const COL2_W = 10;

function makeSVG(d, h) {
  const w = h * 0.5617;
  let p = "";
  SEG_MAP[d].forEach((on, i) => {
    p += `<path d="${SEG_P[i]}" fill="${on ? ON : OFF}"${on ? ` style="filter:${GLOW}"` : ""}/>`;
  });
  return `<svg viewBox="0 0 65.16 116.01" width="${w}" height="${h}" style="display:block">${p}</svg>`;
}
const CB = Array.from({ length: 10 }, (_, i) => makeSVG(i, H_BIG));
const CS = Array.from({ length: 10 }, (_, i) => makeSVG(i, H_SM));

function buildDisplay() {
  const disp = document.getElementById("seg-disp");
  const sub = document.getElementById("sub-row");
  disp.innerHTML = "";
  sub.innerHTML = "";
  ["sm0", "sm1"].forEach((id) => {
    const d = document.createElement("div");
    d.id = id;
    d.innerHTML = CB[0];
    disp.appendChild(d);
  });
  const c1 = document.createElement("div");
  c1.className = "seg-colon";
  c1.style.cssText = `width:${COL1_W}px;gap:8px;padding-bottom:4px;`;
  c1.innerHTML =
    '<span class="sdot" style="width:5px;height:5px;"></span><span class="sdot" style="width:5px;height:5px;"></span>';
  disp.appendChild(c1);
  ["ss0", "ss1"].forEach((id) => {
    const d = document.createElement("div");
    d.id = id;
    d.innerHTML = CB[0];
    disp.appendChild(d);
  });
  const c2 = document.createElement("div");
  c2.className = "seg-colon";
  c2.style.cssText = `width:${COL2_W}px;gap:5px;padding-bottom:2px;`;
  c2.innerHTML =
    '<span class="sdot" style="width:4px;height:4px;"></span><span class="sdot" style="width:4px;height:4px;"></span>';
  disp.appendChild(c2);
  ["st0", "st1"].forEach((id) => {
    const d = document.createElement("div");
    d.id = id;
    d.innerHTML = CS[0];
    disp.appendChild(d);
  });
  [
    { text: "MM", w: W_BIG * 2 + 2 },
    { sep: ":", sw: COL1_W },
    { text: "SS", w: W_BIG * 2 + 2 },
    { sep: ":", sw: COL2_W },
    { text: "tt", w: W_SM * 2 + 2 },
  ].forEach((g) => {
    const s = document.createElement("span");
    if (g.sep) {
      s.className = "sub-sep";
      s.style.width = g.sw + "px";
    } else {
      s.className = "sub-cell";
      s.style.width = g.w + "px";
    }
    s.textContent = g.sep || g.text;
    sub.appendChild(s);
  });
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

function refreshSaveState() {
  const b = document.getElementById("bsave");
  if (b) b.disabled = run || msEl <= 0;
  updateStartPrompt();
}
function updateStartPrompt() {
  const hint = document.getElementById("start-hint");
  const startBtn = document.getElementById("bst");
  const show = !run && msEl <= 0;
  if (hint) hint.classList.toggle("hidden", !show);
  if (startBtn) startBtn.classList.toggle("start-attn", show);
}
function adjustDistance(delta) {
  const inp = document.getElementById("din");
  if (!inp) return;
  const min = parseFloat(inp.min || "1");
  const max = parseFloat(inp.max || "300");
  const cur = parseFloat(inp.value || "0") || min;
  const next = Math.max(min, Math.min(max, Math.round(cur + delta)));
  inp.value = String(next);
  inp.focus();
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
  const vals = { sm0: +mm[0], sm1: +mm[1], ss0: +ss[0], ss1: +ss[1], st0: +tt[0], st1: +tt[1] };
  const caches = { sm0: CB, sm1: CB, ss0: CB, ss1: CB, st0: CS, st1: CS };
  for (const k in vals) {
    if (vals[k] !== prev[k]) {
      document.getElementById(k).innerHTML = caches[k][vals[k]];
      prev[k] = vals[k];
    }
  }
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
  document.getElementById("bst").style.opacity = ".35";
  document.getElementById("bst").disabled = true;
  document.getElementById("bsp").style.opacity = "1";
  document.getElementById("bsp").disabled = false;
}
function stopSW() {
  clearInterval(iv);
  run = false;
  document.getElementById("bst").style.opacity = "1";
  document.getElementById("bst").disabled = false;
  document.getElementById("bsp").style.opacity = ".35";
  document.getElementById("bsp").disabled = true;
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
function plotPoint() {
  if (run || msEl <= 0) return;
  const d = parseFloat(document.getElementById("din").value);
  if (!d || d <= 0) return;
  const prevPts = pts.map((p) => ({ ...p }));
  undo.push(snapshot(pts));
  redo = [];
  pts.push({ dist: d, sink: msEl });
  stopSW();
  resetSW();
  renderAll("add", prevPts);
}
function undoLast() {
  if (!undo.length) return;
  redo.push(snapshot(pts));
  pts = undo.pop();
  ei = null;
  renderAll();
}
function redoLast() {
  if (!redo.length) return;
  undo.push(snapshot(pts));
  pts = redo.pop();
  ei = null;
  renderAll();
}
function deletePoint(i) {
  undo.push(snapshot(pts));
  redo = [];
  pts.splice(i, 1);
  ei = null;
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
  renderAll();
}
function xMax(v) {
  if (!v.length) return 100;
  return Math.ceil(Math.max(...v) / 10) * 10;
}
function yNice(v) {
  if (!v) return { max: 5, step: 1 };
  const s = v > 10 ? 5 : v > 4 ? 2 : 1;
  return { max: Math.ceil(v / s) * s, step: s };
}
function getYSpec(sourcePts) {
  const yDataMax = sourcePts.length ? Math.max(...sourcePts.map((p) => p.sink / 1000)) : 10;
  return yNice(yDataMax);
}
function applyEqualViewport(xM, yn) {
  const frame = document.getElementById("plot-frame");
  const wrap = document.getElementById("cw");
  if (!frame || !wrap) return;
  if (yAxisMode !== "equal") {
    frame.style.height = "auto";
    frame.style.top = "0";
    frame.style.bottom = "30px";
    return;
  }
  const w = wrap.clientWidth || 1;
  const h = wrap.clientHeight || 1;
  const desired = Math.round(w * (yn.max / Math.max(xM, 1)));
  const clamped = Math.max(140, Math.min(h - 30, desired));
  frame.style.bottom = "auto";
  frame.style.height = clamped + "px";
  frame.style.top = Math.max(0, Math.round((h - 30 - clamped) / 2)) + "px";
}
function toChartData(arr) {
  return arr.map((p) => ({ x: p.dist, y: +(p.sink / 1000).toFixed(2) }));
}
function renderAll(mode, prevPts) {
  const n = pts.length;
  document.getElementById("pc").textContent = n + " pts";
  document.getElementById("lb").textContent = n + " pts";
  const mc = document.getElementById("modal-count");
  if (mc) mc.textContent = n + " pts";
  refreshHistoryButtons();
  renderChart(mode, prevPts);
  renderList();
}
function setChartState(data, xM, yn, anim) {
  if (!chart) {
    chart = new Chart(document.getElementById("c"), {
      type: "scatter",
      data: { datasets: [{ data, backgroundColor: "#ADD144", pointRadius: 3, pointHoverRadius: 4, pointBorderColor: "rgba(0,0,0,0)" }] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: anim,
        layout: { padding: { top: 2, right: 2 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#2C2C2E",
            borderColor: "#3A3A3C",
            borderWidth: 1,
            titleColor: "#ADD144",
            bodyColor: "#8E8E93",
            padding: 10,
            callbacks: { title: (i) => "Distance: " + i[0].parsed.x + "m", body: (i) => "Sink: " + i[0].parsed.y.toFixed(1) + "s" },
          },
        },
        scales: {
          x: {
            type: "linear",
            min: 0,
            max: xM,
            title: { display: true, text: "Distance (m)", color: "#8E8E93", font: { family: "Jost", size: 10 } },
            grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
            border: { display: false },
            ticks: { color: "#8E8E93", font: { family: "Jost", size: 9 }, stepSize: 10 },
          },
          y: {
            min: 0,
            max: yn.max,
            reverse: true,
            title: { display: true, text: "Sink (s)", color: "#8E8E93", font: { family: "Jost", size: 10 } },
            grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
            border: { display: false },
            ticks: { color: "#8E8E93", font: { family: "Jost", size: 9 }, stepSize: yn.step },
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
        : `<div class="rv g e" onclick="startEdit(${i},'dist')" ondblclick="startEdit(${i},'dist')">${p.dist}m</div>`;
      const sc = ei === i && ef === "sink"
        ? `<input class="ei" id="ei" value="${(p.sink / 1000).toFixed(1)}" type="number" inputmode="decimal" min="0" step="0.1" onkeydown="if(event.key==='Enter')commitEdit(${i});if(event.key==='Escape'){ei=null;ef=null;renderList();}" onblur="commitEdit(${i})">`
        : `<div class="rv e" onclick="startEdit(${i},'sink')" ondblclick="startEdit(${i},'sink')">${(p.sink / 1000).toFixed(1)}s</div>`;
      return `<div class="lrow${ei === i ? " ed" : ""}"><div class="rn">${pts.length - ri}</div>${dc}${sc}<button class="bdel" onclick="deletePoint(${i})"><svg width="8" height="9" viewBox="0 0 8 9" fill="none"><path d="M1 2h6M3 3.5v3M5 3.5v3M1.5 2l.4 5h4.2L6 2" stroke="#EA523E" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
    })
    .join("");
  const modalRows = document.getElementById("lr-modal");
  if (modalRows) {
    modalRows.innerHTML = h || '<div style="padding:10px;text-align:center;font-size:11px;color:#8E8E93;">No data</div>';
  }
}
function initMetaDefaults() {
  const t = document.getElementById("chart-time");
  if (!t) return;
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  t.value = local;
}

buildDisplay();
updateSeg(0);
refreshSaveState();
pts = [...PRELOAD_POINTS];
renderAll();
initMetaDefaults();
window.addEventListener("resize", () => renderAll());
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lo) closeTableModal();
});
