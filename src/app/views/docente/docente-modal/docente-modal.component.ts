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

  docente: Docente;
  categoria: Categoria[];

  constructor(
    private dialogRef: MatDialogRef<DocenteModalComponent>,
    private categoriaService: CategoriaService,
    private docenteService: DocenteService,
    @Inject(MAT_DIALOG_DATA) private data: Docente
  ) {}

  ngOnInit(): void {
    this.docente = new Docente();

    if (this.data) {
      this.docente.id_docente = this.data.id_docente;
      this.docente.nombre = this.data.nombre;
      this.docente.dni = this.data.dni;
      this.docente.fch_nacimiento = this.data.fch_nacimiento;
      this.docente.sueldo = this.data.sueldo;
      this.docente.email = this.data.email;
      this.docente.sexo = this.data.sexo;

      if (this.data.categoria) {
        this.docente.categoria = {
          id_categoria: this.data.categoria.id_categoria,
          nombrecate: this.data.categoria.nombrecate
        };
      }

      this.categoriaService.listar().subscribe(data => {
        this.categoria = data;
      });
    } else {
      this.docente = new Docente();
    }
  }

  aceptar() {
    if (this.docente != null && this.docente.id_docente > 0) {
      this.docenteService.editar(this.docente).subscribe(() => {
        this.actualizarListaDocentes();
      });
    } else {
      this.docenteService.registrar(this.docente).subscribe(() => {
        this.actualizarListaDocentes();
      });
    }
  
    this.cerrar();
  }

  private actualizarListaDocentes() {
    this.docenteService.listar().subscribe(data => {
      this.docenteService.docenteActualizar.next(data);
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}