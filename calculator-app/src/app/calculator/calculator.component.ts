import { Component, OnInit } from '@angular/core';
import { CalculateService } from './calculate.service';

import { CalcRecord } from 'src/models/calc-record.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public title: String = 'Calculator';
  public historic:boolean = false;
  public field:string = '';
  public null:string = 'empty';
  public historicList:CalcRecord[] = [];
  public result:string = '';
  public clearConfirm:boolean = false;

  constructor(private calculateService:CalculateService) { this.load() }

  clean(){
    this.field = '';
  }

  add(value:string){
    if(this.field == this.null || this.field == this.result){
      this.clean();
    }
    this.field = this.field + value;
  }

  back(){
    this.field = this.field.substring(0, this.field.length -1);
  }

  calculate(){
    if(this.field !== '' && this.field !== this.result){
      this.result = this.calculateService.calculate(this.field);
      this.addHistoric(this.field, this.result);
      this.field = this.result;
    }else if(this.field !== this.null){
      this.field = this.null
    }    

  }

  addHistoric(expression:string, result:string){
    this.historicList.unshift(new CalcRecord(expression,result));
    this.save();
  }

  cleanHistory(){
    this.clearConfirm = confirm("Do you want to clear the history ?");
    if(this.clearConfirm == true){
      this.historicList = [];
      this.save();
      this.historic = false;
    }
  }

  save(){
    const dataHistoric = JSON.stringify(this.historicList);
    sessionStorage.setItem('historicList', dataHistoric);
  }

  load(){
    const dataHistoric = sessionStorage.getItem('historicList');
    
    if(dataHistoric !== null){
      this.historicList = JSON.parse(dataHistoric);
    }
  }

  showHistory(){
    this.historic = !this.historic;
  }


  ngOnInit(): void {
  }

}
