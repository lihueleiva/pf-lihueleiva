import { createReducer, on } from '@ngrx/store';
import { loadTeachers, loadTeachersSuccess, loadTeachersFailure, deleteTeacherSuccess, deleteTeacherFailure } from './teachers.actions';
import { Teacher } from '../model/teachers.model';

export interface TeachersState {
  teachers: Teacher[];
  error: string | null;
  isLoading: boolean;
}

export const initialState: TeachersState = {
  teachers: [],
  error: null,
  isLoading: false,
};

export const teachersReducer = createReducer(
  initialState,
  on(loadTeachers, (state) => ({ ...state, isLoading: true, error: null })),
  on(loadTeachersSuccess, (state, { teachers }) => ({ ...state, teachers, isLoading: false })),
  on(loadTeachersFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(deleteTeacherSuccess, (state, {id})=> ({...state, teachers: state.teachers.filter(teacher => teacher.id !== id)})),
  on(deleteTeacherFailure, (state, {error})=> ({...state, error}))
);