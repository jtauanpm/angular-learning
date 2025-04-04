import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { DI_ZONES_CONFIG, DiZonesConfig } from "../di-zones.config";

export function BarFactory(http: HttpClient, injector: Injector): BarService {
  return new BarService(http, injector.get(DI_ZONES_CONFIG));
}

@Injectable()
export class BarService {
  constructor(
    private http: HttpClient,
    @Inject(DI_ZONES_CONFIG) private config: DiZonesConfig
  ) {}

  public obterUnidade(): string {
    return ("Token: " + this.config.token);
  }

  obterBebidas(): string {
    return "Bebidas";
  }

  obterPorcoes(): string {
    return "Porções";
  }

  obterRefeicoes(): string {
    return "Refeições";
  }
}

export class BarServiceMock {
  obterBebidas(): string {
    return "Mock";
  }

  obterPorcoes(): string {
    return "Mock";
  }

  obterRefeicoes(): string {
    return "Mock";
  }
}

export abstract class BebidasService {
  abstract obterBebidas: () => string
}
