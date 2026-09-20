'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Tab = 'preview' | 'markdown';

const TABS: { id: Tab; label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'markdown', label: 'Markdown' },
];

export default function SkillBody({ body }: { body: string }) {
  const [tab, setTab] = useState<Tab>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      // 클립보드 접근이 막힌 환경에서는 아무 표시도 하지 않는다.
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="SKILL.md 보기 방식" className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            className="tab"
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <button type="button" className="copy" onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === 'preview' ? (
          <div className="body md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        ) : (
          <pre className="body">{body}</pre>
        )}
      </div>
    </div>
  );
}
