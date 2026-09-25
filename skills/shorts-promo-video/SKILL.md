---
name: shorts-promo-video
description: 웹 애플리케이션 하나(dev 서버를 띄울 수 있는 로컬 프로젝트라면 어디든)를 골라 Remotion으로 9:16 세로형 쇼츠/릴스 홍보 영상 + 썸네일을 만든다. 실제 화면 스크린샷·색상·폰트·문구를 그대로 써서 구성한다.
owner: du
version: 0.1.0
team: Frontend
status: Draft
artifacts:
  - title: cat-game 쇼츠 홍보 영상 예시 (유튜브)
    url: https://www.youtube.com/shorts/bqDxxiKSjlg
  - title: cat-game 릴스 예시 (인스타그램)
    url: https://www.instagram.com/reel/Ddoot83Szbg/
---

# shorts-promo-video

웹 애플리케이션 하나를 소개하는 세로형(9:16) 짧은 홍보 영상과 썸네일을 Remotion(React 기반
비디오 프레임워크)으로 만들어 mp4/png로 렌더링한다. **특정 저장소·특정 앱에 묶이지 않는다** —
dev 서버를 띄워 브라우저로 볼 수 있는 로컬 프로젝트라면 무엇이든 대상이 된다. "화면 녹화해서
편집"이 아니라 실제 UI를 분석해서 **프론트엔드 개발하듯 비디오·이미지 컴포넌트를 코드로 작성**
하고, 실제 코드베이스에 없는 문구·색·에셋은 지어내지 않는다.

위 artifacts에 실제로 만들어 유튜브 쇼츠·인스타 릴스에 올린 cat-game 예시가 링크로 있다 — 처음
쓸 때 결과물 감을 잡기 좋다(저장소 용량을 늘리지 않으려 실제 파일은 커밋하지 않고 링크만 둔다).

## 언제 쓰나

- "쇼츠/릴스 만들어줘", "홍보 영상", "프로모 비디오", "앱 소개 영상", "썸네일 만들어줘"를 요청받았을 때
- 대상은 dev 서버를 띄울 수 있는 프로젝트라면 무엇이든 된다. 대상 프로젝트 경로를 먼저 확인한다.
- 특정 플랫폼(유튜브 쇼츠/인스타 릴스/틱톡)에 얽매이지 않는다 — 캔버스는 어디서나 같은 9:16
  1080x1920이고, 달라지는 건 CTA 문구뿐이다(아래 "플랫폼별 CTA" 참고)

## 먼저 확인할 것: 세로(9:16)가 맞는지

이 스킬은 **9:16 세로형(쇼츠/릴스) 전용**으로 설계돼 있다. "쇼츠 만들어줘", "릴스 만들어줘"처럼
요청 자체가 이미 세로형 포맷을 명시하면 바로 절차로 들어간다. 하지만 "홍보 영상 만들어줘",
"프로모 비디오 만들어줘", "앱 소개 영상 만들어줘"처럼 **포맷을 특정하지 않은 요청**이면, 코드부터
짜지 말고 AskUserQuestion으로 먼저 확인한다:

- **화면 비율**: 16:9(가로, 일반 유튜브 영상·데스크톱 재생용)인지 9:16(세로, 쇼츠/릴스용)인지.
- 9:16이 맞다면, 쇼츠/릴스처럼 짧고 세로로 스크롤되는 포맷을 원하는 게 맞는지 한 번 더 확인한다.

16:9(가로)를 원하는 게 확인되면, 이 스킬을 그대로 쓰지 않는다 — 캔버스 크기·안전 영역(safezone)
값·장면 리듬이 세로형 전용으로 맞춰져 있어서 그대로 가로에 적용하면 어색하다. 그런 경우엔 사용자
확인 없이 임의로 진행하지 말고, 가로형 홍보 영상 방향으로 별도 상의한다.

## 원칙

- **대본(스토리보드)을 먼저 글로 쓰고 승인받은 뒤에 코드를 짠다.** 장면 구성·자막·타이밍을 표로 정리한다.
- **실제 화면을 스크린샷으로 캡처해서 쓴다.** 상상으로 화면을 재구성하지 않는다 — 실제 앱을 실행해
  Playwright로 원하는 상태(빈 화면, 채워진 화면, 결과 화면 등)를 만들고 캡처한다.
- **실제 디자인 토큰을 그대로 쓴다.** 대상 앱의 `index.css`(또는 등가 스타일 파일) `:root`에서
  색상 변수를 그대로 가져온다. 배경이 남는 자리는 앱의 실제 배경 이미지(`public/backgrounds/*`
  등)를 cover로 깔면 생동감이 확 산다 — 밋밋한 단색보다 우선 고려한다.
- **실제 문구를 그대로 쓴다.** 자막·CTA 문구는 앱의 실제 카피(랜딩 문구, 버튼 라벨 등)를 재료로
  삼는다. 배포 URL이 있으면 README에서 가져와 CTA에 넣는다.
- **폰트는 화려함보다 안정성.** 아래 "폰트 선택" 참고 — 자소 조합에 따라 깨지는 스타일 폰트를
  피하고, 렌더링이 안정적인 굵은 고딕(Noto Sans KR 등)으로 통일하는 게 대개 더 낫다.
- **화면 비율이 다른 기기·플랫폼 UI를 고려한 안전 여백을 지킨다.** 아래 "안전 영역" 참고.
- **렌더 결과를 검증한다.** `ffprobe`로 길이·해상도·코덱을 확인하고, `ffmpeg -ss ... -frames:v 1`로
  장면별 샘플 프레임을 뽑아 Read 도구로 직접 봐서 레이아웃이 깨지지 않았는지 확인한 뒤에만 전달한다.
  이 확인 없이 "만들었다"고 보고하지 않는다 — 텍스트 겹침·줄바꿈 깨짐·아이콘 겹침은 코드만 보고는
  못 잡는다.
- **대상 프로젝트가 pnpm/npm workspace의 일부라면**, Remotion 프로젝트를 그 workspace(`apps/*`,
  `packages/*` 등) 안에 넣지 않는다. `tools/promo-studio`처럼 워크스페이스 밖(또는 `tools/*`처럼
  별도 관리되는 디렉터리)에 두고 **npm으로 독립적으로 설치**해서 루트 lockfile을 건드리지 않는다.
  workspace가 아닌 독립 프로젝트라면 이 제약은 없다 — 적당한 위치(대상 프로젝트와 나란히, 또는
  별도 작업 디렉터리)에 두면 된다.
- **산출물 파일명은 `YYMMDD_<프로젝트>_<항목>.<확장자>`로 짓는다.** `out/`에는 여러 프로젝트의
  결과물이 함께 쌓이므로 파일명만으로 어느 프로젝트의 무엇인지, 언제 만든 것인지 알 수 있어야
  한다. 날짜는 만든 날(렌더한 날) 기준 6자리(예: 2026-09-25 → `260925`)이고, 프로젝트는 대상
  앱 이름(kebab-case)이다. 예: `260923_cat-game_promo.mp4`, `260924_cat-game_thumbnail.png`,
  `260925_cat-game_icon-512.png`. 같은 종류가 여럿이면 `thumbnail-2`, `screenshot-1`처럼 번호를
  붙인다. 렌더 명령·검증 명령·전달 단계 모두 이 이름을 그대로 쓰고, `out/`에 날짜·프로젝트 없는
  이름(`thumbnail.png`, `promo.mp4` 등)을 남기지 않는다.
- **Remotion 프로젝트는 앱(프로젝트)별 폴더로 나눈다.** `tools/promo-studio` 하나에 여러 앱의 홍보물이
  쌓이므로, 어느 앱 소속인지 파일 경로만 봐도 드러나야 한다. 앱 전용 코드는 `src/<app-name>/`,
  앱과 무관한 코드는 `src/shared/`, 에셋은 `public/<app-name>/`, 스토리보드는
  `storyboard/<app-name>.md`, 컴포지션 id는 `<AppName>` 접두사(예: `CatGamePromo`,
  `CatGameThumbnail`)를 쓰고 `Root.tsx`에서 `<Folder name="<app-name>">`로 묶는다. 새 앱을 만들 때도
  기존 앱 폴더를 건드리지 않고 같은 구조를 옆에 하나 더 만든다. 자세한 구조는 "4. Remotion
  컴포지션 작성" 참고.
- 영상 하나로 끝내지 않는다 — 사용자가 실제로 업로드하려면 **썸네일**과 (유튜브라면) **제목·설명·
  홍보 댓글**까지 세트로 필요할 때가 많다. 영상만 만들고 끝내지 말고, 이후 단계도 자연스럽게
  제안한다.

## 절차

### 0. 도구 준비

기존에 만들어둔 Remotion 프로젝트가 있으면 재사용한다(`npm install`만 다시 실행하고, 새 앱은 `src/<app-name>/`
폴더를 옆에 추가한다 — 아래 "4. Remotion 컴포지션 작성" 참고). 없으면
대상 프로젝트 바깥의 적당한 작업 디렉터리(예: `tools/promo-studio`)에 새로 만든다:

```bash
mkdir -p tools/promo-studio/src/shared tools/promo-studio/src/<app-name>
cd tools/promo-studio
npm install remotion @remotion/cli @remotion/google-fonts react react-dom
npm install -D typescript @types/react @types/react-dom
```

`ffmpeg`가 로컬에 있는지 확인한다(`which ffmpeg`) — Remotion 렌더링에 필요하다.
`@remotion/transitions`는 기본으로 설치하지 않는다 — 아래 "장면 전환" 참고.

### 1. 스토리보드 작성 (승인 전 필수)

`tools/promo-studio/storyboard/<app-name>.md`에 표로 정리한다: 구간(frame)·시간·장면·자막·비고.
fps 30 기준으로 구간을 프레임 단위로 환산해둔다. 길이는 고정값(10초 등)에 얽매이지 않고 보여줄
내용에 맞춰 정한다(짧은 훅은 5초, 화면 데모가 많으면 15~20초도 정상). 이 표를 사용자에게 보여주고
확인받은 뒤에 코드를 짠다(요청받지 않았다면 진행 방식만 간단히 알리고 계속해도 된다).

좋은 구조 하나: **훅(생활 속 순간 하나 던지고 반응 보여주기) → 실제 화면 데모 → 결과/보상 장면 →
타이틀 → CTA**. 차별점(예: "성격마다 다르게 반응한다")이 있으면 그걸 훅에서 바로 보여주는 게
뒤쪽에 별도 비교 장면을 또 넣는 것보다 낫다 — 중복 내용은 넣지 말고 훅 하나로 압축한다.

### 2. 대상 프로젝트 분석

- 대상 프로젝트의 `index.css`/`App.css`(또는 등가 스타일 파일) `:root`에서 색상 토큰을 읽는다.
- `public/backgrounds/`, `public/sprites/`(또는 그 프로젝트의 이미지 에셋 폴더) 같은 곳을 훑어서
  재사용할 배경·아이콘을 파악한다(스크린샷 외에 장식으로 쓸 것들). 이미지 에셋이 아예 없는
  프로젝트라면 이 단계는 생략하고 스크린샷·색상·폰트만으로 구성한다.
- README나 배포 문서에서 실제 배포 URL을 확인한다(CTA에 쓸 것).
- 어떤 화면 4~6개를 보여줄지 정한다.

### 3. 실제 화면 스크린샷 캡처

대상 프로젝트의 dev 서버를 켠 뒤, Playwright MCP 도구로 캡처한다(브라우저 창 도구는 파일로
저장이 안 되니 Playwright를 쓴다):

```
mcp__playwright__browser_navigate → 앱 URL
mcp__playwright__browser_resize → 세로 뷰포트(예: 430x932, 대상 앱의 모바일 브레이크포인트에 맞춰)
mcp__playwright__browser_evaluate → localStorage 초기화/특정 상태 주입(필요하면), 입력값 채우기 등
mcp__playwright__browser_take_screenshot → filename에 tools/promo-studio/public/<app-name>/screens/<n>.png 지정
```

특정 상태(예: "결과 화면")를 스크린샷하려면, 실제 API를 호출하는 대신 **해당 화면이 읽는 로컬 상태의
스키마를 코드에서 확인**하고 `localStorage.setItem(...)` 등으로 합성 데이터를 주입한다. 이때 그
스키마의 모든 필드를 빠짐없이 채운다 — 하나라도 빠지면 화면에 `NaN`/빈 값 등으로 티가 난다.
스크린샷 찍기 전에 반드시 렌더 결과를 눈으로 한 번 확인한다.

### 4. Remotion 컴포지션 작성

앱과 무관한 코드(`src/shared/`)와 앱 전용 코드(`src/<app-name>/`)를 나눠서 만든다:

```
src/
  index.ts          registerRoot(RemotionRoot)
  Root.tsx          앱마다 <Folder name="<app-name>"> + 접두사 붙인 id로 컴포지션 등록
  shared/           앱과 무관 — safezone.ts, font.ts, decorate.ts
  <app-name>/       앱 전용 — theme.ts, asset.ts, decorate.ts, <App>Promo.tsx, Thumbnail.tsx,
                    components/, store/(스토어 에셋을 만들 때)
public/<app-name>/  스프라이트·배경·스크린샷 (asset.ts의 asset('sprites/x.png')로 참조)
storyboard/<app-name>.md
out/                YYMMDD_<app-name>_<항목> 이름의 산출물
```

- `src/shared/safezone.ts`: 아래 "안전 영역" 참고.
- `src/shared/font.ts`: 아래 "폰트 선택" 참고.
- `src/shared/decorate.ts`: 시드 고정 랜덤으로 스프라이트 아이콘을 화면 여백에 흩뿌리는
  `randomDecorations(icons, seed, count, exclude)`(아래 "장식 아이콘 겹침 방지" 참고). **아이콘 파일명
  목록은 인자로 받는다** — 어떤 스프라이트를 쓸지는 앱마다 다르므로 shared에 박아 두지 않는다.
- `src/<app-name>/decorate.ts`: 그 앱의 아이콘 목록을 고정해서 위 함수를 감싼 얇은 래퍼. 앱 안의
  컴포넌트는 이 래퍼만 부른다.
- `src/<app-name>/asset.ts`: `export const asset = (p: string) => staticFile(`<app-name>/${p}`)`.
  컴포넌트에서 `staticFile`을 직접 부르지 않고 `asset()`으로 `public/<app-name>/`을 가리킨다.
- `src/<app-name>/theme.ts`: 대상 앱의 색상 토큰을 상수로. 실제 앱의 배경 CSS(그라데이션·패턴 등)가
  있으면 그대로 문자열로 옮겨서 `background` 여백에 재사용한다.
- `src/<app-name>/components/Scene.tsx`: 스크린샷 한 장 + 스냅줌(장면 시작 시 살짝 확대→1배로 튕기는
  스프링) + 자막 한 줄을 보여주는 재사용 컴포넌트. 자막은 항상 화면 하단 안전 영역에 고정한다.
- `src/<app-name>/components/TitleCard.tsx`, `CTACard.tsx`: 오프닝/클로징 카드.
- `src/<app-name>/<App>Promo.tsx`: `remotion`의 `<Series>`로 장면을 하드컷으로 이어 붙인다 — 아래
  "장면 전환" 참고.
- `src/Root.tsx`: `<Folder name="<app-name>">` 안에 `<Composition id="<App>Promo" component={...}
  durationInFrames={...} fps={30} width={1080} height={1920} />`처럼 등록한다. id는 항상 앱 접두사를
  붙인다(`<App>Thumbnail`, `<App>StoreIcon` …). 다른 앱의 `<Folder>`는 건드리지 않는다.
- `src/index.ts`: `registerRoot(RemotionRoot)`.

다른 앱의 코드를 재사용하고 싶어지면 복사하지 말고, 앱과 무관한 부분만 `src/shared/`로 올린 뒤 양쪽에서
가져다 쓴다. 이때 결과물이 바뀌지 않았는지 이전 렌더와 바이트 단위로 비교(`cmp`)해서 확인한다.

### 5. 렌더링

```bash
cd tools/promo-studio
npx remotion render src/index.ts <CompositionId> out/<YYMMDD>_<app-name>_promo.mp4
```

### 6. 검증 (건너뛰지 않는다)

```bash
ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=width,height,r_frame_rate,codec_name \
  -of default=noprint_wrappers=1 out/<YYMMDD>_<app-name>_promo.mp4
```

길이·해상도·fps가 의도한 값과 맞는지 확인한다. 그다음 장면별로 샘플 프레임을 뽑아 **Read 도구로
직접 보고** 레이아웃 깨짐·글자 잘림·자막 겹침·아이콘 겹침이 없는지 확인한다. 여러 프레임을 한 번에
보려면 Python(PIL)로 contact sheet(격자 이미지)를 만들어 한 번에 훑으면 빠르다:

```bash
mkdir -p out/frames
ffmpeg -y -ss <초> -i out/<YYMMDD>_<app-name>_promo.mp4 -frames:v 1 -vf scale=360:-1 out/frames/t<초>.png -loglevel error
```

### 7. 썸네일

영상과 별개로 정지 이미지 썸네일도 같은 프로젝트 안에서 만든다 — 아래 "썸네일 만들기" 참고.

### 8. 전달

`SendUserFile`로 mp4/png를 전달한다(파일명은 위 "원칙"의 `YYMMDD_<프로젝트>_<항목>` 규칙을 따른다). GIF나 스크린샷 미리보기가 아니라 실제 파일을 보낸다.
피드백을 받으면 값만 바꿔서 재렌더 → 재검증 → 재전달을 반복한다(한 번에 완벽할 필요 없음).

### 9. (선택) 유튜브 제목·설명·홍보 댓글

유튜브 쇼츠로 올린다면 제목·설명·고정 댓글용 문구도 같이 제안한다:

- **제목**: 55자 이내, 훅과 바로 연결되는 구체적인 문장. 후보 3~4개를 제시한다.
- **설명**: 짧은 요약 1~2줄 + 배포 URL(클릭 가능, 위쪽 배치) + 관련 해시태그(`#Shorts` 포함).
- **댓글**: 배포 URL을 담은 짧은 홍보 댓글 1~3개. 유튜브는 댓글 안 URL이 실제로 클릭되므로(영상
  안·설명과 별개로) 고정 댓글로 쓰기 좋다. **직접 댓글을 달 수 있는 도구는 없으므로, 복사해서
  쓸 수 있게 텍스트로만 제공한다.**

## 플랫폼별 CTA

- **유튜브(쇼츠/일반 영상 설명·댓글)**: URL이 실제로 클릭된다. CTA에 URL을 그대로 노출해도 된다.
- **인스타그램(릴스/피드 영상, 게시물 캡션)**: 영상 안 텍스트도, 캡션 속 URL도 클릭이 안 된다 —
  프로필 바이오 링크만 클릭 가능하다. 그래서 CTA는 "프로필 링크 클릭!" + 위쪽을 가리키는 화살표
  류로 유도하고, URL 자체는 참고용으로 작게만 둔다(다른 플랫폼 재사용 대비).
- 대상 플랫폼을 모르면 사용자에게 물어보거나, 둘 다 커버하는 절충안(문구는 "플레이하기" 같은
  중립 표현 + URL 텍스트 노출, 별도로 "인스타면 프로필 링크로 바꿔야 함" 안내)을 쓴다.

## 안전 영역 (safezone.ts)

쇼츠/릴스는 기기마다 화면 비율이 달라(9:16, 9:19.5, 9:20 등) 위아래가 살짝 잘리거나, 플랫폼 자체
UI(캡션 텍스트·아이디·음악 정보·버튼)가 화면 아래쪽을 가릴 수 있다. 업계에서 흔히 쓰는 값으로
상수를 만들어 전체 컴포넌트에서 공유한다:

```ts
// src/shared/safezone.ts
export const SAFE_TOP = 200
export const SAFE_BOTTOM = 320 // 화면 맨 아래로부터의 거리
export const SAFE_BOTTOM_Y = 1920 - SAFE_BOTTOM // 안전 영역의 아래쪽 경계선(y좌표)
```

자막처럼 반드시 보여야 하는 요소는 이 범위 밖에 두지 않는다. 자막을 `top`이 아니라 `bottom`
기준으로 고정하면(`bottom: SAFE_BOTTOM`) 1줄이든 2줄이든 항상 위로 자라서 안전 영역을 벗어나지
않는다 — `top` 고정보다 훨씬 안전하다.

## 폰트 선택

Black Han Sans 같은 극단적으로 눌린/붙은 스타일의 디스플레이 폰트는 한글 자소 조합에 따라 렌더링이
살짝 깨지는 경우가 있었다. 캡션처럼 짧고 굵게 강조하는 텍스트에는 **Noto Sans KR의 가장 굵은
무게(900)** 처럼 안정적으로 렌더링되는 폰트를 기본값으로 쓴다:

```ts
// src/shared/font.ts
import { loadFont } from '@remotion/google-fonts/NotoSansKR'
export const { fontFamily: displayFont } = loadFont('normal', { weights: ['900'], subsets: ['korean', 'latin'] })
```

시스템 폰트 문자열(`"'Pretendard', sans-serif"`)만 넣으면 Remotion의 헤드리스 크롬에는 그 폰트가
없어 기본 폰트로 대체된다. 실제로 쓰려면 `@remotion/google-fonts`로 로드해야 한다. 대상 앱의
브랜드 폰트가 구글 폰트에 있고 안정적으로 렌더링된다면(예: Jua) 타이틀 카드 등 브랜드를 드러내는
곳에는 그걸 써도 된다 — 다만 모든 텍스트를 한 폰트로 통일하는 쪽이 대개 더 깔끔하다.

## 자막(한글 줄바꿈)

`word-break: keep-all`을 텍스트 스타일에 꼭 넣는다. 안 넣으면 브라우저가 한글을 아무 글자에서나
끊어서(예: "다르게"가 "다르"+"게"로) 줄바꿈해 어색해 보인다.

## 장면 전환

**하드컷(`remotion`의 `<Series>`)을 기본으로 쓴다.** `@remotion/transitions`의 크로스페이드는
서로 다른 화면(특히 둘 다 비슷한 위치에 텍스트가 있는 스크린샷)을 겹쳐 보여줘서 전환 구간에
글자가 이중으로 겹쳐 보이는 고스팅이 생기기 쉽다. 쇼츠 특성상 컷도 빠른 게 자연스럽다. 각 장면
안에서 시작 직후 스프링으로 살짝 확대→1배로 튕기는 스냅줌 정도만 줘도 리듬감은 충분하다.

크로스페이드가 꼭 필요하면 `@remotion/transitions`를 쓰되 다음을 주의한다:
`<TransitionSeries.Transition .../>`를 별도 컴포넌트로 감싸서 재사용하면 안 된다 —
`TransitionSeries`가 자식의 `type`을 직접 검사하기 때문에 래퍼를 쓰면 런타임 에러가 난다. props만
변수로 빼고 JSX는 매번 그대로 적는다. 각 `Sequence`의 `durationInFrames` 합은 전체 목표 길이보다
`전환 개수 × 전환 프레임 수`만큼 커야 한다(전환이 앞뒤 시퀀스의 프레임을 겹쳐 쓰기 때문).

## 장식 아이콘 겹침 방지 (decorate.ts)

화면 여백에 브랜드 스프라이트(아이콘)를 흩뿌려 심심하지 않게 할 때, 그냥 랜덤 좌표를 찍으면
아이콘끼리 겹치거나 텍스트 위에 올라가 버린다. `remotion`의 시드 기반 `random(seed)`(같은 seed면
항상 같은 값 → 렌더할 때마다 결과가 고정된다)로 위치를 뽑되, (1) 텍스트·스크린샷이 있는 영역을
"피할 영역"으로 미리 정의하고 (2) 이미 배치한 아이콘의 사각 범위도 다음 아이콘의 회피 대상에
추가해서, 겹치면 최대 N번 다시 뽑는 헬퍼를 만든다:

```ts
// src/shared/decorate.ts (핵심 아이디어만 — 실제 구현할 때 이 패턴을 그대로 채워 넣는다)
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

아이콘을 캐릭터/사물 중심으로 "방사형으로 튀어나온" 느낌으로 배치하고 싶으면(예: 캐릭터를
쓰다듬어서 소품이 터져 나오는 연출), 균등 랜덤 대신 극좌표(각도+반지름)로 중심점 둘레에 뽑되
위와 같은 겹침 회피 로직을 그대로 적용한다. 캔버스 밖으로 나가지 않게 최종 좌표를 여백만큼
클램프하는 것도 잊지 않는다.

## 썸네일 만들기

영상과 같은 Remotion 프로젝트, 같은 에셋(스크린샷·아이콘·폰트·safezone)을 그대로 재사용해서
1080x1920 정지 이미지를 만든다.

- **`<Still>`이 아니라 `<Composition>`으로 등록한다.** 아이콘에 스프링 팝인 애니메이션을 쓰면
  `<Still>`은 항상 frame 0만 렌더해서 delay가 있는 아이콘들이 애니메이션 시작 전(투명) 상태로
  찍혀 하나도 안 보이는 문제가 생긴다. 일반 `<Composition durationInFrames={60} .../>`으로 등록하고
  `npx remotion still src/index.ts <CompositionId> out/<YYMMDD>_<app-name>_thumbnail.png --frame=40`처럼 애니메이션이
  다 끝난 프레임을 지정해서 찍는다.
- 텍스트를 큰 폰트로 `position:absolute; left:50%; transform:translateX(-50%)`로 중앙 정렬할 때
  **`width`를 반드시 명시하거나 `width:'max-content'`를 준다.** `width:auto`인 채로 두면, 절대
  위치 요소의 shrink-to-fit 너비가 "왼쪽 오프셋부터 컨테이너 오른쪽 끝까지"로 제한되는 CSS 규칙
  때문에(예: `left:50%`면 너비가 캔버스 절반으로 제한됨) 텍스트가 중간에서 엉뚱하게 줄바꿈된다.
  이 버그는 컨텍스트 없이는 원인을 짐작하기 어려우니 처음부터 `width:'max-content'`를 기본으로
  붙이는 습관을 들인다.
- 실제 화면을 "전체로" 보여달라는 요청이면 스크린샷을 억지로 늘리지 말고, 원본 비율 그대로 세로
  기준으로 캔버스에 맞추고 남는 좌우 여백은 그 화면의 실제 배경 이미지를 `object-fit: cover`로
  깔아서 이어붙인다 — 스크린샷과 자연스럽게 이어지는 느낌이 난다(같은 배경 에셋이라 이질감이 적다).
- 복수 아이콘을 다시 배치해달라는 피드백을 받으면(개수 줄이기, 특정 아이콘만 남기기, 겹침 제거,
  캔버스 밖으로 삐져나감 클램프) 위 "장식 아이콘 겹침 방지" 헬퍼를 그대로 활용한다.
- 렌더 후 **반드시 Read 도구로 직접 보고** 텍스트 겹침·아이콘 겹침·캔버스 밖 삐져나감을 확인한다.

## 알려진 함정 (요약)

- **pnpm workspace 오염**: `pnpm add`를 쓰면 pnpm이 루트 `pnpm-workspace.yaml`을 찾아 올라가 루트
  `pnpm-lock.yaml`을 건드린다(작업 폴더가 workspace glob에 없어도). 반드시 `npm install`을 쓴다.
- **`TransitionSeries.Transition` 래핑 금지** — "장면 전환" 참고.
- **합성 데이터 스키마 누락** — "3. 실제 화면 스크린샷 캡처" 참고.
- **글꼴 미적용/자소 깨짐** — "폰트 선택" 참고.
- **한글 중간 줄바꿈** — "자막" 참고.
- **`<Still>`에서 애니메이션 아이콘이 안 보임**, **absolute+left:50%+width:auto 줄바꿈 버그** —
  "썸네일 만들기" 참고.

## 예시

ux-lab의 cat-game(고양이의 결정)으로 실제로 만들어 올린 결과물은 위 frontmatter의 `artifacts`
링크(유튜브 쇼츠, 인스타 릴스)로 확인할 수 있다. 저장소 용량을 늘리지 않으려 mp4/png 원본이나
그걸 만든 Remotion 프로젝트 소스는 여기에 커밋하지 않는다 — 이 문서의 코드 스니펫만으로 처음부터
다시 구성할 수 있게 절차·함정을 최대한 구체적으로 적어뒀다.
