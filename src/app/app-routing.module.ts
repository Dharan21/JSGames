import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SnacksGameComponent } from "./components/snacks-game/snacks-game.component";

const appRoutes: Routes = [
    {
        path: 'snacks',
        component: SnacksGameComponent
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