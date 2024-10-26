import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Función para agregar un nuevo usuario a la colección 'USUARIO'
  registrarUsuario(id: string, datos: any) {
    return this.firestore.collection('USUARIO').doc(id).set(datos);
  }

  // Función para validar de que el correo y el rut no se repitan.
  verificarCorreoYRut(correo: string, rut: string) {
    const correoQuery = this.firestore.collection('USUARIO', ref =>
      ref.where('mailuser', '==', correo)
    ).get();

    const rutQuery = this.firestore.collection('USUARIO', ref =>
      ref.where('rut', '==', rut)
    ).get();

    return combineLatest([correoQuery, rutQuery]).pipe(
      map(([correoSnapshot, rutSnapshot]) =>
        correoSnapshot.size > 0 || rutSnapshot.size > 0 // Verificamos si alguno ya existe
      )
    );
  }

  // Método para inicio de sesión
  validarCredenciales(correo: string, password: string) {
    return this.firestore.collection('USUARIO', ref =>
      ref.where('mailuser', '==', correo).where('password', '==', password)
    ).get().pipe(
      map(snapshot => snapshot.size > 0) // Retorna true si encuentra coincidencia
    );
  }
}
