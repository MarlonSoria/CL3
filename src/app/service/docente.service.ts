import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Docente } from '../model/docente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  docenteActualizar = new Subject<Docente[]>();

  private listaDocente: string = 'http://localhost:9001/docente/docentes'
  private eliminaDocente: string = 'http://localhost:9001/docente/eliminar'
  private editaDocente: string = 'http://localhost:9001/docente/actualizar'
  private registraDocente: string = 'http://localhost:9001/docente/guardar'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Docente[]>(this.listaDocente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.eliminaDocente}/${id}`);
  }

  editar(docente: Docente) {
    return this.http.put(this.editaDocente, docente);
  }

  registrar(docente: Docente) {
    return this.http.post(this.registraDocente, docente);
  }
}
