import { Games, Game } from './../../interfaces/data.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  games:Games = []
  gamesSelected: Game[] = []

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data =>{ this.games = data;})
    this.dataService.currentGamesSelected.subscribe( data => { this.gamesSelected = data })
  }

  inputChanged(input:string){
    if( this.games.length > 0){
      this.dataService.getData()
                      .subscribe(data =>{ 
                                  this.games = data.filter(game => game.title.toLowerCase().includes(input.toLowerCase()));
                                  this.changeIsSelected();
                                })
    }
  }

  selectDeal(game:Game){
    this.dataService.selectDeal(game, this.gamesSelected);
    this.changeIsSelected();
  }

  changeIsSelected(){
    this.games.forEach(gameData => {
      gameData.isSelected = ( this.gamesSelected.find(game => game.dealID === gameData.dealID) ) ? true : false;
    });
  }

}
