# our-claude

팀의 Claude Skill·Plugin 원본 저장소와 이를 보여주는 Hub 앱.

```
skills/<name>/SKILL.md   Skill 원본 (프론트매터가 Registry 메타데이터)
skills/<name>/examples/  예제 Artifact 링크
plugins/<name>/          Plugin 정의
hub/                     Next.js 정적 Hub (빌드 시 skills/를 읽어 생성)
```

## SKILL.md 프론트매터

| 필드 | 설명 |
| --- | --- |
| name | Skill 이름 (폴더명과 동일) |
| description | 한 줄 설명 |
| owner | 담당자 |
| version | 예: 1.0.0 |
| team | 대상 팀 |
| status | Draft / Verified / Deprecated |
| artifacts | 예제 Artifact 목록 (`title`, `url`) |

## Hub 실행

```bash
cd hub
npm install
npm run dev      # 개발 서버
npm run build    # out/ 에 정적 파일 생성
```

등록·수정·검증은 MR로 한다. main 직접 push 금지, 관리자 1명 승인.
