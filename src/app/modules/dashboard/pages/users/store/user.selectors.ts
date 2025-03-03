import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from './user.reducer';

export const selectUserState = createFeatureSelector<State>(userFeatureKey);

export const selectAllUsers = createSelector(
  selectUserState,
  state => state.users
);
