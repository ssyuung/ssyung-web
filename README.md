# ssyung-web — 마디(MADI) 소개 페이지

특수학급 지원인력 배치 서비스 **마디(MADI)** 의 고객용 랜딩 페이지입니다. 저장소 이름(ssyung)과 서비스 이름(마디)이 다릅니다. 화면과 문구에는 항상 "마디"를 씁니다.

- 정적 사이트, 빌드 도구 없음. 파일 구성:

  | 파일 | 내용 |
  |---|---|
  | `index.html` | 소개 페이지 본문과 메타 태그·구조화 데이터(JSON-LD) |
  | `privacy.html` | 개인정보 처리방침 |
  | `css/tokens.css` | 두 페이지가 함께 쓰는 색·글꼴 토큰(밝은·어두운 테마) |
  | `css/landing.css` | 소개 페이지 스타일 |
  | `css/privacy.css` | 처리방침 페이지 스타일 |
  | `js/landing.js` | 등장 애니메이션, 01·02 시연, 문의 폼 |
  | `images/` | 캡처와 그림(webp) |
  | `robots.txt`, `sitemap.xml` | 검색·웹필터 수집용 |
  | `tools/` | 캡처·이어 붙이기 스크립트 |
  | `docs/` | 이미지 작업 지시서 |
- 처리방침은 실제 처리와 맞아야 한다: 문의는 Formspree(미국) → Gmail(Google)로 가고 정식 출시 안내까지 보관, 늦어도 문의일로부터 1년 뒤 파기(요청 시 즉시). 수집 항목·업체·보관이 바뀌면 `privacy.html`과 시행일도 고친다.
- `CNAME`이 `madiedu.com`이라 **main에 push하면 공개될 수 있습니다.** 작업은 브랜치에서 하고, main merge는 사람이 정합니다.
- 독자: 특수교사·학교 관리자. 개발 용어 없이 쉬운 말로 씁니다.

## 페이지 구성

구역(`.page`)마다 한 화면 높이입니다. 순서:

| # | 구역 | 클래스 / id | 내용 |
|---|---|---|---|
| 1 | 히어로 | `.hero` | 로고 자리 → "마디마다, 함께." → 설명 → [마디 살펴보기] |
| 2 | 01 문제 | `#s1.s1-problem` | 이교사 말풍선, 김교사 말풍선, 지원인력 시간표 캡처 |
| 3 | 01 해결 | `.s1-solve` | 배정안 A·B·C 선택 시연 (`#pick`) + 설명 둘 |
| 4 | 02 문제 | `#s2.s2-problem` | "어? 가영이는…" + 복도에서 기다리는 학생 그림 (`s2-waiting.webp`) |
| 5 | 02 해결 | `.s2-solve` | PC 시간표 → 휴대폰 담당 변경 시연 (`#demo`) + 알림·완료 캡처 자리 |
| 6 | 03 문제 | `#s3.s3-problem` | 학생별 요구사항 카드 7장 (가상 예시) |
| 7 | 03 해결 | `.s3-solve` | 설정 기능 네 개 2×2 |
| 8 | 서비스 전체 | `.overview` | 교사용 PC 화면 + 휴대폰 목업 |
| 9 | 도입 문의 | `#contact.cta` | Formspree 폼 |

상단 메뉴: "주요 기능"(→ `#s1`), [도입 문의](→ `#contact`).

## 디자인 규칙 (사용자가 정한 것, 지킨다)

- **Calm Editorial.** 아이보리 바탕, 브라운 제목, Pretendard 하나. 그린은 해결 문구·디테일·버튼에만.
- 색은 `css/tokens.css`의 `:root` 토큰으로만. 브랜드 팔레트:
  - MADI Green `#286B50`, MADI Brown `#49372F`, Light Green `#A8D5B8`
  - Background `#FAF9F6` / Secondary `#F2EFE9`, 문제 영역 Warm Gray `#F0EEE8`
  - Text `#302F2C` / Secondary `#817B73`, Border `#DDD9D1`
  - Status: Success `#709A80` Warning `#C18A45` Error `#C46F65` Info `#718FA3`
  - 글자에 쓸 때(밝은 테마): Secondary는 `#6F6A63`, Error는 `#AC4D42`. 원래 값은 바탕과의 대비가 4.5:1에 못 미쳐 같은 색조로 진하게 했다(`css/tokens.css`).
- 문제 영역 배경은 `--problem`(#F0EEE8), 해결 영역은 `--ivory`(#FAF9F6). 그라데이션으로 섞지 않는다.
- **금지:** 섹션 번호·작은 라벨("01 / …", "마디의 해결"), 손글씨·형광펜·테이프·색연필, 장식 아이콘, 숫자 꼬리표, 화면에 드러나는 `[연락처 자리]` 같은 문구, 억지 줄바꿈(`max-width`, `text-wrap: balance`), 불필요한 쉼표.
- 지시에 없는 장식·카피·모션은 넣지 않는다. 다른 섹션을 고치라는 말이 없으면 건드리지 않는다.
- 밝은·어두운 테마 둘 다 유지. 페이지 전체 가로 스크롤 금지(넓은 캡처는 `.scroll-x` 안에서만).

## 내용 규칙

- 이름은 모두 가명: 학생 김가영·이나연·최라희·정마루·박다은·강바다·조사랑, 지원인력 김지원·이지원·박지원, 교사 김교사·이교사.
- 지원인력에게는 "출장"이라는 개념이 없다. 부재는 병가·조퇴 등으로 쓴다.
- **실제 서비스 결과와 어긋나게 쓰지 않는다.** 캡처와 시연 숫자는 9월 15일(화) 실제 계산 결과다.
  - 01: 김가영 3교시 체육관 지원 요청. 안 A 11/5/1/2, B 6/5/4/2, C 11/6/0/2 (바뀌는 칸/지원 공백/늦게 도착/알림). 어떤 안도 활동 중 추가 지원은 채우지 못한다 → "맡을 사람 없음"으로 그대로 보여 준다.
  - 02: 바꿀 수 있는 칸은 **6교시 강바다 음악 하나뿐**(김지원 → 이지원). 이지원은 13:40–14:30이 실제로 비어 있어 충돌이 없다. 아무 칸이나 옮기게 만들지 않는다(01의 "지원 필요도를 고려한 배정"과 모순되므로).
- 아직 구현되지 않은 기능(사용자가 넣기로 결정한 것): "여러 지원인력의 고른 배정"은 원칙만 있고 알고리즘은 보류 상태다. 지원인력 모바일 앱은 아직 없다.

## 아직 비어 있는 자리

자료가 오면 채운다. 이미지를 지어내지 않는다.

| 자리 | 위치 | 넣는 방법 |
|---|---|---|
| 로고 애니메이션 | `#logo-anim` | 심벌은 들어가 있다(움직임 없음). 자소 id `#j-m #j-a #j-d #j-i`로 결합 애니메이션을 붙인다 |

지원인력 앱 캡처(02 해결 휴대폰·알림·완료, 서비스 전체 휴대폰)는 채워져 있다. 다만 앱은 아직 목데이터(9월 18일, A02 이지원)로 돌고 있어 랜딩의 9월 15일 시나리오와 날짜·과목(앱 13:50 강바다는 미술, 교사 시간표는 음악)이 다르다. 앱이 실제 서버 데이터로 돌면 다시 찍는다.

## 동작 (`js/landing.js`)

- **스크롤**: 브라우저 기본 스크롤. 풀페이지 넘김과 스크롤 스냅은 쓰지 않는다(뚝뚝 끊겨서 뺐다). 구역마다 높이는 한 화면에 맞춘다.
- **등장 애니메이션**: `.reveal` → 화면에 닿으면 `.in`. 한 화면 이상 멀어지면 조용히 초기화해 돌아올 때 다시 재생한다(살짝 벗어났다 돌아오면 그대로). 빠르게 스크롤하는 중(약 1.5px/ms 이상)에 들어온 요소는 `.instant`로 움직임 없이 바로 보인다. 순서 간격은 0.1초. 히어로는 `.hero.play`.
- **시연 상태**(01 고른 안, 02 바뀐 담당)는 다른 구역에 다녀와도 유지. [처음으로]로만 초기화.
- `prefers-reduced-motion`: 애니메이션 없이 바로 보인다.
- 새로고침하면 맨 위에서 시작(`history.scrollRestoration = "manual"`).
- 문의 폼: `https://formspree.io/f/mrpppjoz` 로 이메일·학교 이름·추가 문의사항을 보낸다.

## 캡처 다시 찍기

캡처는 실행 중인 마디 서비스(`http://localhost:3001`)에서 찍는다.

- **서비스 저장소 `~/orca/workspaces/ssyung/architecture`는 읽기만 한다. 고치거나 서비스를 띄우지 않는다.** 안 떠 있으면 사람에게 알린다.
- 승인·완료 체크·학생 수정처럼 서비스 상태를 바꾸는 조작은 사람에게 먼저 묻는다. 설정 화면 예시 문구는 저장하지 말고 캡처 때 화면에만 넣는다(`tools/capture.mjs`가 그렇게 한다).
- 해석기는 아직 가짜라 `fixtures/change-requests/cases.json`의 문장만 알아듣는다.

```bash
node tools/capture.mjs /tmp/madi-cap          # 원본 PNG(2배율)
# 잘라서 webp로 (좌표는 2배율 PNG 기준, UI가 바뀌면 다시 잡는다)
node tools/stitch.mjs /tmp/madi-cap/staff-2026-09-15.png /tmp/p.png 33 1868 160:92 622:1136 && cwebp -q 88 /tmp/p.png -o images/s1-problem.webp
node tools/stitch.mjs /tmp/madi-cap/board-2026-09-15.png /tmp/r.png 30 1750 140:190 740:900 && cwebp -q 88 /tmp/r.png -o images/s3-rotation.webp
cwebp -q 88 -crop 440 320 640 260 /tmp/madi-cap/student-support.png -o images/s3-need.webp
cwebp -q 90 -crop 0 790 1300 208  /tmp/madi-cap/student-support.png -o images/s3-note.webp
cwebp -q 88 -crop 0 0 1200 502    /tmp/madi-cap/school-floors.png   -o images/s3-school.webp
cwebp -q 88 /tmp/madi-cap/overview-desktop.png -o images/overview-desktop.webp
```

지원인력 앱 캡처는 Expo 웹 개발 서버(`http://localhost:8081`, 서비스 저장소 `apps/mobile`)를 390×844·2배율로 찍는다. 첫 화면(알림 팝업) → `app-notice.webp`(팝업 중심 4:3 자르기), 팝업을 닫은 화면 → `app-today.webp`, 맨 아래로 스크롤한 화면 → `app-today-pm.webp`, 13:50 강바다 카드를 눌러 펼친 화면 → `app-support.webp`(카드 위부터 4:3 자르기). 역시 서버를 직접 띄우지 않는다.

이미지를 바꾸면 `index.html`의 `width`·`height`(2배율 픽셀의 절반)와 `alt`도 맞춘다.

| 파일 | 원본 | 쓰는 곳 |
|---|---|---|
| `s1-problem.webp` | 지원인력 현황 9/15, 이름 줄 + 09:40–11:30 | 01 문제 |
| `s3-need.webp` | 학생 설정 지원 과목·구간 | 03 학생별 지원 필요도 |
| `s3-note.webp` | 학생 설정 지원 방법·유의사항(예시 문구) | 03 주의사항 |
| `s3-school.webp` | 학교 층 배치 표 | 03 교실 위치 |
| `s3-rotation.webp` | 학생 현황판 9/15, 이름 줄 + 09:40–11:20 | 03 고른 배정 |
| `overview-desktop.webp` | 교사용 현황판 전체 창 | 서비스 전체, og:image |
| `app-today.webp` | 지원인력 앱 오늘 화면(위) | 02 해결 휴대폰(처음), 서비스 전체 휴대폰 |
| `app-today-pm.webp` | 지원인력 앱 오늘 화면(아래, 13:50 강바다) | 02 해결 휴대폰([이지원에게 맡기기] 뒤) |
| `app-notice.webp` | 앱 변경 알림 팝업 | 02 해결 변경 즉시 알림 |
| `s2-waiting.webp` | 원본 `~/orca/ssyung-docs/images/waiting_student.png`(1672×941, 공개되지 않게 저장소 밖에 둠) 변환, `cwebp -q 85` | 02 문제 (`.photo`, `object-fit: cover`로 화면 비율에 맞춰 자름) |
| `app-support.webp` | 앱 일정 카드 펼침(행동 관찰) | 02 해결 학생별 지원 완료 확인 |
| `madi-symbol.svg` | 공식 심벌 원본 | 히어로 `#logo-anim`(색을 테마 토큰으로 바꿔 인라인) |
| `madi-wordmark.svg` | 공식 워드마크 원본 | 상단 `.brand`(두 페이지, 색을 테마 토큰으로 바꿔 인라인) |
| `favicon.svg`, `favicon-32.png` | 심벌 + 아이보리 둥근 칸(여백 9) | 브라우저 탭 |
| `apple-touch-icon.png` | 같은 그림, 각진 정사각형 180px(iOS가 모서리를 깎음) | 휴대폰 홈 화면 |

## 확인

수정 뒤에는 브라우저(Playwright)로 실제 렌더링해 본다.

- 데스크톱 1440×900, 1280×800, 1366×700에서 각 `.page`가 한 화면에 들어오는지
- 휴대폰 390×844에서 가로 스크롤이 없는지
- 01 배정안 선택·확정·처음으로, 02 담당 바꾸기·처음으로가 동작하는지, 콘솔 오류가 없는지
