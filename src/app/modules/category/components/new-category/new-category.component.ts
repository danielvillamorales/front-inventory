import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryform: FormGroup;
  estadoFormulario: string = "";
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.estadoFormulario = "Agregar"
    this.categoryform = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required]
      }
    );

    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario= "Actualizacion"
    }
  }

  ngOnInit(): void {
  }

  onSave() {
    let data = {
      name: this.categoryform.get('name')?.value,
      description: this.categoryform.get('description')?.value
    }
    if (this.data != null) {
      //actualizar
      this.categoryService.updateCategories(data, this.data.id)
        .subscribe(data => {
          console.log(data)
          this.dialogRef.close(1);
        }, error => {
          this.dialogRef.close(2);
        })
    } else {
      //crear
      this.categoryService.saveCategories(data)
        .subscribe(data => {
          console.log(data)
          this.dialogRef.close(1);
        }, error => {
          this.dialogRef.close(2);
        })
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryform = this.fb.group(
      {
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
      });

  }

}
