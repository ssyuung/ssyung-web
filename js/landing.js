// 소개 페이지(index.html) 동작: 등장 애니메이션, 01·02 시연, 문의 폼
(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 등장 애니메이션: 화면에 닿으면 재생, 한 화면 이상 멀어지면 조용히 초기화해 다시 돌아올 때 또 재생한다.
  // 빠르게 스크롤하는 중에 들어온 요소는 기다리지 않게 움직임 없이 바로 보여 준다(.instant). 시연 상태는 건드리지 않는다
  const els = document.querySelectorAll(".reveal");
  const hero = document.querySelector(".hero");
  if (still || !("IntersectionObserver" in window)) els.forEach((e) => e.classList.add("in"));
  else {
    let lastY = scrollY, lastT = performance.now(), speed = 0;   // px/ms, 최근 값과 평균
    addEventListener("scroll", () => {
      const t = performance.now();
      speed = (speed + Math.abs(scrollY - lastY) / Math.max(1, t - lastT)) / 2;
      lastY = scrollY; lastT = t;
    }, { passive: true });
    const fast = () => performance.now() - lastT < 120 && speed > 1.5;

    // el이 화면(상단 바 아래)에 닿으면 enter, 위아래로 한 화면 넘게 멀어지면 leave
    const watch = (el, enter, leave) => {
      new IntersectionObserver(([x]) => x.isIntersecting && enter(), { rootMargin: "-64px 0px 0px 0px" }).observe(el);
      new IntersectionObserver(([x]) => x.isIntersecting || leave(), { rootMargin: "100% 0px 100% 0px" }).observe(el);
    };
    // 한 프레임 동안 .instant를 붙여 전환 없이 상태를 바꾼다
    const instantly = (el, change) => { el.classList.add("instant"); change(); void el.offsetWidth; requestAnimationFrame(() => el.classList.remove("instant")); };

    els.forEach((el) => watch(el,
      () => fast() ? instantly(el, () => el.classList.add("in")) : el.classList.add("in"),
      () => instantly(el, () => el.classList.remove("in"))));

    // 히어로는 CSS 애니메이션이라 .instant를 벗어날 때까지 붙여 둔다
    hero.classList.add("play");
    watch(hero,
      () => { if (!hero.classList.contains("play")) hero.classList.add("play", ...(fast() ? ["instant"] : [])); },
      () => hero.classList.remove("play", "instant"));
  }

  // 01 시연: 실제 9월 15일 계산 결과 세 안 중 하나를 골라 확정
  const PICK = {
    A: [["체육관 이동 (10:30)", "맡을 사람 없음", 1], ["활동 지원 (3교시)", "맡을 사람 없음", 1]],
    B: [["체육관 이동 (10:30)", "김지원 · 10분 늦게 도착", 0], ["교실 복귀 이동 (11:20)", "이지원", 0], ["활동 지원 (3교시)", "맡을 사람 없음", 1]],
    C: [["체육관 이동 (10:30)", "맡을 사람 없음", 1], ["활동 지원 (3교시)", "맡을 사람 없음", 1], ["교실 복귀 이동 (11:20)", "맡을 사람 없음", 1]],
  };
  const pick = document.getElementById("pick");
  const optBtns = pick.querySelectorAll(".opt");
  const pickList = document.getElementById("pick-list"), pickOk = document.getElementById("pick-ok");
  const pickReset = document.getElementById("pick-reset"), pickDone = document.getElementById("pick-done");
  let chosen = "A";
  const renderPick = () => {
    optBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.k === chosen)));
    // 세 안의 목록을 같은 자리에 겹쳐 두고 고른 안만 보여 준다. 칸 높이는 가장 긴 안에 맞춰 그대로 유지된다
    pickList.innerHTML = Object.entries(PICK).map(([k, rows]) => `<ul aria-hidden="${k !== chosen}">${rows.map(([what, who, gap]) => `<li>${what} → <span class="${gap ? "gap" : ""}">${who}</span></li>`).join("")}</ul>`).join("");
    pickOk.textContent = `${chosen}안으로 확정`;
  };
  optBtns.forEach((b) => b.addEventListener("click", () => { if (pick.classList.contains("done")) return; chosen = b.dataset.k; renderPick(); }));
  pickOk.addEventListener("click", () => {
    pick.classList.add("done");
    pickDone.textContent = `${chosen}안으로 확정했어요. 바뀐 지원인력 2명에게 알림을 보냈어요.`;
    pickOk.hidden = true; pickReset.hidden = false; pickReset.focus();
  });
  pickReset.addEventListener("click", () => {
    pick.classList.remove("done"); chosen = "A"; pickDone.textContent = "";
    pickReset.hidden = true; pickOk.hidden = false; renderPick();
  });
  renderPick();

  // 02 시연: 정해 둔 한 칸(6교시 강바다 음악)만 김지원 → 이지원. 이지원은 13:40–14:30이 비어 있어 다른 배정과 겹치지 않는다
  const job = document.getElementById("demo-job");
  const slotA = document.getElementById("slot-a"), slotB = document.getElementById("slot-b");
  const go = document.getElementById("demo-go"), reset = document.getElementById("demo-reset");
  const hint = document.getElementById("demo-hint"), shot = document.getElementById("m-shot");
  const hintBefore = hint.innerHTML, shotBefore = { src: shot.src, alt: shot.alt };
  const shotAfter = { src: "images/app-today-pm.webp", alt: "지원인력 앱 오늘 화면. 9월 18일 이지원 선생님의 오후 일정. 13:50 강바다 5-5" };
  new Image().src = shotAfter.src;
  go.addEventListener("click", () => {
    slotB.appendChild(job);
    shot.src = shotAfter.src; shot.alt = shotAfter.alt;
    hint.innerHTML = "<b>6교시 강바다</b> 담당을 이지원 선생님으로 바꿨어요";
    go.hidden = true; reset.hidden = false; reset.focus();
  });
  reset.addEventListener("click", () => {
    slotA.appendChild(job);
    shot.src = shotBefore.src; shot.alt = shotBefore.alt;
    hint.innerHTML = hintBefore;
    reset.hidden = true; go.hidden = false; go.focus();
  });

  // 문의
  const form = document.getElementById("inquiry");
  const status = document.getElementById("f-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "status";
    const email = form.email.value.trim(), school = form.school.value.trim();
    if (!email || !form.email.checkValidity()) { status.className = "status bad"; status.textContent = "이메일 주소를 확인해 주세요."; form.email.focus(); return; }
    if (!school) { status.className = "status bad"; status.textContent = "학교 이름을 적어 주세요."; form.school.focus(); return; }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; status.textContent = "보내는 중…";
    try {
      const r = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      status.className = "status ok"; status.textContent = "문의를 받았어요. 곧 연락드릴게요.";
    } catch {
      status.className = "status bad"; status.textContent = "보내지 못했어요. 잠시 뒤 다시 시도해 주세요.";
    } finally {
      btn.disabled = false;
    }
  });
})();
