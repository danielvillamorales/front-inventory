import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: String[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        console.log("response: ", data);
        this.processProductsResponse(data);
      },
        (error: any) => {
          console.log(error);
        })
  }

  processProductsResponse(resp: any) {
    const dataProducts: ProductElement[] = [];
    let listProducts = resp.productResponse.products;
    listProducts.forEach((elemento: ProductElement) => {
      //elemento.category = elemento.category.name;
      elemento.picture = 'data:image/jpeg;base64,' + elemento.picture;
      dataProducts.push(elemento);
    });
    this.dataSource = new MatTableDataSource<ProductElement>(dataProducts);
    this.dataSource.paginator = this.paginator;
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("producto agregado", "Exito");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al guardar productos", "Error")
      }
    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action,
      { duration: 4000 })
  }

  edit(id: number, name: string, price: number, account: number, category: any) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, account: account, category: category }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("producto editado", "Exito");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al editar productos", "Error")
      }
    });
  }

  delete(id: any) {
    console.log(id)
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        id: id, module:"product"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("producto eliminado", "Exito");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("se produjo un error al eliminar producto", "Error")
      }
    });
  }


  buscarporname(nombre: any){
    if (nombre.length == 0){
      return this.getProducts()
    } else {
      this.productService.getProductNames(nombre).subscribe((data:any) => {
        this.processProductsResponse(data);
      })
    }
  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  category: any;
  picture: any;
}