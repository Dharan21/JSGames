import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SnacksGameComponent } from "./components/snacks-game/snacks-game.component";
import { TicTacToeComponent } from "./components/tic-tac-toe/tic-tac-toe.component";

const appRoutes: Routes = [
    {
        path: 'snacks',
        component: SnacksGameComponent
    },
    {
        path: 'tic-tac-toe',
        component: TicTacToeComponent
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}