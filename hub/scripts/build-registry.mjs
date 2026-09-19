import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');
const skillsDir = join(repoRoot, 'skills');
const REQUIRED = ['name', 'description', 'owner', 'version', 'team', 'status'];
const STATUSES = ['Draft', 'Verified', 'Deprecated'];

function lastCommitDate(file) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (out) return out;
  } catch {}
  return statSync(file).mtime.toISOString();
}

const skills = [];
const errors = [];

for (const dir of readdirSync(skillsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const file = join(skillsDir, dir.name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const { data, content } = matter(readFileSync(file, 'utf8'));

  for (const key of REQUIRED) {
    if (!data[key]) errors.push(`${dir.name}: 프론트매터 '${key}' 누락`);
  }
  if (data.status && !STATUSES.includes(data.status)) {
    errors.push(`${dir.name}: status는 ${STATUSES.join(' / ')} 중 하나`);
  }
  if (data.name && data.name !== dir.name) {
    errors.push(`${dir.name}: name('${data.name}')이 폴더명과 다름`);
  }

  skills.push({
    name: data.name ?? dir.name,
    description: data.description ?? '',
    owner: data.owner ?? '',
    version: String(data.version ?? ''),
    team: data.team ?? '',
    status: data.status ?? 'Draft',
    artifacts: Array.isArray(data.artifacts) ? data.artifacts : [],
    updatedAt: lastCommitDate(file),
    body: content.trim(),
  });
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

skills.sort((a, b) => a.name.localeCompare(b.name));
mkdirSync(join(here, '..', 'data'), { recursive: true });
writeFileSync(join(here, '..', 'data', 'registry.json'), JSON.stringify({ skills }, null, 2));
console.log(`registry: ${skills.length} skills`);
