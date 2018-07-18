import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscription: Subscription;

  constructor(public autService: AuthService,
              public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
        .subscribe( ui => this.loading = ui.isLoading );
  }

  onSubmit( data: any ) {
    this.autService.createUser( data.name, data.email, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
