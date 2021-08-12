import {Observable} from 'rxjs';
import {InjectionToken, Provider} from '@angular/core';

interface HasAutoFetch {
  fetch(...args: any[]): Observable<any>;
}

export const AutoFetch = (): Provider => {
  const provide = new InjectionToken('AutoFetch token ' + new Date().getTime());
  return {
    provide,
    useFactory: () => {
      console.log('yeap');
    }
  };
}
