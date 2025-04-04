import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BarFactory, BarService, BarServiceMock, BebidasService } from './bar.service';
import { DI_ZONES_CONFIG, DiZonesConfig } from '../di-zones.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-bar",
  providers: [
    { provide: BarService, useClass: BarServiceMock },
    {
      provide: BarService,
      useFactory: BarFactory,
      deps: [HttpClient, Injector],
    },
    { provide: BebidasService, useExisting: BarService },
  ],
  templateUrl: "./bar.component.html",
})
export class BarComponent implements OnInit {
  public bebidas!: string;
  public tokenByString!: string;
  public tokenByInjectionToken!: string;
  public tokenByUseFactoryInjection!: string;
  public bebidasByUseExisting!: string;

  constructor(
    private barService: BarService,
    private bebidasService: BebidasService,
    @Inject(DI_ZONES_CONFIG) private zonesConfigByInjectionToken: DiZonesConfig,
    @Inject("DI_ZONES_CONFIG") private zonesConfigbyString: DiZonesConfig
  ) {}

  ngOnInit(): void {
    this.bebidas = this.barService.obterBebidas();
    this.tokenByString = this.zonesConfigbyString.token;
    this.tokenByInjectionToken = this.zonesConfigByInjectionToken.token;

    this.tokenByUseFactoryInjection = this.barService.obterUnidade();

    this.bebidasByUseExisting = this.bebidasService.obterBebidas();
  }
}
