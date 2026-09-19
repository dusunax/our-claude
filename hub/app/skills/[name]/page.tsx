import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSkill, skills } from '../../../lib/registry';

export function generateStaticParams() {
  return skills.map((s) => ({ name: s.name }));
}

export default async function SkillDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const skill = getSkill(name);
  if (!skill) notFound();

  return (
    <article>
      <Link href="/" className="muted">← 목록</Link>
      <h1>
        {skill.name} <span className={`badge ${skill.status.toLowerCase()}`}>{skill.status}</span>
      </h1>
      <p>{skill.description}</p>

      <dl className="meta">
        <dt>Owner</dt><dd>{skill.owner}</dd>
        <dt>버전</dt><dd>v{skill.version}</dd>
        <dt>팀</dt><dd>{skill.team}</dd>
        <dt>최근 업데이트</dt><dd>{skill.updatedAt.slice(0, 10)}</dd>
      </dl>

      <h2>Artifact 예제</h2>
      {skill.artifacts.length === 0 ? (
        <p className="muted">연결된 Artifact가 없습니다.</p>
      ) : (
        <ul>
          {skill.artifacts.map((a) => (
            <li key={a.url}>
              <a href={a.url} target="_blank" rel="noreferrer">{a.title}</a>
            </li>
          ))}
        </ul>
      )}

      <h2>SKILL.md</h2>
      <pre className="body">{skill.body}</pre>
    </article>
  );
}
