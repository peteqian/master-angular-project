import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pipe } from 'rxjs';
import { AuthState } from './auth.reducers';

// export const selectAuthState = (state: GlobalState) => state.auth;

const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = pipe(selectAuth, (state) => state.user);
