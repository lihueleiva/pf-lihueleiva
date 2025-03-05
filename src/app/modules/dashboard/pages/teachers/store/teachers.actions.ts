import { createAction, props } from '@ngrx/store';
import { Teacher } from '../model/teachers.model';

export const loadTeachers = createAction('[Teachers] Load Teachers');

export const loadTeachersSuccess = createAction(
  '[Teachers] Load Teachers Success',
  props<{ teachers: Teacher[] }>()
);

export const loadTeachersFailure = createAction(
  '[Teachers] Load Teachers Failure',
  props<{ error: string }>()
);

export const deleteTeacher = createAction(
  '[Teachers] Delete Teacher',
  props<{ id: string }>()
);

export const deleteTeacherSuccess = createAction(
  '[Teachers] Delete Teacher Success',
  props<{ id: string }>()
);

export const deleteTeacherFailure = createAction(
  '[Teachers] Delete Teacher Failure',
  props<{ error: string }>()
);