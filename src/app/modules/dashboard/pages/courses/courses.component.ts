import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  standalone: false
})
export class CoursesComponent implements OnInit {
  isLoading = true;
  dataSource$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
    this.dataSource$ = this.courseService.getCourses();
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onDelete(id: string): void {
    if (confirm('¿Estás seguro?')) {
      this.courseService.deleteCourseById(id);
    }
  }

  openFormDialog(editingCourse?: Course): void {
    this.matDialog
      .open(CourseFormDialogComponent, { data: { editingCourse } })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          if (editingCourse) {
            this.courseService.updateCourseById(editingCourse.id, { name: data.name });
          } else {
            this.courseService.addCourse({ name: data.name });
          }
        }
      });
  }
}
