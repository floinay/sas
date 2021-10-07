import {InjectionToken} from '@angular/core';
import {RouterService} from './interfaces/router-service';

export const ROUTER_SERVICE = new InjectionToken<RouterService>('Special Router Service for listen url change and get query params');
