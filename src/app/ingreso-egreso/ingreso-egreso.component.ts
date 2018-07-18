import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo = 'ingreso';

  constructor(public inegService: IngresoEgresoService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'cantidad': new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });

    this.inegService.createIngresoEgreso( ingresoEgreso )
        .then( () => {
          Swal('Creado', ingresoEgreso.descripcion, 'success');
          this.form.reset({ cantidad: 0 });
        });

  }

}
