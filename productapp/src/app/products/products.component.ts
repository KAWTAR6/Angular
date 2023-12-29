import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
// l'injection des dependances (services HttpClient) se fait au niveau du constructeur
export class ProductsComponent implements OnInit {

  public products : Array<Product> =[];
  public keyword : string='';
  constructor(/*private http:HttpClient*/ private productService:ProductService ){

  }
  /* ngOnInit est la premiere methode execute au moment du chargement du composant, grace au service httpClient on effectue 
   une requete http get vers le lien, les donnees recues sont assignie a products en cas de succees, et affiche une erreur dans la console en cas d'echec*/
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts(1,3)
    //this.http.get<Array<any>>("http://localhost:8080/products")
    // pattern observable
    .subscribe({
      // next et error sont des fonctions de rappel , rappeler en cas de succees ou d'echec lors de la reception des donnees json
      next : data => {
        this.products=data 
       },

      error : err => {
        console.log(err);

      }
    })

  }


 
 
// pour gerer la mise a jour de l'etat d'un produit via une requete HTTP PATCH
  handleCheckProduct(product: Product) {

    //this.http.patch<any>(`http://localhost:8080/products/${product.id}`,{checked:!product.checked})
    this.productService.checkProduct(product)
    .subscribe({next :updatedProduct => {
      this.getProducts();
      


        }
      })
      }
      handleDelete(product : Product){
        Swal.fire({
          title: 'Valider votre suppression',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3cb043',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer!',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.productService.deleteProduct(product).subscribe({
              next:value=>{
                //this.products = this.products.filter(p=>p.id!=product.id)
                this.getProducts()
              }
            })
            console.log('Suppression confirmée');
          }
        });
          }

          searchProducts() {
            this.productService.searchProducts(this.keyword).subscribe({
              next: value => {
                this.products=value;
              }
            })
            }
        

      }
    
    
