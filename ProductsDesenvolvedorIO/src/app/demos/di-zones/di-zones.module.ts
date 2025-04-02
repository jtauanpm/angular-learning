import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { BarService, BarServiceMock } from './bar/bar.service';
import { DI_ZONES_CONFIG, DiZonesConfig } from './di-zones.config';
import { RouterModule, Routes } from '@angular/router';

const DI_ZONES_ROUTES: Routes = [
  { path: "", component: BarComponent }
];

@NgModule({
  declarations: [BarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DI_ZONES_ROUTES)
  ],
  providers: [BarService],
})
export class DiZonesModule {
  static forRoot(config: DiZonesConfig): ModuleWithProviders<DiZonesModule> {
    return {
      ngModule: DiZonesModule,
      providers: [{ provide: DI_ZONES_CONFIG, useClass: BarServiceMock }],
    };
  }
}
