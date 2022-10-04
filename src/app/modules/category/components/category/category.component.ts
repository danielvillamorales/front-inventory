import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);
      },
        (error: any) => { console.log("error: ", error); })
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    let listCategory = resp.categoryResponse.categoryDto;
    listCategory.forEach((elemento: CategoryElement) => {
      dataCategory.push(elemento);
    });
    this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    this.dataSource.paginator = this.paginator;
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("categoria agregada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al guardar categoria", "Error")
      }
    });
  }

  edit(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: {
        id: id, name: name, description: description
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("categoria Actualizada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al editar categoria", "Error")
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        id: id, module:"category"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("categoria eliminada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al eliminar categoria", "Error")
      }
    });
  }


  buscar(termino: string) {
    if (termino.length == 0) {
      return this.getCategories();
    }
    this.categoryService.getCategoryId(termino)
      .subscribe(resp => {
        this.processCategoriesResponse(resp);
      })
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action,
      { duration: 4000 })
  }


}


export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
