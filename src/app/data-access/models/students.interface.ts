import { Skill } from './skill.interface';

export interface Student {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  skills: Skill[];
}
