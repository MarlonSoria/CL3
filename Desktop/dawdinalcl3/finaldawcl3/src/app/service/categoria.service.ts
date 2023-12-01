import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private listaCategoria: string = 'http://localhost:9001/categoria/categorias'

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Categoria[]>(this.listaCategoria);
   }

}
