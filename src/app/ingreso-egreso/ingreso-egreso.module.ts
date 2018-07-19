import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';

// Pipe
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';

// Forms
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

// Charts
import { ChartsModule } from 'ng2-charts';

// Modulos personalizados
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
