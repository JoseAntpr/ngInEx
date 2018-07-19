import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from '../../../node_modules/rxjs';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui-actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(public inegService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubs = this.store.select('ui')
        .subscribe( ui => this.loading = ui.isLoading);
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'cantidad': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivateLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });

    this.inegService.createIngresoEgreso( ingresoEgreso )
        .then( () => {
          this.store.dispatch( new DeactivateLoadingAction());
          Swal('Creado', ingresoEgreso.descripcion, 'success');
          this.form.reset({ cantidad: 0 });
        });

  }

}
