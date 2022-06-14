import { Address } from './address.interface';
import { Student } from './students.interface';

export interface School {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  address: Address | null;
  students: Student[];
}
