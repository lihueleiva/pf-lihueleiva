import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Student, StudentsService } from '../services/students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students', () => {
    const mockStudents: Student[] = [
      { id: '1', firstName: 'John', lastName: 'Doe', age: 25 },
      { id: '2', firstName: 'Jane', lastName: 'Smith', age: 30 },
    ];

    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(2);
      expect(students).toEqual(mockStudents);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents); // Simula la respuesta de la API.
  });

  it('should fetch a student by id', () => {
    const mockStudent: Student = { id: '1', firstName: 'John', lastName: 'Doe', age: 25 };

    service.getStudentById('1').subscribe((student) => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudent);
  });

  it('should create a student', () => {
    const newStudent: Student = { firstName: 'John', lastName: 'Doe', age: 25 };

    service.createStudent(newStudent).subscribe((student) => {
      expect(student).toEqual({ ...newStudent, id: '1' });
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newStudent, id: '1' }); // Simula la respuesta de la API.
  });

  it('should update a student', () => {
    const updatedStudent: Student = { id: '1', firstName: 'John', lastName: 'Doe', age: 30 };

    service.updateStudent('1', updatedStudent).subscribe((student) => {
      expect(student).toEqual(updatedStudent);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedStudent);
  });

  it('should delete a student', () => {
    service.deleteStudent('1').subscribe((response) => {
      expect(response).toBeNull(); // La respuesta de delete es void, pero Angular la convierte en null.
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simula una respuesta vacía.
  });
});