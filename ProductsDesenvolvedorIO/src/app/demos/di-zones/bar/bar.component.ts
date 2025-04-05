import { Component, Inject, Injector, NgZone, OnInit } from '@angular/core';
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
    private ngZone: NgZone,
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

  progress: number = 0;
  label!: string;

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = "inside";
    this.progress = 0;
    this._increaseProgress(() => console.log("Inside Done!"));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = "outside";
    this.progress = 0;
    this.ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this.ngZone.run(() => {
          console.log("Outside Done!");
        });
      });
    });
  }
  
  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }
}
