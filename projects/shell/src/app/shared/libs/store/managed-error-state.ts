import { SliceKeys } from './slice-keys.type';

export type ErrorDetails = {
  error: Record<string, any>;
} | null;

export type ManagedErrorState<TState> =
  | {
      [Slice in SliceKeys<TState>]: ErrorDetails;
    }
  | null;
