import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../../../../../core/services/teachers.service';
import { Teacher } from '../../model/teachers.model';

@Component({
  selector: 'app-teachers-form-dialog',
  templateUrl: './teachers-form-dialog.component.html',
  styleUrls: ['./teachers-form-dialog.component.scss'],
  standalone: false
})
export class TeacherFormDialogComponent {
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    public dialogRef: MatDialogRef<TeacherFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editingTeacher?: Teacher }
  ) {
    this.isEditMode = !!data.editingTeacher;

    this.form = this.fb.group({
      name: [data.editingTeacher?.name || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditMode && this.data.editingTeacher) {
        this.teacherService
          .updateTeacher(this.data.editingTeacher.id, this.form.value)
          .subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Error updating teacher:', err);
              this.dialogRef.close(false);
            },
          });
      } else {
        this.teacherService
          .createTeacher(this.form.value)
          .subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Error creating teacher:', err);
              this.dialogRef.close(false);
            },
          });
      }
    }
  }
}