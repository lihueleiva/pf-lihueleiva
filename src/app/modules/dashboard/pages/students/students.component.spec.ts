import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { StudentsService, Student } from '../../../../core/services/students.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentsServiceSpy: jasmine.SpyObj<StudentsService>;
  const mockStudent: Student = { id: '123', firstName: 'John', lastName: 'Doe', age: 25 };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StudentsService', ['getStudents', 'createStudent', 'updateStudent', 'deleteStudent']);

    await TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: StudentsService, useValue: spy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    studentsServiceSpy = TestBed.inject(StudentsService) as jasmine.SpyObj<StudentsService>;
    studentsServiceSpy.getStudents.and.returnValue(of([]));
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty student list', () => {
    expect(component.students.length).toBe(0);
  });

  it('should call loadStudents on init', () => {
    expect(studentsServiceSpy.getStudents).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'onSubmit');
    component.studentForm.setValue({ firstName: '', lastName: '', age: '' });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(studentsServiceSpy.createStudent).not.toHaveBeenCalled();
  });

  it('should call createStudent if form is valid and not editing', () => {
    studentsServiceSpy.createStudent.and.returnValue(of(mockStudent));
    component.studentForm.setValue({ firstName: 'John', lastName: 'Doe', age: 25 });
    component.onSubmit();
    expect(studentsServiceSpy.createStudent).toHaveBeenCalled();
  });

  it('should call updateStudent if editing a student', () => {
    studentsServiceSpy.updateStudent.and.returnValue(of(mockStudent));
    component.editingStudentId = '123';
    component.studentForm.setValue({ firstName: 'John', lastName: 'Doe', age: 25 });
    component.onSubmit();
    expect(studentsServiceSpy.updateStudent).toHaveBeenCalledWith('123', { firstName: 'John', lastName: 'Doe', age: 25 });
  });

  it('should set student data on edit', () => {
    component.onEdit(mockStudent);
    expect(component.editingStudentId).toBe('123');
    expect(component.studentForm.value).toEqual({ firstName: 'John', lastName: 'Doe', age: 25 });
  });

  it('should call deleteStudent on delete confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    studentsServiceSpy.deleteStudent.and.returnValue(of(undefined));
    component.onDelete('123');
    expect(studentsServiceSpy.deleteStudent).toHaveBeenCalledWith('123');
  });
});
