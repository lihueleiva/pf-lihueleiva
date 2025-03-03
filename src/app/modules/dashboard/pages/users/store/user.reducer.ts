import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models/user.interface';

export const userFeatureKey = 'users';

export interface State {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  users: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state, loading: true, error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state, users, loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state, loading: false, error
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer
});
