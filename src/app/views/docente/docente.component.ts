import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/model/docente';
import { DocenteService } from 'src/app/service/docente.service';
import { DocenteModalComponent } from './docente-modal/docente-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  displayedColumns = ['id_docente','nombre','dni','fch_nacimiento','sueldo','email','sexo','categoria','editar-eliminar'];
  dataSource: MatTableDataSource<Docente>


  constructor(
    private dialog: MatDialog,
    private docenteService: DocenteService
  ) { }

  ngOnInit(): void{

    this.docenteService.docenteActualizar.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    })

    this.docenteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

  }



  openModal(docente: Docente) {
    const doc = docente ? {...docente} : new Docente();
    this.dialog.open(DocenteModalComponent,{
      width:'300px',
      data: doc
    });
    

  }


  onDelete(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      disableClose:true
    });
    dialogRef.afterClosed().subscribe(estado => {
      if (estado) {
        this.docenteService.eliminar(id).subscribe(()=>{
          this.docenteService.listar().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
    });
  }

}
