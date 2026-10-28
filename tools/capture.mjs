// 소개 페이지 캡처를 실행 중인 마디 서비스(localhost:3001)에서 다시 찍는다.
// 사용: node tools/capture.mjs <저장 폴더> [항목...]
//   항목: problem rotation note need school overview (생략하면 전부)
// - Playwright는 서비스 저장소(apps/web)에 설치된 것을 빌려 쓴다. 이 저장소에는 node_modules가 없다.
// - 서비스는 직접 띄우지 않는다. 안 떠 있으면 사람에게 알린다.
// - 무엇도 저장(승인·체크·학생 수정)하지 않는다. 주의사항 예시 문구는 화면에만 넣는다.
// - 결과는 2배율 PNG. webp 변환과 자르기는 README의 "캡처 다시 찍기"를 따른다.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const SERVICE_WEB = process.env.MADI_WEB || "/Users/hyunsoo/orca/workspaces/ssyung/architecture/apps/web/package.json";
const BASE = process.env.MADI_URL || "http://localhost:3001";
const DATE = "2026-09-15";
const NOTE = [
  "큰 소리보다 눈을 맞추고 천천히 말하면 편안해해요.",
  "이동 전에 다음 장소를 미리 알려 주면 스스로 준비해요.",
  "활동이 끝나면 구체적으로 칭찬해 주세요.",
].join("\n");

const { chromium } = createRequire(SERVICE_WEB)("@playwright/test");
const [out = "captures", ...only] = process.argv.slice(2);
const want = (k) => only.length === 0 || only.includes(k);
mkdirSync(out, { recursive: true });

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
const go = async (u) => {
  await p.goto(BASE + u, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await p.waitForTimeout(800);
};

// 01 문제: 지원인력 현황 (김지원·이지원·박지원)
if (want("problem")) { await go(`/staff?date=${DATE}`); await p.locator("main.pane").screenshot({ path: `${out}/staff-${DATE}.png` }); }
// 03 고른 배정: 학생 현황판
if (want("rotation")) { await go(`/?date=${DATE}`); await p.locator("main.pane").screenshot({ path: `${out}/board-${DATE}.png` }); }
// 03 필요도·주의사항: 학생 설정의 "지원 설정" 카드
if (want("need") || want("note")) {
  await go("/setup/students");
  if (want("note")) {
    await p.evaluate((note) => {
      const label = [...document.querySelectorAll("main *")].find((e) => e.children.length === 0 && e.textContent.trim() === "지원 방법 · 유의사항");
      let row = label?.parentElement; while (row && !row.textContent.includes("없음")) row = row.parentElement;
      const v = row && [...row.querySelectorAll("*")].find((e) => e.children.length === 0 && e.textContent.trim() === "없음");
      if (v) { v.textContent = note; v.style.whiteSpace = "pre-line"; v.style.lineHeight = "1.6"; }
    }, NOTE);
  }
  await p.locator(".card", { hasText: "지원 설정" }).filter({ hasNotText: "시간표" }).first().screenshot({ path: `${out}/student-support.png` });
}
// 03 교실 위치: 학교 층 배치 표
if (want("school")) { await go("/setup/school"); await p.locator("table").first().screenshot({ path: `${out}/school-floors.png` }); }
// 서비스 전체: 교사용 PC 화면 (1배율 전체 창)
if (want("overview")) {
  const q = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await q.goto(`${BASE}/?date=${DATE}`, { waitUntil: "networkidle" });
  await q.addStyleTag({ content: "nextjs-portal{display:none!important}" }); await q.waitForTimeout(800);
  await q.screenshot({ path: `${out}/overview-desktop.png` });
}
await b.close();
console.log("saved to", out);
