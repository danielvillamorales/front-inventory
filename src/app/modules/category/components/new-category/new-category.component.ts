import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryform: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>) {
    this.categoryform = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  onSave() {
    let data = {
      name: this.categoryform.get('name')?.value,
      description: this.categoryform.get('description')?.value
    }
    this.categoryService.saveCategories(data)
      .subscribe(data => {
        console.log(data)
        this.dialogRef.close(1);
      }, error => {
        this.dialogRef.close(2);
      })
  }

  onCancel() { 
    this.dialogRef.close(3);
  }

}
