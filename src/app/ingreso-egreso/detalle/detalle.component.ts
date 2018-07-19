import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';
import { AppState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription;

  constructor(private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
          console.log(ingresoEgreso.items);
          this.items = ingresoEgreso.items;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(item: IngresoEgreso) {
    this.ingresoEgresoService.deleteIngresoEgreso( item.uid )
        .then(() =>
          Swal('Item elimina', item.descripcion , 'success')
        );
  }

}
