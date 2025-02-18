import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { TeacherService } from '../../../../core/services/teachers.service';
import { TeacherFormDialogComponent } from './components/teachers-form-dialog/teachers-form-dialog.component';
import { Teacher } from './model/teachers.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  standalone: false
})
export class TeachersComponent implements OnInit {
  isLoading = true;
  dataSource$: Observable<Teacher[]>;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private teacherService: TeacherService,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource$ = this.teacherService.getTeachers();
  }

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe({
      next: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
      this.teacherService.deleteTeacherById(id).subscribe(() => {
        this.fetchTeachers();
      });
    }
  }

  openFormDialog(editingTeacher?: Teacher): void {
    this.matDialog
      .open(TeacherFormDialogComponent, { data: { editingTeacher } })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.fetchTeachers();
        }
      });
  }
}