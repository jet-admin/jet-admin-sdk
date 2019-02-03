import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { first, catchError, switchMap  } from 'rxjs/operators';

export abstract class SingletonStore<T> {

  private _instance = new BehaviorSubject<T>(undefined);
  private requested: Subject<T>;
  private fetchSubscription: Subscription;

  protected abstract fetch(): Observable<T>;

  public get instance() {
    return this._instance.value;
  }

  public set instance(value) {
    this._instance.next(value);
  }

  public get instance$() {
    return this._instance.asObservable();
  }

  public get(forceUpdate = false): Observable<T> {
    if (this.requested && forceUpdate) {
      // this.fetchSubscription.unsubscribe(); // TODO: remove redundant queries
      this.requested = undefined;
      this.fetchSubscription = undefined;
    }

    if (!this.requested && this.instance && !forceUpdate) {
      return this.instance$;
    }

    if (!this.requested) {
      const subject = new ReplaySubject<T>(1);

      this.requested = subject;
      this.fetchSubscription = this.fetch().subscribe(
        result => subject.next(result),
        error => subject.error(error)
      );
    }

    const requested = this.requested;

    return requested.pipe(
      switchMap(result => {
        if (this.requested === requested) {
          this.requested = undefined;
          this.fetchSubscription = undefined;
          this.instance = result;
          return this.instance$;
        } else {
          return this.get();
        }
      }),
      catchError(() => {
        if (this.requested === requested) {
          this.requested = undefined;
          this.fetchSubscription = undefined;
          this.instance = undefined;
          return this.instance$;
        } else {
          return this.get();
        }
      })
    );
  }

  public getFirst(forceUpdate = false) {
    return this.get(forceUpdate).pipe(first());
  }
}
