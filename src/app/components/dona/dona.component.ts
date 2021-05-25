import {Component, Input, OnInit} from '@angular/core';
import {Color, Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  @Input() titulo: string = "No title";
  @Input('label') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [1, 1, 1]
  ];

  public colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
