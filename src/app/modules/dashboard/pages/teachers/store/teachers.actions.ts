import { createAction, props } from '@ngrx/store';
import { Teacher } from '../model/teachers.model'; // Asegúrate de que la ruta sea correcta

export const loadTeachers = createAction('[Teachers] Load Teachers');

export const loadTeachersSuccess = createAction(
  '[Teachers] Load Teachers Success',
  props<{ teachers: Teacher[] }>()
);

export const loadTeachersFailure = createAction(
  '[Teachers] Load Teachers Failure',
  props<{ error: string }>()
);
