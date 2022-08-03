import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
import { Games, Game} from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //prueba
  private gamesSelected: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  currentGamesSelected = this.gamesSelected.asObservable();


  constructor(private http : HttpClient) {
   }

   updateGamesSelected(games: Game[]) {
    this.gamesSelected.next(games)
    }

   getData():Observable<Games>{
    return this.http.get<Games>("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
   }

   selectDeal( game: Game, dataSelectedGame: Game[]){
    const hasListTheGame = dataSelectedGame.find( gameSelected => gameSelected.dealID === game.dealID)
    if( hasListTheGame ){
      dataSelectedGame = dataSelectedGame.filter( gameSelected => gameSelected.dealID !== game.dealID );
    }else{
      dataSelectedGame = [...dataSelectedGame, game]
    }
    this.updateGamesSelected(dataSelectedGame);
      
   }

}
