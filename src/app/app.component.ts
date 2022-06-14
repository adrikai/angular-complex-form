import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { School } from './data-access/models/school.interface';
import { Student } from './data-access/models/students.interface';
import { Skill } from './data-access/models/skill.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'complex-form';
  schoolForm!: FormGroup;
  school: School = {
    name: 'Chiclana Dev School',
    emailAddress: 'chidevschool@gmail.com',
    phoneNumber: '+34 612 345 678',
    address: {
      city: 'Chiclana',
      country: 'Spain',
      state: 'Cádiz',
      street: 'Calle de la ciudad',
    },
    students: [
      {
        name: 'Juan',
        emailAddress: 'juan@gmail.com',
        phoneNumber: '+34 612 345 ',
        skills: [
          { name: 'HTML', level: 5 },
          {
            name: 'CSS',
            level: 5,
          },
        ],
      },
    ],
  };

  readonly initialStateForm = {
    name: this.fb.control(''),
    phoneNumber: this.fb.control(''),
    emailAddress: this.fb.control(''),
    address: this.fb.group({
      street: this.fb.control(''),
      city: this.fb.control(''),
      state: this.fb.control(''),
      country: this.fb.control(''),
    }),
    students: this.fb.array([]),
  };

  readonly newStudent = {
    name: '',
    phoneNumber: '',
    emailAddress: '',
    skills: this.fb.array([]),
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.schoolForm = this.fb.group({ ...this.initialStateForm });
  }

  onSubmit(): void {
    console.log('Form submit: ', this.schoolForm.value);
  }

  clearForm(): void {
    this.schoolForm.reset();
    this.schoolForm.controls['students'] = this.fb.array([]);
  }

  get studentArray(): FormArray {
    return this.schoolForm.get('students') as FormArray;
  }

  initStudent(): FormGroup {
    return this.fb.group(this.newStudent);
  }

  addStudent(): void {
    this.studentArray.push(this.initStudent());
  }

  removeStudent(index: number): void {
    this.studentArray.removeAt(index);
  }

  initSkill(): FormGroup {
    return this.fb.group({
      name: '',
      level: '',
    });
  }

  skillArray(index: number): FormArray {
    return this.studentArray.controls[index].get('skills') as FormArray;
  }

  removeSkill(studentIndex: number, skillIndex: number): void {
    this.skillArray(studentIndex).removeAt(skillIndex);
  }

  addSkill(studentIndex: number): void {
    this.skillArray(studentIndex).push(this.initSkill());
  }

  patchForm(): void {
    this.schoolForm.patchValue({
      name: this.school.name,
      phoneNumber: this.school.phoneNumber,
      emailAddress: this.school.emailAddress,
      address: this.school.address,
    });
    this.patchStudents();
  }

  patchStudents(): void {
    this.school.students.forEach((student: Student) => {
      const skillArray: FormArray = this.fb.array([]);
      student.skills.forEach((skill: Skill) => {
        skillArray.push(this.fb.group(skill));
      });
      const skillGroup: FormGroup = this.fb.group({
        ...student,
        skills: skillArray,
      });
      this.studentArray.push(skillGroup);
    });
  }
}
