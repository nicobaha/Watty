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
        correoSnapshot.size > 0 || rutSnapshot.size > 0 // Verifica si alguno ya existe
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
        const usuario = snapshot.docs[0].data(); // Obtiene los datos del primer documento encontrado
        console.log('Usuario encontrado:', usuario);
        return usuario;
      }),
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return of(null); // Retornar null en caso de error
      })
    );
  }

  // Guardar un ambiente en la subcolección del usuario usando su RUT
  // Guardar un ambiente en la subcolección del usuario usando su RUT
  agregarAmbienteParaUsuario(rutUsuario: string, ambiente: any): Promise<void> {
    const usuarioRef = this.firestore.collection('USUARIO').doc(rutUsuario);
    
    // Añadir un nuevo documento con un ID automático dentro de la subcolección AMBIENTE
    return usuarioRef.collection('AMBIENTE').add(ambiente)
      .then(() => console.log('Ambiente agregado correctamente.'))
      .catch(error => {
        console.error('Error al agregar el ambiente:', error);
        throw error;
      });
  }
  
  
  // Obtener los tipos de ambiente desde Firestore (AMBIENTE.PAGE)
  obtenerTiposDeAmbiente(): Observable<any[]> {
    return this.firestore.collection('TIPO_AMBIENTE').get().pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }))),
      catchError(error => {
        console.error('Error al obtener los tipos de ambiente:', error);
        return [];
      })
    );
  }

  //Para la ventana AMBIENTES, mostrará lo que hay de manera dinámica
  obtenerAmbientesUsuario(rutUsuario: string): Observable<any[]> {
    return this.firestore
      .collection('USUARIO')
      .doc(rutUsuario)
      .collection('AMBIENTE')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }; // Devuelve los datos y el ID del documento
        })),
        catchError(error => {
          console.error('Error al obtener los ambientes:', error);
          return of([]);
        })
      );
  }
  
  // Método para agregar un nuevo artefacto
  agregarArtefacto(artefacto: any): Promise<void> {
    return this.firestore.collection('CALCULADORA').add(artefacto)
      .then(() => console.log('Artefacto agregado correctamente.'))
      .catch(error => {
        console.error('Error al agregar el artefacto:', error);
        throw error;
      });
  }

  // Método para editar un artefacto existente
  editarArtefacto(id: string, data: any): Promise<void> {
    return this.firestore.collection('CALCULADORA').doc(id).update(data)
      .then(() => console.log('Artefacto editado correctamente.'))
      .catch(error => {
        console.error('Error al editar el artefacto:', error);
        throw error;
      });
  }

  // Método para obtener todos los artefactos
  obtenerArtefactos(): Observable<any[]> {
    return this.firestore.collection('CALCULADORA').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data }; // ID con los datos del documento
      })),
      catchError(error => {
        console.error('Error al obtener los artefactos:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }
}
