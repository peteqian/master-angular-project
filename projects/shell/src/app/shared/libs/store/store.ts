import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

export class Store<TState> {
  private stateSubject: BehaviorSubject<TState>;
  public readonly state$: Observable<TState>;

  /**
   * Constructor
   * @param initialState Initial state to set.
   */
  protected constructor(initialState: TState) {
    this.stateSubject = new BehaviorSubject<TState>(initialState);
    this.state$ = this.stateSubject.asObservable();
  }

  /**
   * Getter to access current state value
   */
  public get state(): TState {
    return this.stateSubject.getValue();
  }

  /**
   * Setter to set the next state value
   */
  public set state(nextState: TState) {
    this.stateSubject.next(nextState);
  }

  /**
   * Helper method to set a partial state.
   * @param newState New state to set.
   */
  public setState<K extends keyof TState, E extends Partial<Pick<TState, K>>>(selectorFn: (state: TState) => E): void {
    const state = selectorFn(this.state);
    this.stateSubject.next({
      ...this.state,
      ...state
    });
  }

  /**
   * Select a certain attribute to observer.
   * @param selectorFn Mapping function to select entity from state.
   * @returns Observable for selected entity from state.
   */
  public select<TEntity>(selectorFn: (state: TState) => TEntity): Observable<TEntity> {
    return this.state$.pipe(
      map((state: TState) => selectorFn(state)),
      distinctUntilChanged(),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }
}
