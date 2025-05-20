import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
@Component({
  selector: 'conta-app-root',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterModule]
})
export class ContaAppComponent {}
