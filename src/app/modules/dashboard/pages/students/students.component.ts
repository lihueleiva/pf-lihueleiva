import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Student {
  position: number;
  firstName: string;
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
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'actions'];
  students: Student[] = [];
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      if (this.editingIndex !== null) {
        const updatedStudent = {
          position: this.students[this.editingIndex].position,
          ...this.studentForm.value,
        };
        this.students = [
          ...this.students.slice(0, this.editingIndex),
          updatedStudent,
          ...this.students.slice(this.editingIndex + 1),
        ];
        this.editingIndex = null;
      } else {
        const newStudent: Student = {
          position: this.students.length + 1,
          ...this.studentForm.value,
        };
        this.students = [...this.students, newStudent];
      }
      this.studentForm.reset();
    }
  }

  onEdit(index: number) {
    this.editingIndex = index;
    const student = this.students[index];
    this.studentForm.setValue({
      firstName: student.firstName,
      lastName: student.lastName,
    });
  }

  onDelete(index: number) {
    this.students.splice(index, 1);
    this.students = this.students.map((student, i) => ({
      ...student,
      position: i + 1,
    }));
  }
}
