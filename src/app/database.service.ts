import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:3000'; // URL de tu servidor Node.js

  constructor(private http: HttpClient) { }

  // 1. Registrar un usuario
  registerUser(rut: string, nombre: string, correo: string, contraseña: string, celular: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    // Crear el cuerpo de la solicitud
    const body = {
      Run_User: rut,
      Nom_User: nombre,
      Correo_User: correo,
      Contra_User: contraseña,
      Celular_User: celular
    };
    return this.http.post(url, body, { headers });
  }

  // Iniciar Sesión
  loginUser(correo: string, contraseña: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const body = {
      Correo_User: correo,
      Contra_User: contraseña
    };

    return this.http.post(url, body, { headers });
  }

  //Cargar Ambientes
  CargarAmbientes(Id_User: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ambientes/${Id_User}`);
  }

  // Cargar los tipos de ambiente
  CargarTipoAmbiente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Tipoambientes`); 
  }

  //Ruta para insertar ambientes
  // Servicio de DatabaseService
  insertarAmbiente(ambiente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/InsertAmbientes`, ambiente);
  }

  // Ruta para eliminar Ambiente
  eliminarAmbiente(Id_Ambiente: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/EliminarAmbientes/${Id_Ambiente}`);
  }
}
