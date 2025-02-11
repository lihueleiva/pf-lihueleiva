import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher, TeacherService } from '../../../../../../core/services/teachers.service';

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
        this.teacherService.updateTeacherById(this.data.editingTeacher.id, this.form.value);
      } else {
        this.teacherService.addTeacher(this.form.value);
      }
      this.dialogRef.close(true);
    }
  }
}
