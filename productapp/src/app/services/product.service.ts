import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
// service : classe qui utilise le decorateur injectable
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  // envoie des requetes vers le backend (fonction non bloquante), retourne un objet de type observable, la partie UI observer fait un subscribe vers l'observable
  public getProducts(page : number=1, size: number=4): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8080/products?_page=${page}&_limit=${size}`);
  }
  public checkProduct(product:Product): Observable<Product>{
    return  this.http.patch<Product>(`http://localhost:8080/products/${product.id}`,{checked:!product.checked});
  }
  public deleteProduct(product:Product){
    return  this.http.delete<any>(`http://localhost:8080/products/${product.id}`);
  }

  saveProduct(product:Product): Observable<Product>{
    return  this.http.post<Product>(`http://localhost:8080/products`,
    product);

  }
  //recherche json server syntaxe : ? champ_like = keyword, cherche moi les produits dont le nom contient notre keyword
  public searchProducts(keyword:string): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8080/products?name_like=${keyword}`);
  }
  
}
