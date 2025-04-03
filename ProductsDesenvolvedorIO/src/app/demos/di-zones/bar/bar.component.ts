import { Component, Inject, OnInit } from '@angular/core';
import { BarService, BarServiceMock } from './bar.service';
import { DI_ZONES_CONFIG, DiZonesConfig } from '../di-zones.config';

@Component({
  selector: "app-bar",
  providers: [{ provide: BarService, useClass: BarServiceMock }],
  templateUrl: "./bar.component.html",
})
export class BarComponent implements OnInit {
  public bebidas!: string;
  public tokenByString!: string;
  public tokenByInjectionToken!: string;

  constructor(
    private barService: BarService,
    @Inject(DI_ZONES_CONFIG) zonesConfigByInjectionToken: DiZonesConfig,
    @Inject("DI_ZONES_CONFIG") zonesConfigbyString: DiZonesConfig
  ) {
    this.tokenByString = zonesConfigbyString.token;
    this.tokenByInjectionToken = zonesConfigByInjectionToken.token;
  }

  ngOnInit(): void {
    this.bebidas = this.barService.obterBebidas();
  }
}
