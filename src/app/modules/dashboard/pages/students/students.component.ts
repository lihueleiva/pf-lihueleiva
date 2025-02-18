import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  standalone: false,
})
export class StudentsComponent implements OnInit {
  studentForm: FormGroup;
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  students: Student[] = [];
  editingStudentId: string | null = null;
  editingIndex: any;

  constructor(private fb: FormBuilder, private studentsService: StudentsService) {
    this.studentForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data.map((student, index) => ({ ...student, position: index + 1 }));
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentData: Student = this.studentForm.value;

    if (this.editingStudentId) {
      this.studentsService.updateStudent(this.editingStudentId, studentData).subscribe(() => {
        this.loadStudents();
        this.editingStudentId = null;
        this.studentForm.reset();
      });
    } else {
      this.studentsService.createStudent(studentData).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
      });
    }
  }

  onEdit(student: Student): void {
    this.editingStudentId = student.id || null;
    this.studentForm.setValue({
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
    });
  }

  onDelete(id: string): void {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
