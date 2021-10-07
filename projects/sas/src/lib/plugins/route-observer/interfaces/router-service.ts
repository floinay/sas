import {Observable} from 'rxjs';
import {QueryParams} from '../services/observe-route.service';

export interface RouterService {
  readonly onNavigationEnd$: Observable<string>;

  queryParams(): QueryParams;
}
