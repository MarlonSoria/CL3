import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria';
import { Docente } from 'src/app/model/docente';
import { CategoriaService } from 'src/app/service/categoria.service';
import { DocenteService } from 'src/app/service/docente.service';

@Component({
  selector: 'app-docente-modal',
  templateUrl: './docente-modal.component.html',
  styleUrls: ['./docente-modal.component.css']
})
export class DocenteModalComponent implements OnInit {

  docente:Docente;
  categoria:Categoria[];

  constructor(
    private dialogRef: MatDialogRef<DocenteModalComponent>,
    private docenteService: DocenteService,
    private categoriaService:CategoriaService,
    @Inject(MAT_DIALOG_DATA) private data: Docente) { }

  ngOnInit(): void {

    this.docente = new Docente();
    this.docente.id_docente=this.data.id_docente;
    this.docente.nombre=this.data.nombre;
    this.docente.dni = this.data.dni;
    this.docente.sueldo=this.data.sueldo;
    this.docente.email=this.data.email;
    this.docente.sexo=this.data.sexo;
    this.docente.categoria=this.data.categoria;

    this.categoriaService.listar().subscribe(data=>{
      this.categoria=data;

    })
  }

  aceptar(){
    if(this.docente !=null && this.docente.id_docente >0){
      this.docenteService.editar(this.docente).subscribe(()=>{
        return this.docenteService.listar().subscribe(data =>{
          this.docenteService.docenteActualizar.next(data);
        })
      });
    }else{
      this.docenteService.registrar(this.docente).subscribe(()=>{
        this.docenteService.listar().subscribe(data =>{
          this.docenteService.docenteActualizar.next(data);
        })
      })
    }

    this.cerrar();



  }

  cerrar(){

    this.dialogRef.close();

  }


}
