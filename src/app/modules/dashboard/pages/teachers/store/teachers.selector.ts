import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeachersState } from './teachers.reducer';

export const selectTeachersState = createFeatureSelector<TeachersState>('teachers');

export const selectTeachers = createSelector(
  selectTeachersState,
  (state: TeachersState) => state.teachers
);

export const selectTeachersError = createSelector(
  selectTeachersState,
  (state: TeachersState) => state.error
);

export const selectIsLoading = createSelector(
  selectTeachersState,
  (state: TeachersState) => state.isLoading // Selector para isLoading
);
