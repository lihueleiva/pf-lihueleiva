import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TeacherFormDialogComponent } from './components/teachers-form-dialog/teachers-form-dialog.component';
import { Teacher } from './model/teachers.model';
import { loadTeachers, deleteTeacher } from './store/teachers.actions';
import { selectIsLoading, selectTeachers } from './store/teachers.selector';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  standalone: false,
})
export class TeachersComponent implements OnInit {
  isLoading$: Observable<boolean>;
  dataSource$: Observable<Teacher[]>;
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private matDialog: MatDialog, private store: Store) {
    this.dataSource$ = this.store.select(selectTeachers);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTeachers());
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este profesor?')) {
      this.store.dispatch(deleteTeacher({ id }));
    }
  }

  openFormDialog(editingTeacher?: Teacher): void {
    this.matDialog
      .open(TeacherFormDialogComponent, { data: { editingTeacher } })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(loadTeachers());
        }
      });
  }
}