import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  //reactive forms
  public productForm!:FormGroup;

  constructor(private fb: FormBuilder, private productService:ProductService){

  }
  // les donnees saisient dans le formulaire seront stockees dans l'objet productForm
  ngOnInit(){
    this.productForm= this.fb.group({
      name: this.fb.control('',[Validators.required]),
      price: this.fb.control(0),
      checked: this.fb.control(false),

    });

  }
//fonction pour recuperer le formulaire
  saveProduct(){
    let product:Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next : data => {
        Swal.fire({
          icon: 'success',
          title: 'Validation réussie!',
          text: JSON.stringify(data),
        });

      }, error : err=>{
        console.log(err);
      }
    });



  }

}
