import { LoadState } from './load-state.enum';
import { SliceKeys } from './slice-keys.type';

export type ManagedLoadState<TState> =
  | {
      [Slice in SliceKeys<TState>]: LoadState;
    }
  | null;
