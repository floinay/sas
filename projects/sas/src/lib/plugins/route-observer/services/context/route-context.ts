import {RouteParameters} from '../observe-route.service';

export class RouteContext {
  constructor(public params: RouteParameters, public queryParams: RouteParameters) {
  }
}
