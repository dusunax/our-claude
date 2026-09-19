import { skills } from '../lib/registry';
import SkillList from './SkillList';

export default function Home() {
  return <SkillList skills={skills} />;
}
