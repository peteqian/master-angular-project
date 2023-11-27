import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from './store';
import { ErrorDetails, ManagedErrorState } from './managed-error-state';
import { ManagedLoadState } from './managed-load-state';
import { LoadState } from './load-state.enum';
import { SliceKeys } from './slice-keys.type';

export class ManagedStore<TState> extends Store<TState> {
  private loadingStateSubject: BehaviorSubject<ManagedLoadState<TState>>;
  public readonly loading$: Observable<ManagedLoadState<TState>>;

  private errorStateSubject: BehaviorSubject<ManagedErrorState<TState>>;
  public readonly error$: Observable<ManagedErrorState<TState>>;

  /**
   * Constructor
   * @param initialState Initial state to set.
   */
  protected constructor(
    initialState: TState,
    initialLoadingState: ManagedLoadState<TState> = null,
    initialErrorState: ManagedErrorState<TState> = null
  ) {
    super(initialState);

    this.loadingStateSubject = new BehaviorSubject<ManagedLoadState<TState>>(initialLoadingState);
    this.loading$ = this.loadingStateSubject.asObservable();

    this.errorStateSubject = new BehaviorSubject<ManagedErrorState<TState>>(initialErrorState);
    this.error$ = this.errorStateSubject.asObservable();
  }

  /**
   * Getter to access current loading state value
   */
  public get loadingState(): ManagedLoadState<TState> {
    return this.loadingStateSubject.getValue();
  }

  /**
   * Setter to set the next loading state value
   */
  public set loadingState(nextState: ManagedLoadState<TState>) {
    this.loadingStateSubject.next(nextState);
  }

  public setLoadingState<Slice extends SliceKeys<TState>>(slice: Slice, state: LoadState) {
    let newLoadingState = {
      [slice]: state,
    };

    this.loadingStateSubject.next({
      ...this.loadingState,
      ...newLoadingState,
    } as ManagedLoadState<TState>);
  }

  public setLoading<Slice extends SliceKeys<TState>>(slice: Slice) {
    this.setLoadingState(slice, LoadState.Loading);
  }

  public setLoaded<Slice extends SliceKeys<TState>>(slice: Slice) {
    this.setLoadingState(slice, LoadState.Loaded);
  }

  public selectLoading<TSlice extends SliceKeys<TState>>(slice: TSlice): Observable<boolean> {
    return this.loading$.pipe(
      map(
        (loadingState: ManagedLoadState<TState>) => (loadingState && loadingState[slice] === LoadState.Loading) || false
      ),
      distinctUntilChanged()
    );
  }

  public selectLoaded<TSlice extends SliceKeys<TState>>(slice: TSlice): Observable<boolean> {
    return this.loading$.pipe(
      map(
        (loadingState: ManagedLoadState<TState>) => (loadingState && loadingState[slice] === LoadState.Loaded) || false
      ),
      distinctUntilChanged()
    );
  }

  /**
   * Getter to access current error state value
   */
  public get errorState(): ManagedErrorState<TState> {
    return this.errorStateSubject.getValue();
  }

  /**
   * Setter to set the next loading state value
   */
  public set errorState(nextState: ManagedErrorState<TState>) {
    this.errorStateSubject.next(nextState);
  }

  public setErrorState<Slice extends SliceKeys<TState>>(slice: Slice, errorDetails: ErrorDetails) {
    let newErrorState = {
      [slice]: errorDetails,
    };

    this.errorStateSubject.next({
      ...this.errorState,
      ...newErrorState,
    } as ManagedErrorState<TState>);
  }

  public selectErrorDetails<TSlice extends SliceKeys<TState>>(slice: TSlice): Observable<ErrorDetails> {
    return this.error$.pipe(
      map((errorState: ManagedErrorState<TState>) => (errorState && errorState[slice]) || null),
      distinctUntilChanged()
    );
  }

  public selectError<TSlice extends SliceKeys<TState>>(slice: TSlice, errorKey: string): Observable<any> {
    return this.error$.pipe(
      map(
        (errorState: ManagedErrorState<TState>) =>
          (errorState && errorState[slice] && errorState[slice]?.error[errorKey]) || null
      ),
      distinctUntilChanged()
    );
  }
}
