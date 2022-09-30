import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /**
   * get all todas las categorias
   * @returns categorias
   */
  getCategories() {
    const endpoint = `${base_url}categories`;
    return this.http.get(endpoint);
  }

  /**
   * servicio para guardar una categoria
   * @param body 
   * @returns json con la respuesta del back
   */
  saveCategories(body: any) {
    const endpoint = `${base_url}categories`;
    return this.http.post(endpoint, body);
  }

  updateCategories(body: any, id: any) {
    const endpoint = `${base_url}categories/${id}`;
    return this.http.put(endpoint, body);
  }

  deleteCategories(id: any){
    const endpoint = `${base_url}categories/${id}`;
    return this.http.delete(endpoint);
  }

  
  getCategoryId(id: any){
    const endpoint = `${base_url}categories/${id}`;
    return this.http.get(endpoint);
  }
}
