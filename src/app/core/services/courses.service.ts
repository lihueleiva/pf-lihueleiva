import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { generateRandomString } from '../../shared/utils';

const STORAGE_KEY = 'courses';

const initialCourses: Course[] = [
  { id: generateRandomString(6), name: 'Javascript' },
  { id: generateRandomString(6), name: 'Angular' },
  { id: generateRandomString(6), name: 'RxJs' },
];

@Injectable({ providedIn: 'root' })
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>(this.loadCourses());
  courses$ = this.coursesSubject.asObservable();

  private loadCourses(): Course[] {
    const storedCourses = localStorage.getItem(STORAGE_KEY);
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
        return parsedCourses;
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCourses));
    return [...initialCourses];
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.coursesSubject.value));
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  addCourse(payload: { name: string }): void {
    const newCourse: Course = { id: generateRandomString(6), ...payload };
    const updatedCourses = [...this.coursesSubject.value, newCourse];
    this.coursesSubject.next(updatedCourses);
    this.saveToStorage();
  }

  updateCourseById(id: string, data: { name: string }): void {
    const updatedCourses = this.coursesSubject.value.map(course =>
      course.id === id ? { ...course, ...data } : course
    );
    this.coursesSubject.next(updatedCourses);
    this.saveToStorage();
  }

  deleteCourseById(id: string): void {
    const filteredCourses = this.coursesSubject.value.filter(course => course.id !== id);
    this.coursesSubject.next(filteredCourses);
    this.saveToStorage();
  }
}
