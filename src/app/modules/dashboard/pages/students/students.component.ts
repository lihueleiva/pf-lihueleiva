import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Student {
  position: number;
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  studentForm: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'lastName'];
  students: Student[] = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      const newStudent: Student = {
        position: this.students.length + 1,
        ...this.studentForm.value,
      };

      this.students = [...this.students, newStudent];
      this.studentForm.reset();
    }
  }
}
