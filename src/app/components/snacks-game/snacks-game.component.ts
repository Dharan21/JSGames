import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-snacks-game',
    templateUrl: 'snacks-game.component.html',
    styleUrls: ['snacks-game.component.css']
})
export class SnacksGameComponent implements OnInit, OnDestroy {
    snakeArr: { x: number, y: number }[] = [];
    direction: { x: number, y: number } = { x: 1, y: 0 };
    food: { x: number, y: number } = { x: 15, y: 17 };
    speed = 7;
    prevDirectionString = '';
    interval!: any;

    constructor() {

    }

    ngOnInit() {
        this.startNewGame();
    }

    startNewGame() {
        this.snakeArr = [
            {
                x: 8,
                y: 10
            }
        ];
        this.direction = { x: 1, y: 0 };
        this.food = { x: 15, y: 17 };
        this.prevDirectionString = '';
        this.generateFood();
        this.interval = setInterval(this.move.bind(this), (1 / this.speed) * 1000);
    }

    move() {
        if (!this.snakeArr || this.snakeArr.length <= 0) return;

        if (this.isColision()) {
            clearInterval(this.interval);
            alert('GAME OVER!!!');
            this.startNewGame();
        }

        // move snack
        for (let i = this.snakeArr.length - 2; i >= 0; i--) {
            this.snakeArr[i + 1] = { ...this.snakeArr[i] };
        }
        this.snakeArr[0].x += this.direction.x;
        this.snakeArr[0].y += this.direction.y;

        let snakeHead = this.snakeArr[0];
        if (snakeHead.x == this.food.x && snakeHead.y == this.food.y) {
            this.snakeArr.unshift({
                x: snakeHead.x + this.direction.x,
                y: snakeHead.y + this.direction.y
            });
            this.generateFood();
        }
    }

    isColision(): boolean {
        let snakeHead = this.snakeArr[0];
        if (snakeHead.x <= 0 || snakeHead.x > 30 || snakeHead.y <= 0 || snakeHead.y > 30) return true;

        return this.snakeArr.some((ele, index) =>
            index > 0 && ele.x == snakeHead.x && ele.y == snakeHead.y
        );
    }

    generateFood() {
        const min = 1;
        const max = 30;
        let newX = Math.floor(Math.random() * (max - min)) + min;
        let newY = Math.floor(Math.random() * (max - min)) + min;

        if (this.snakeArr.some(ele => ele.x == newX && ele.y == newY)) {
            this.generateFood();
        } else {
            this.food = {
                x: newX, y: newY
            }
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.prevDirectionString == 'ArrowDown') return;
                this.direction = {
                    x: 0, y: -1
                }
                this.prevDirectionString = 'ArrowUp';
                break;
            case 'ArrowDown':
                if (this.prevDirectionString == 'ArrowUp') return;
                this.direction = {
                    x: 0, y: 1
                }
                this.prevDirectionString = 'ArrowDown';
                break;
            case 'ArrowLeft':
                if (this.prevDirectionString == 'ArrowRight') return;
                this.direction = {
                    x: -1, y: 0
                }
                this.prevDirectionString = 'ArrowLeft';
                break;
            case 'ArrowRight':
                if (this.prevDirectionString == 'ArrowLeft') return;
                this.direction = {
                    x: 1, y: 0
                }
                this.prevDirectionString = 'ArrowRight';
                break;
        }
    }

    ngOnDestroy() {
        if (this.interval)
            clearInterval(this.interval);
    }
}