import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
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
  }

}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
