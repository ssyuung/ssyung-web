// 캡처 PNG에서 여러 가로 띠를 잘라 위아래로 이어 붙인다 (ImageMagick 없이 Playwright 캔버스로).
// 사용: node tools/stitch.mjs <입력.png> <출력.png> <x> <w> <y1:h1> [y2:h2 ...]
// 예:   node tools/stitch.mjs staff.png s1-problem.png 33 1868 160:92 622:1136
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";

const SERVICE_WEB = process.env.MADI_WEB || "/Users/hyunsoo/orca/workspaces/ssyung/architecture/apps/web/package.json";
const { chromium } = createRequire(SERVICE_WEB)("@playwright/test");
const [src, out, x, w, ...bands] = process.argv.slice(2);
const rows = bands.map((r) => r.split(":").map(Number));

const b = await chromium.launch();
const p = await b.newPage();
const data = await p.evaluate(async ({ b64, x, w, rows }) => {
  const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
  const c = document.createElement("canvas");
  c.width = w; c.height = rows.reduce((s, [, h]) => s + h, 0);
  const g = c.getContext("2d"); let y = 0;
  for (const [sy, h] of rows) { g.drawImage(img, x, sy, w, h, 0, y, w, h); y += h; }
  return c.toDataURL("image/png").split(",")[1];
}, { b64: readFileSync(src).toString("base64"), x: +x, w: +w, rows });
writeFileSync(out, Buffer.from(data, "base64"));
await b.close();
