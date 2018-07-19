import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from '../../../../node_modules/rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  numberIngresos: number;
  numberEgresos: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[];

  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription  = this.store.select('ingresoEgreso')
          .subscribe( ingresoEgreso => {
            this.contarIngresoEgreso(ingresoEgreso.items);
          });
  }

  contarIngresoEgreso( items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.numberIngresos = 0;
    this.numberEgresos = 0;

    items.forEach( item => {
      if (item.tipo === 'ingreso') {
        this.numberIngresos++;
        this.ingresos += item.cantidad;
      } else {
        this.numberEgresos++;
        this.egresos += item.cantidad;
      }
    });
    this.doughnutChartData = [ this.ingresos, this.egresos];
  }

}
