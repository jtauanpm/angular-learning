import { Component, OnInit } from '@angular/core';
import { BarService, BarServiceMock } from './bar.service';

@Component({
  selector: 'app-bar',
  standalone: false,
  providers: [
    {provide: BarService, useClass: BarServiceMock}
  ],
  templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit{
  public bebidas!: string;
  
  constructor(private barService: BarService) {
  }

  ngOnInit(): void {
    this.bebidas = this.barService.obterBebidas();
  }
}
