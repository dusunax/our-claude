import registry from '../data/registry.json';

export type Status = 'Draft' | 'Verified' | 'Deprecated';

export type Skill = {
  name: string;
  description: string;
  owner: string;
  version: string;
  team: string;
  status: Status;
  artifacts: { title: string; url: string; description: string; thumbnail: string }[];
  updatedAt: string;
  body: string;
};

export const skills = registry.skills as Skill[];

export function getSkill(name: string) {
  return skills.find((s) => s.name === name);
}
