import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../../modules/dashboard/pages/teachers/model/teachers.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'https://67b4fa83a9acbdb38ed1037a.mockapi.io/pfleiva/api/v1/teachers';

  constructor(private http: HttpClient) {}

  // Obtener todos los profesores
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  // Obtener un profesor por ID
  getTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo profesor
  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  // Actualizar un profesor existente
  updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }

  // Eliminar un profesor por ID
  deleteTeacherById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}