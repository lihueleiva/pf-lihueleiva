import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { generateRandomString } from '../../../../shared/utils';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import { Course } from '../courses/models';
import { User } from '../users/models';
import { CourseService } from '../../../../core/services/courses.service';
import { UsersService } from '../../../../core/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentActions } from './store/enrollments.actions';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;
  courses: Course[] = [];
  students: User[] = [];

  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private coursesService: CourseService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.error$ = this.store.select(selectEnrollmentsError);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetState());
  }
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();
  }

  loadStudentsAndCourses(): void {
    forkJoin([
      this.coursesService.getCourses(),
      this.usersService.getStudentUsers(),
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses;
        this.students = students;
      },
    });
  }

  createEnrollment(): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        data: {
          courseId: generateRandomString(6),
          studentId: generateRandomString(6),
        },
      })
    );
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
      );
    }
  }
}
function selectEnrollments(state: object): Enrollment[] {
    throw new Error('Function not implemented.');
}

function selectEnrollmentsError(state: object): unknown {
    throw new Error('Function not implemented.');
}

function selectIsLoadingEnrollments(state: object): boolean {
    throw new Error('Function not implemented.');
}

