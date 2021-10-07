import {QueryParams, RouteParameters} from '../observe-route.service';

export class LeaveRouteContext {
  constructor(public params: RouteParameters,
              public queryParams: RouteParameters,
              public previousQueryParams: QueryParams,
              public previousUrl: string,
              public previousParams: RouteParameters) {
  }
}
