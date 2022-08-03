import { Game } from './../../interfaces/data.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements	OnInit {

  gamesSelected: Game[] = []
  isCartOpen:boolean = false;
  total:number = 0;


  constructor(private dataService : DataService) {
    
   }

  ngOnInit(): void {
    this.dataService.currentGamesSelected.subscribe(data => {
        this.total = 0;
        this.gamesSelected = data; 
        data.forEach(game => {
          this.total += (+game.savings > 0) ? (+game.salePrice) :  (+game.normalPrice) ;
      });
    }) 
  }  
  

  cartChanged(){
    this.isCartOpen = !this.isCartOpen
  }

}
