import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { ProductsResolve } from './products/services/product.resolve';
import { DI_ZONES_CONFIG, DiZonesConfig } from './demos/di-zones/di-zones.config';

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes
      // withDebugTracing()
    ),
    provideHttpClient(),
    provideEnvironmentNgxMask(maskConfig),
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: DI_ZONES_CONFIG, useValue: {token: '2c87c739-b2e2-4fac-b523-16cc29b178ec'} as DiZonesConfig },
    { provide: "DI_ZONES_CONFIG", useValue: {token: 'be2510c1-d4f0-45ef-8180-cd1dcd565ff9'} as DiZonesConfig },
    ProductsResolve
  ],
};


