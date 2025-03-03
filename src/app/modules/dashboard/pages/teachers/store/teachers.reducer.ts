import { createReducer, on } from '@ngrx/store';
import { loadTeachers, loadTeachersSuccess, loadTeachersFailure } from './teachers.actions';
import { Teacher } from '../model/teachers.model';

export interface TeachersState {
  teachers: Teacher[];
  error: string | null;
  isLoading: boolean; // Agregada la propiedad isLoading
}

export const initialState: TeachersState = {
  teachers: [],
  error: null,
  isLoading: false, // Inicializamos isLoading en false
};

export const teachersReducer = createReducer(
  initialState,
  on(loadTeachers, state => ({
    ...state,
    isLoading: true, // Indicamos que está cargando
    error: null
  })),
  on(loadTeachersSuccess, (state, { teachers }) => ({
    ...state,
    teachers,
    isLoading: false, // Cuando termina la carga, ponemos isLoading a false
  })),
  on(loadTeachersFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false, // Cuando ocurre un error, también ponemos isLoading a false
  }))
);
