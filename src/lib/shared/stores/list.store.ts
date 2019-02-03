import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class ListStore<M> {

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _items: BehaviorSubject<M[]> = new BehaviorSubject(undefined);
  private _currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  private _fromPage: BehaviorSubject<number> = new BehaviorSubject(1);
  private _nextPage: BehaviorSubject<number> = new BehaviorSubject(1);
  private _totalPages: BehaviorSubject<number> = new BehaviorSubject(0);
  private _count: BehaviorSubject<number> = new BehaviorSubject(undefined);

  get loading$() {
    return this._loading.asObservable();
  }

  get loading() {
    return this._loading.value;
  }

  get items$() {
    return this._items.asObservable();
  }

  get items() {
    return this._items.value;
  }

  get currentPage$() {
    return this._currentPage.asObservable();
  }

  get currentPage() {
    return this._currentPage.value;
  }

  get fromPage$() {
    return this._fromPage.asObservable();
  }

  get fromPage() {
    return this._fromPage.value;
  }

  get nextPage$() {
    return this._nextPage.asObservable();
  }

  get nextPage() {
    return this._nextPage.value;
  }

  get totalPages$() {
    return this._totalPages.asObservable();
  }

  get totalPages() {
    return this._totalPages.value;
  }

  get count$() {
    return this._count.asObservable();
  }

  get count() {
    return this._count.value;
  }

  availableNext() {
    return this.nextPage != undefined;
  }

  abstract fetchPage(page: number): Observable<{
    items: M[],
    totalPages: number,
    perPage: number,
    count: number
  }>;

  getNext(): Observable<M[]> {
    if (!this.availableNext() || this.loading) {
      return of([]);
    }

    this._loading.next(true);
    this._currentPage.next(this.nextPage);

    const obs = this.fetchPage(this.nextPage);

    obs.subscribe(
      response => {
        const items = this._items.value != null ? this._items.value : [];
        const appendItems = response.items;

        items.push(...appendItems);

        this._totalPages.next(response.totalPages);
        this._nextPage.next(this.nextPage < this.totalPages ? this.nextPage + 1 : undefined);
        this._count.next(response.count);
        this._items.next(items);
        this._loading.next(false);
      },
      error => {
        this._loading.next(false);
        console.error(error);
      }
    );

    return obs.pipe(map(response => response.items));
  }

  reset(page = 1) {
    this._items.next(undefined);
    this._currentPage.next(page);
    this._fromPage.next(page);
    this._nextPage.next(page);
    this._totalPages.next(0);
    this._count.next(undefined);
  }
}
