import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./navigation/home/home.component";
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { FooterComponent } from "./navigation/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'DevIO-ShowCase';
}
