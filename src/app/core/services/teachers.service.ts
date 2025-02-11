import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { generateRandomString } from '../../shared/utils';

export interface Teacher {
  id: string;
  name: string;
}

const STORAGE_KEY = 'teachers';

const initialTeachers: Teacher[] = [
  { id: generateRandomString(6), name: 'Juan Pérez' },
  { id: generateRandomString(6), name: 'María López' },
  { id: generateRandomString(6), name: 'Carlos Ramírez' },
];

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private teachersSubject = new BehaviorSubject<Teacher[]>(this.loadTeachers());
  teachers$ = this.teachersSubject.asObservable();

  private loadTeachers(): Teacher[] {
    const storedTeachers = localStorage.getItem(STORAGE_KEY);
    if (storedTeachers) {
      const parsedTeachers = JSON.parse(storedTeachers);
      if (Array.isArray(parsedTeachers) && parsedTeachers.length > 0) {
        return parsedTeachers;
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTeachers));
    return [...initialTeachers];
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.teachersSubject.value));
  }

  getTeachers(): Observable<Teacher[]> {
    return this.teachers$;
  }

  addTeacher(payload: { name: string }): void {
    const newTeacher: Teacher = { id: generateRandomString(6), ...payload };
    const updatedTeachers = [...this.teachersSubject.value, newTeacher];
    this.teachersSubject.next(updatedTeachers);
    this.saveToStorage();
  }

  updateTeacherById(id: string, data: { name: string }): void {
    const updatedTeachers = this.teachersSubject.value.map(teacher =>
      teacher.id === id ? { ...teacher, ...data } : teacher
    );
    this.teachersSubject.next(updatedTeachers);
    this.saveToStorage();
  }

  deleteTeacherById(id: string): void {
    const filteredTeachers = this.teachersSubject.value.filter(teacher => teacher.id !== id);
    this.teachersSubject.next(filteredTeachers);
    this.saveToStorage();
  }
}
