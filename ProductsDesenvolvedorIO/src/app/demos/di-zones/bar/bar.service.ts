import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BarService {
  constructor(
    private http: HttpClient
  ) {}

//   public obterUnidade(): string {
//     return (
//       "Unidade ID: " +
//       this.config.unidadeId +
//       " Token: " +
//       this.config.unidadeToken
//     );
//   }

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
