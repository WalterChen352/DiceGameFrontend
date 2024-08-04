import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { DiceContainerComponent } from './diceContainer/diceContainer.component';
import { SocketService } from './socket.service';
import { DieComponent } from './die/die.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OppDiceContainerComponent } from './oppDiceContainer/diceContainer.component';
import { DiceDraftComponent } from './dice-draft/dice-draft.component';
import { DraftManagerComponent } from './draft-manager/draft-manager.component';

const config: SocketIoConfig = { url: 'http://127.0.0.1:5000', options: {} };

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    GameComponent,
    DiceContainerComponent,
    DieComponent,
    MsgBoxComponent,
    CarouselComponent,
    OppDiceContainerComponent,
    DiceDraftComponent,
    DraftManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
