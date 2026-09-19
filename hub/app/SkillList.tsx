'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Skill } from '../lib/registry';

export default function SkillList({ skills }: { skills: Skill[] }) {
  const [q, setQ] = useState('');
  const [team, setTeam] = useState('all');
  const [status, setStatus] = useState('all');
  const [showDeprecated, setShowDeprecated] = useState(false);

  const teams = useMemo(() => Array.from(new Set(skills.map((s) => s.team))), [skills]);

  const filtered = skills.filter((s) => {
    if (!showDeprecated && s.status === 'Deprecated') return false;
    if (team !== 'all' && s.team !== team) return false;
    if (status !== 'all' && s.status !== status) return false;
    const hay = `${s.name} ${s.description} ${s.owner}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <>
      <div className="filters">
        <input
          id="q"
          type="search"
          placeholder="이름, 설명, Owner 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select id="team" value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="all">전체 팀</option>
          {teams.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">전체 상태</option>
          <option value="Draft">Draft</option>
          <option value="Verified">Verified</option>
          <option value="Deprecated">Deprecated</option>
        </select>
        <label>
          <input
            id="deprecated"
            type="checkbox"
            checked={showDeprecated}
            onChange={(e) => setShowDeprecated(e.target.checked)}
          />{' '}
          Deprecated 포함
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">조건에 맞는 Skill이 없습니다.</p>
      ) : (
        <ul className="cards">
          {filtered.map((s) => (
            <li key={s.name}>
              <Link href={`/skills/${s.name}/`} className="card">
                <div className="row">
                  <strong>{s.name}</strong>
                  <span className={`badge ${s.status.toLowerCase()}`}>{s.status}</span>
                </div>
                <p>{s.description}</p>
                <span className="muted">
                  {s.owner} · v{s.version} · {s.team}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
