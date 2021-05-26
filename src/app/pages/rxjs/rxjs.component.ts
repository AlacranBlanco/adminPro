import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map, retry, take} from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {


    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   err => console.warn('Error', err),
    //   () => console.info('Obs terminado')
    // );
    this.intervalSubs = this.retornaIntevarl()
      .subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntevarl = (): Observable<number> => {

    return interval(100)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0))
      );
  }

  retornaObservable = (): Observable<number> => {
    let i = -1;

    return new Observable<number>(observer => {

      const interval = setInterval(() => {
        ++i;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          observer.error('I llego al valor de 2');
        }
      }, 1000)
    });


  }

}
