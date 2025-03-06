import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.action';
import { User } from '../../modules/dashboard/pages/users/models';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: User | null;
}

const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthUser, (state, action) => {
    return {
      ...state,
      authUser: action.user,
    };
  }),
  on(AuthActions.unsetAuthUser, (state) => {
    return {
      ...state,
      authUser: null,
    };
  })
);