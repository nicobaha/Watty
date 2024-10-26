import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  // Función para inicio de sesión
  verificarUsuario(correo: string, password: string): Observable<boolean> {
    return this.firestore.collection('USUARIO', ref =>
      ref.where('mailuser', '==', correo).where('password', '==', password)
    ).get().pipe(
      map(snapshot => {
        const encontrado = !snapshot.empty; // Verifica si el usuario fue encontrado
        console.log('Usuario encontrado:', encontrado);
        return encontrado;
      }),
      catchError(error => {
        console.error('Error al verificar usuario:', error);
        return of(false); // Devuelve false como observable en caso de error
      })
    );
  }

  //Función para obtener datos del usuario.
  obtenerUsuarioPorCorreo(correo: string): Observable<any | null> {
    return this.firestore.collection('USUARIO', ref =>
      ref.where('mailuser', '==', correo)
    ).get().pipe(
      map(snapshot => {
        if (snapshot.empty) {
          console.warn('No se encontró un usuario con ese correo.');
          return null;
        }
        const usuario = snapshot.docs[0].data(); // Obtener los datos del primer documento encontrado
        console.log('Usuario encontrado:', usuario);
        return usuario;
      }),
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return of(null); // Retornar null en caso de error
      })
    );
  }
}
