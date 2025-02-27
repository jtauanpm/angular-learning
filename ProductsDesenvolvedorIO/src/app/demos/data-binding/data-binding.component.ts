import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-data-binding",
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: "./data-binding.component.html",
  styleUrl: "./data-binding.component.css",
})
export class DataBindingComponent {
  public clickCounter: number = 0;
  public urlImage = "https://img.icons8.com/?size=100&id=71257&format=png&color=000000";
  public name = "";

  addClick() {
    this.clickCounter++;
  }

  resetCounterClick() {
    this.clickCounter = 0;
  }

  keyUp(event: any) {
    this.name = event.target.value;
  }
}
