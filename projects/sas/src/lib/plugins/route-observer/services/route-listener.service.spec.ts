import {TestBed} from '@angular/core/testing';
import {Injectable} from '@angular/core';
import {State} from '../../../state/state';
import {AbstractState} from '../../../abstract/abstract.state';
import {ObserveRoute} from '../observe-route';
import {QueryParams, RouteContext, RouteListenerService} from './route-listener.service';
import {RouterService as RouterServiceContract} from '../interfaces/router-service';
import {Subject} from 'rxjs';
import {ROUTER_SERVICE} from '../providers';


interface TestStateInterface {
  root: boolean;
  url: boolean;
  slug: string | false;
  urlWithSlugAndChild: string | false;
}

@Injectable({providedIn: 'root'})
class RouterService implements RouterServiceContract {
  readonly onNavigationEnd$: Subject<string> = new Subject<string>();
  private queryParamsCache: QueryParams = {};

  queryParams(): QueryParams {
    return this.queryParamsCache;
  }

  navigate(url: string, params: QueryParams = {}): void {
    this.queryParamsCache = params;
    this.onNavigationEnd$.next(url);
  }

}


@State<TestStateInterface>({
  name: 'test',
  defaults: {root: false, url: false, slug: false, urlWithSlugAndChild: false}
})
@Injectable({providedIn: 'root'})
class TestState extends AbstractState<TestStateInterface> {

  @ObserveRoute('/')
  root() {
    this.resetState();
    this.patchState({root: true});
    console.log(this.snapshot);
  }

  @ObserveRoute('/test')
  test() {
    this.resetState();
    this.patchState({url: true});
  }

  @ObserveRoute('test-with-slug/:slug')
  testSlug(context: RouteContext) {
    this.resetState();
    this.patchState({slug: context.params.slug});
  }
}

describe('Observer Injector Service', () => {
  let service: RouteListenerService;
  let router: RouterService;
  let state: TestState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ROUTER_SERVICE,
          useExisting: RouterService
        }
      ]
    });
    router = TestBed.inject<RouterService>(ROUTER_SERVICE);
    service = TestBed.inject(RouteListenerService);
    state = TestBed.inject(TestState);
  });

  it('test root page', () => {
    router.navigate('/');
    console.log(router);
    // expect(state.snapshot.root).toBe(true);
    // expect(state.snapshot.slug).toBe(false);
    // expect(state.snapshot.url).toBe(false);
    // expect(state.snapshot.urlWithSlugAndChild).toBe(false);
  });
})
