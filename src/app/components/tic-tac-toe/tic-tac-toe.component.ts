import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: 'tic-tac-toe.component.html',
    styleUrls: ['tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
    readonly circle = 'circle';
    readonly cross = 'cross';
    readonly winCombinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]; 
    board: string[] = [];
    turn: string = this.circle;
    message: string= '';
    isDisplayResetBtn = false;

    constructor() { }

    ngOnInit(): void {
        this.reset();
    }

    onClickSquare(index: number) {
        if (this.board[index]) return;
        this.board[index] = this.turn;

        const winner = this.isGameOver();
        if (winner) {
            if (winner == 'GameOver') {
                this.message = `GameOver!!! Start new game`;
            } else {
                this.message = `${this.turn} is winner!!`;
            }
            this.isDisplayResetBtn = true;
            return;
        }
        this.turn = this.turn === this.circle ? this.cross : this.circle;
        this.message = `Turn: ${this.turn}`;
    }

    isGameOver(): string {
        for(let i = 0; i < this.winCombinations.length; i++) {
            const combination = this.winCombinations[i];
            const isCircleWins = combination.every(cell => this.board[cell] === this.circle);
            if (isCircleWins) {
                return this.circle;
            }
            const isCrossWins = combination.every(cell => this.board[cell] === this.cross);
            if (isCrossWins) {
                return this.cross;
            }
        }

        return this.board.every(cell => !!cell) ? 'GameOver' : '';
    }


    reset() {
        this.board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ];
        this.isDisplayResetBtn = false;
        this.turn = this.circle;
        this.message = `Turn: ${this.turn}`;
    }
}