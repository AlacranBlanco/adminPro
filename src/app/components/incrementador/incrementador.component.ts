import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = "btn-primary";

  @Output('valor') valorEmiter: EventEmitter<number> = new EventEmitter<number>();


  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor = (value: number) => {
    if (this.progreso >= 100 && value >= 0) {
      this.progreso = 100;
    } else if (this.progreso <= 0 && value < 0) {
      this.progreso = 0;
    } else {
      this.progreso = this.progreso + value;
    }
    this.valorEmiter.emit(this.progreso);
    return this.progreso;

  }

  onChange = (value: number) => {
    if (value >= 100) {
      this.progreso = 100;
    } else if (value <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = value;
    }
    this.valorEmiter.emit(this.progreso);
  };


}
