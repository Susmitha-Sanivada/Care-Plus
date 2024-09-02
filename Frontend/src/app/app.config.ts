import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects(EmployeeEffects),
  ],
};
