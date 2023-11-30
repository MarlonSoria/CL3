import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private listacategoria: string = 'http://localhost:9001/categoria/categorias';

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.listacategoria);
  }

  editar(categoria: Categoria): Observable<any> {
    const url = `http://localhost:9001/categoria/actualizar/${categoria.id_categoria}`; // Ajusta la URL según la estructura de tu API
    return this.http.put(url, categoria);
  }
}
