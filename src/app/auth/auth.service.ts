import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { User } from './user.model';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui-actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if (fbUser) {
        this.afDB.doc(`${ fbUser.uid}/usuario`).valueChanges()
            .subscribe( usuarioObj => {
              console.log(usuarioObj);
            });
      }
    });
  }

  createUser( nombre: string, email: string, password: string) {
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then( resp => {
          const user: User = {
            uid: resp.user.uid,
            name: nombre,
            email: resp.user.email
          };
          this.afDB.doc(`${ user.uid }/usuario`)
              .set( user )
              .then( ( ) => {
                this.router.navigate(['/']);
                this.store.dispatch( new DeactivateLoadingAction() );
              });
        })
        .catch( error => {
          this.store.dispatch( new DeactivateLoadingAction() );
          Swal('Error en el registrandote', error.message, 'error');
        });
  }

  login( email: string, password: string) {
    this.store.dispatch( new ActivateLoadingAction() );
    this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(resp => {
          this.router.navigate(['/']);
          this.store.dispatch( new DeactivateLoadingAction() );
        })
        .catch( error => {
          this.store.dispatch( new DeactivateLoadingAction() );
          Swal('Error en el login', error.message, 'error');
        });

  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState
                .pipe(
                  map( fbUser => {
                    if ( fbUser == null ) {
                      this.router.navigate(['/login']);
                    }
                    return fbUser != null;
                  })
                );
  }
}
