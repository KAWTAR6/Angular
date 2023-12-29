//model
import { Component } from '@angular/core';
//decorateur 
@Component({
  //nom de la balise associee au composant
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actions : Array<any> =[
    {title : "Home", "route": "/home", icon : "house"},
    {title : "Products", "route": "/products", icon : "search"},
    {title : "New Product", "route": "/new-product", icon : "safe"},

  ];
  
  //variable qui precise l'action actuelle
  currentAction : any;

  setCurrentAction( action : any) {
    this.currentAction = action;
  }
}
