import {Observable} from 'rxjs';
import {QueryParams} from '../services/route-listener.service';

export interface RouterService {
  readonly onNavigationEnd$: Observable<string>;

  queryParams(): QueryParams;
}
