---
name: promo-studio
description: 웹 앱의 홍보물(쇼츠/릴스 영상, 썸네일, 스토어 에셋)을 Remotion으로 만들 때 공통으로 쓰는 프로젝트 구조·파일명 규칙·공용 모듈·화면 캡처·검증 방법. shorts-promo-video, store-listing-assets가 먼저 참조한다.
owner: du
version: 0.1.0
team: Frontend
status: Draft
artifacts: []
---

# promo-studio

앱 하나의 홍보물을 Remotion(React 기반 비디오·이미지 프레임워크)으로 만들 때 **어떤 홍보물이든 똑같이
적용되는 공통 규칙**을 모아 둔 스킬이다. 이 스킬 자체가 결과물을 만들지는 않는다 — 결과물별 절차는
아래 스킬이 맡고, 각 스킬은 시작 전에 이 스킬을 먼저 따른다.

| 만들려는 것 | 스킬 |
| --- | --- |
| 9:16 쇼츠/릴스 홍보 영상 + 썸네일 | `shorts-promo-video` |
| Play 스토어 아이콘·피처 그래픽·스크린샷·등록 문구 | `store-listing-assets` |

## 언제 쓰나

- 위 두 스킬 중 하나를 시작하기 전. 프로젝트 구조, 파일명, 화면 캡처, 검증 방법은 여기서 정한다.
- 새 앱의 홍보물을 기존 Remotion 프로젝트에 추가할 때(폴더 구조 확인).
- 앱 사이에서 겹치는 코드를 `shared/`로 올릴지 판단할 때.

## 원칙

- **실제 화면·토큰·문구만 쓴다.** 상상으로 UI를 재구성하지 않는다. 실제 앱을 실행하거나 배포 URL을 열어
  Playwright로 캡처하고, 색상은 대상 앱의 `index.css`(또는 등가 스타일) `:root`에서, 문구는 랜딩 문구·
  버튼 라벨·README에서 그대로 가져온다. 코드베이스에 없는 문구·색·에셋은 지어내지 않는다.
- **화면 녹화 편집이 아니라 프론트엔드 개발하듯** 영상·이미지 컴포넌트를 코드로 작성한다. 그래야 문구·
  타이밍·레이아웃을 값만 바꿔 다시 렌더할 수 있다.
- **렌더 결과는 눈으로 확인한 뒤에만 전달한다.** 정지 이미지는 Read 도구로 직접 보고, 영상은 프레임을 뽑아
  본다. 텍스트 겹침·줄바꿈 깨짐·아이콘 겹침·캔버스 밖 삐져나감은 코드만 봐서는 못 잡는다. 이 확인 없이
  "만들었다"고 보고하지 않는다.
- **폰트는 화려함보다 안정성.** 아래 "폰트" 참고.
- **산출물 파일명과 폴더는 앱별로 구분한다.** 아래 "파일명"과 "프로젝트 구조" 참고.
- **대상 프로젝트가 pnpm/npm workspace의 일부라면** Remotion 프로젝트를 그 workspace(`apps/*`,
  `packages/*` 등) 안에 넣지 않는다. `tools/promo-studio`처럼 workspace 밖에 두고 **npm으로 독립적으로
  설치**해서 루트 lockfile을 건드리지 않는다. `pnpm add`는 작업 폴더가 workspace glob에 없어도 루트
  `pnpm-workspace.yaml`을 찾아 올라가 루트 `pnpm-lock.yaml`을 수정하므로 쓰지 않는다. workspace가 아닌
  독립 프로젝트라면 이 제약은 없다.

## 파일명

산출물은 **`YYMMDD_<프로젝트>_<항목>.<확장자>`** 로 짓는다. `out/`에는 여러 프로젝트의 결과물이 함께
쌓이므로 파일명만으로 어느 프로젝트의 무엇인지, 언제 만든 것인지 알 수 있어야 한다.

- 날짜는 만든 날(렌더한 날) 기준 6자리(2026-09-25 → `260925`), 프로젝트는 대상 앱 이름(kebab-case).
- 예: `260923_cat-game_promo.mp4`, `260924_cat-game_thumbnail.png`, `260925_cat-game_icon-512.png`.
- 같은 종류가 여럿이면 `thumbnail-2`, `screenshot-1`처럼 번호를 붙인다.
- 렌더·검증·전달 단계 모두 이 이름을 쓰고, `out/`에 날짜·프로젝트 없는 이름(`thumbnail.png` 등)을 남기지
  않는다. 이미 그런 파일이 있으면 만든 날짜(파일 수정 시각)를 확인해 이름을 바꾼다.

## 프로젝트 구조

Remotion 프로젝트 하나(`tools/promo-studio`)에 여러 앱의 홍보물이 쌓인다. 어느 앱 소속인지 파일 경로만
봐도 드러나도록 **앱별 폴더로 나눈다.**

```
tools/promo-studio/
  src/
    index.ts          registerRoot(RemotionRoot)
    Root.tsx          앱마다 <Folder name="<app-name>"> + 접두사 붙인 id로 컴포지션 등록
    shared/           앱과 무관한 코드 — safezone.ts, font.ts, decorate.ts
    <app-name>/       앱 전용 — theme.ts, asset.ts, decorate.ts, 컴포지션, components/
  public/<app-name>/  스프라이트·배경·스크린샷 (커밋하지 않는 경우가 많다)
  storyboard/<app-name>.md
  out/                YYMMDD_<app-name>_<항목> 이름의 산출물 (커밋하지 않는다)
```

- 컴포지션 id는 앱 접두사를 붙인다(`CatGamePromo`, `CatGameThumbnail`, `CatGameStoreIcon` …).
  `Root.tsx`에서 `<Folder name="<app-name>">`로 묶는다.
- 새 앱을 만들 때는 기존 앱 폴더를 건드리지 않고 같은 구조를 옆에 하나 더 만든다.
- **`shared/`에는 앱과 무관한 것만 둔다.** 아이콘 파일명 목록처럼 앱마다 다른 값은 shared에 박지 않고
  인자로 받아, 앱 폴더의 얇은 래퍼가 그 값을 고정한다(아래 "공용 모듈" 참고).
- 다른 앱의 코드를 재사용하고 싶어지면 복사하지 말고, 앱과 무관한 부분만 `src/shared/`로 올린 뒤 양쪽에서
  가져다 쓴다. 이때 결과물이 바뀌지 않았는지 이전 렌더와 바이트 단위(`cmp`)로 비교해 확인한다.
- 앱 에셋 복사본(`public/`)과 산출물(`out/`)은 저장소 용량을 늘리므로 `.gitignore`에 넣고, README에 복사·
  캡처 방법을 적어 둔다.

### 도구 준비

기존 프로젝트가 있으면 재사용한다(`npm install`만 다시 실행하고 새 앱은 `src/<app-name>/`을 옆에 추가).
없으면 대상 프로젝트 바깥의 작업 디렉터리에 새로 만든다:

```bash
mkdir -p tools/promo-studio/src/shared tools/promo-studio/src/<app-name>
cd tools/promo-studio
npm install remotion @remotion/cli @remotion/google-fonts react react-dom
npm install -D typescript @types/react @types/react-dom
```

`ffmpeg`가 로컬에 있는지 확인한다(`which ffmpeg`, 영상 렌더링에 필요). `tsc --noEmit`으로 타입체크를
통과시킨 뒤 커밋한다.

## 공용 모듈

### 에셋 경로 헬퍼 (앱별)

```ts
// src/<app-name>/asset.ts
import { staticFile } from 'remotion'
export const asset = (path: string) => staticFile(`<app-name>/${path}`)
```

컴포넌트에서 `staticFile`을 직접 부르지 않고 `asset('sprites/x.png')`로 `public/<app-name>/`을 가리킨다.

### 폰트 (`shared/font.ts`)

Black Han Sans 같은 극단적으로 눌린/붙은 디스플레이 폰트는 한글 자소 조합에 따라 렌더링이 깨지는 경우가
있었다. **Noto Sans KR의 가장 굵은 무게(900)** 를 기본값으로 쓴다:

```ts
import { loadFont } from '@remotion/google-fonts/NotoSansKR'
export const { fontFamily: displayFont } = loadFont('normal', { weights: ['900'], subsets: ['korean', 'latin'] })
```

시스템 폰트 문자열(`"'Pretendard', sans-serif"`)만 넣으면 Remotion의 헤드리스 크롬에는 그 폰트가 없어
기본 폰트로 대체된다. 실제로 쓰려면 `@remotion/google-fonts`로 로드해야 한다. 브랜드 폰트가 구글 폰트에
있고 안정적이라면 타이틀처럼 브랜드를 드러내는 곳에만 써도 되지만, 대개 한 폰트로 통일하는 쪽이 더
깔끔하다.

### 한글 줄바꿈

`word-break: keep-all`을 텍스트 스타일에 꼭 넣는다. 안 넣으면 브라우저가 한글을 아무 글자에서나 끊어서
("다르게" → "다르"+"게") 어색해 보인다. 앱 CSS에 이미 이 규칙이 있으면 그대로 따른다.

### 장식 아이콘 겹침 방지 (`shared/decorate.ts`)

여백에 브랜드 스프라이트를 흩뿌려 심심하지 않게 할 때, 그냥 랜덤 좌표를 찍으면 아이콘끼리 겹치거나 텍스트
위에 올라간다. Remotion의 시드 기반 `random(seed)`(같은 seed면 항상 같은 값 → 렌더마다 결과가 고정)로
위치를 뽑되, (1) 텍스트·스크린샷이 있는 영역을 "피할 영역"으로 미리 정의하고 (2) 이미 배치한 아이콘의
사각 범위도 다음 아이콘의 회피 대상에 추가해서, 겹치면 최대 N번 다시 뽑는다. **아이콘 목록은 인자로
받는다** — 어떤 스프라이트를 쓸지는 앱마다 다르다.

```ts
// src/shared/decorate.ts (핵심 아이디어만)
import { random } from 'remotion'

interface Zone { x0: number; y0: number; x1: number; y1: number }
const overlaps = (x: number, y: number, size: number, zones: Zone[]) =>
  zones.some((z) => x < z.x1 && x + size > z.x0 && y < z.y1 && y + size > z.y0)

export function randomDecorations(icons: readonly string[], seed: string, count: number, exclude: Zone[]) {
  const placed: Zone[] = []
  const decos = []
  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, size = 90
    for (let attempt = 0; attempt < 20; attempt++) {
      const r = (k: string) => random(`${seed}-${i}-${attempt}-${k}`)
      size = 46 + r('size') * 90
      x = r('x') * (1080 - size)
      y = r('y') * (1920 - size)
      if (!overlaps(x, y, size, [...exclude, ...placed])) break
    }
    placed.push({ x0: x - 10, y0: y - 10, x1: x + size + 10, y1: y + size + 10 })
    decos.push({ name: icons[Math.floor(random(`${seed}-${i}-icon`) * icons.length)], x, y, size })
  }
  return decos
}
```

```ts
// src/<app-name>/decorate.ts — 그 앱의 아이콘 목록을 고정한 래퍼. 앱 안의 컴포넌트는 이것만 부른다
import { randomDecorations as place, type Zone } from '../shared/decorate'   // shared에서 Zone을 export한다
const ICONS = ['item-star.png', 'item-heart.png' /* public/<app-name>/sprites/ 안의 파일명 */] as const
export const randomDecorations = (seed: string, count: number, exclude: Zone[]) => place(ICONS, seed, count, exclude)
```

캐릭터/사물 중심으로 "방사형으로 튀어나온" 느낌이 필요하면(예: 캐릭터를 쓰다듬어 소품이 터져 나오는
연출) 균등 랜덤 대신 극좌표(각도+반지름)로 중심점 둘레에 뽑되 같은 겹침 회피 로직을 적용한다. 캔버스
밖으로 나가지 않게 최종 좌표를 여백만큼 클램프한다.

## 실제 화면 캡처

대상 프로젝트의 dev 서버(또는 배포 URL)를 열고 **Playwright MCP 도구**로 캡처한다. 브라우저 창 도구는
스크린샷을 로컬 파일로 저장하지 못하니 Playwright를 쓴다.

```
mcp__playwright__browser_navigate → 앱 URL
mcp__playwright__browser_resize → 세로 뷰포트(예: 430x932, 대상 앱의 모바일 브레이크포인트에 맞춰)
mcp__playwright__browser_evaluate → localStorage 초기화/특정 상태 주입(필요하면), 입력값 채우기 등
mcp__playwright__browser_take_screenshot → filename에 tools/promo-studio/public/<app-name>/screens/<n>.png 지정
```

원하는 상태를 만드는 방법은 두 가지다.

- **합성 상태 주입**: 결과 화면처럼 만들기 번거로운 상태는 API를 부르는 대신 **화면이 읽는 로컬 상태의
  스키마를 코드에서 확인**하고 `localStorage.setItem(...)`으로 주입한다. 스키마의 모든 필드를 빠짐없이
  채운다 — 하나라도 빠지면 `NaN`/빈 값으로 티가 난다.
- **실제로 플레이**: 배포된 앱을 그대로 열어 클릭·입력으로 흐름을 끝까지 진행하며 찍는다. 실제 응답이
  나오므로 가장 사실적이고, 스토어 스크린샷처럼 "진짜 화면"이 중요할 때 맞다.

### 고해상도(3x) 캡처

`browser_resize`로는 기기 픽셀 비율(devicePixelRatio)을 못 바꿔 1x로 찍힌다(430x932 → 430x932px). 결과물이
1080px 폭 이상의 캔버스에 놓이거나 스토어 규격이 있으면 **`browser_run_code_unsafe`로 새 컨텍스트를 만들어
`deviceScaleFactor: 3`으로** 찍는다:

```js
async (page) => {
  const browser = page.context().browser();
  const ctx = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 3 });
  const p = await ctx.newPage();
  await p.goto('<배포 URL>', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: '<절대 경로>/s1.png' });   // 1290x2796
  await ctx.close();
}
```

- 이 코드 안에서는 `require`를 쓸 수 없다(`fs.mkdirSync` 불가). 저장 폴더는 **미리 Bash로 만들어 둔다.**
- 컨텍스트는 호출이 끝나면 닫으므로, 한 번의 호출 안에서 시작 화면 → 입력 → 결과까지 흐름 전체를 끝내고
  단계마다 스크린샷을 남긴다.
- 로딩 표시(예: `.typing`)가 사라질 때까지 `waitForFunction`으로 기다린 뒤 잠깐 더 대기하고 찍는다.

캡처한 뒤에는 **반드시 이미지를 직접 열어** 상태가 의도대로인지 확인한다.

## 정지 이미지 렌더

- **`<Still>`이 아니라 `<Composition>`으로 등록한다.** 아이콘에 스프링 팝인 애니메이션이 있으면 `<Still>`은
  항상 frame 0만 렌더해서 delay가 있는 요소가 애니메이션 시작 전(투명) 상태로 찍혀 안 보인다. 일반
  `<Composition durationInFrames={60} .../>`으로 등록하고 애니메이션이 끝난 프레임을 지정해 찍는다:
  `npx remotion still src/index.ts <CompositionId> out/<파일명>.png --frame=40`. 애니메이션이 없는
  스토어 에셋 등은 `durationInFrames={1}`과 `--frame=0`이면 된다.
- 텍스트를 `position:absolute; left:50%; transform:translateX(-50%)`로 중앙 정렬할 때 **`width`를 명시하거나
  `width:'max-content'`를 준다.** `width:auto`이면 절대 위치 요소의 shrink-to-fit 너비가 "왼쪽 오프셋부터
  컨테이너 오른쪽 끝까지"로 제한되어(`left:50%`면 캔버스 절반) 텍스트가 중간에서 엉뚱하게 줄바꿈된다.
- 컴포지션 `defaultProps`로 쓰는 props 타입은 `interface`가 아니라 **`type` 별칭**으로 선언한다.
  `interface`는 `Record<string, unknown>`에 할당되지 않아 `tsc`가 실패한다.
- 실제 화면을 "전체로" 보여달라는 요청이면 스크린샷을 늘리지 말고 원본 비율로 세로 기준에 맞춘다. 남는
  좌우 여백은 그 화면의 실제 배경 이미지를 `object-fit: cover`로 깔아 이어 붙인다.

## 검증과 전달

1. `npx tsc --noEmit` 통과.
2. 정지 이미지는 렌더 후 Read 도구로 직접 본다. 영상은 `ffprobe`로 길이·해상도·fps를 확인하고
   `ffmpeg -ss <초> -i <영상> -frames:v 1 -vf scale=360:-1`로 장면별 프레임을 뽑아 본다(여러 장은 PIL로
   contact sheet를 만들면 빠르다).
3. 구조 변경·리팩터링 뒤에는 이전 결과물과 `cmp`로 바이트 단위 비교해 결과가 같은지 확인한다.
4. `SendUserFile`로 실제 파일(mp4/png)을 보낸다. 미리보기용 GIF나 스크린샷으로 대신하지 않는다.
   피드백을 받으면 값만 바꿔 재렌더 → 재검증 → 재전달한다.

## 알려진 함정

- **pnpm workspace 오염** — `pnpm add` 대신 `npm install`.
- **합성 데이터 스키마 누락** — 모든 필드를 채운다.
- **1x 캡처를 큰 캔버스에 확대** — 3x로 다시 찍는다.
- **글꼴 미적용/자소 깨짐**, **한글 중간 줄바꿈** — "폰트", "한글 줄바꿈" 참고.
- **`<Still>`에서 애니메이션 요소가 안 보임**, **absolute+`left:50%`+`width:auto` 줄바꿈**, **`interface` props로
  `defaultProps` 타입 오류** — "정지 이미지 렌더" 참고.
- **`out/`에 날짜·프로젝트 없는 파일명** — "파일명" 규칙으로 바꾼다.
