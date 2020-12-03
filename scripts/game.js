const gameField = document.querySelector('.game-field');

class Game {
    constructor() {
        this.cardIcons = [
            '</>',
            '{}',
            '()',
            ';',
            '<3',
            '8-)'
        ];
        this.selectedCards = [];
    };

    startGame() {
        this.createField();
    }

    checkIfPair() {
        console.log(this.selectedCards[0].innerText === this.selectedCards[1].innerText)
        return this.selectedCards[0].innerText === this.selectedCards[1].innerText
    }

    checkMove(card) {
        this.selectedCards.push(card);
        if (this.selectedCards.length >= 2) {
            if (this.checkIfPair()) {
                this.selectedCards.forEach(card => card.classList.add('game-card--passed'))
            }
            let self = this;
            setTimeout(function () {
                console.log('nun passiert dies')
                self.selectedCards.forEach(card => card.classList.remove('game-card--clicked'))
                self.selectedCards = [];
            }, 1000)
        } else {
            card.classList.add('game-card--clicked')
        }
    }

    createField() {
        let field = this.cardIcons.concat(this.cardIcons);

        // Suffle card order
        for (let i = field.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));
            let x = field[i];
            field[i] = field[random];
            field[random] = x;
        }

        // Add cards to DOM
        field.forEach((card) => {
            let x = this.createCard(card)
            gameField.appendChild(x)
        })
    }

    createCard(card) {
        let cardField = document.createElement('div');
        let cardInner = document.createElement('div');
        let cardFront = document.createElement('div');
        let cardBack = document.createElement('div');

        cardField.classList.add('game-card');
        cardInner.classList.add('game-card__inner');

        cardFront.classList.add('game-card__content');
        cardFront.classList.add('game-card__content--front');
        cardFront.innerText = card;

        cardBack.classList.add('game-card__content');
        cardBack.classList.add('game-card__content--back');

        cardField.appendChild(cardInner);
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);

        cardField.addEventListener('click', () => this.checkMove(cardField));

        return cardField;
    }
}

let game = new Game();
game.startGame();