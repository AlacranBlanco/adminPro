import {Component, OnInit} from '@angular/core';
import {MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component implements OnInit {

  public labels1: string[] =  ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [350, 450, 100]
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
