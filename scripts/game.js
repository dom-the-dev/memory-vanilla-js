const gameField = document.querySelector('.game-field');
const startButton = document.querySelector('.start-game');
const winnerTag = document.querySelector('.winner-tag');
const moves = document.querySelector('.moves');
const counter = document.querySelector('.counter');
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
        this.stopInteraction = false;
        this.selectedCards = [];
        this.counter = 0;
    };

    startGame() {
        this.createField();
    }

    endGame() {
        startButton.style.display = 'block';
        startButton.innerText = 'Restart'
        winnerTag.innerText = `Congratulations! You needed ${this.counter} moves!`;
        winnerTag.style.display = 'block';
        counter.style.display = 'none';
    }

    checkIfPair() {
        let isPair = this.selectedCards[0].innerText === this.selectedCards[1].innerText
        if (isPair) {
            this.checkIfWon(this.selectedCards[0].innerText);
        }
        return isPair;
    }

    checkIfWon(icon) {
        let index = this.cardIcons.indexOf(icon);
        if (index >= 0) {
            this.cardIcons.splice(index, 1)
        }

        if (this.cardIcons.length <= 0) {
            this.endGame()
        }
    }

    selectCard(card) {
        this.selectedCards.push(card);

        card.classList.add('game-card--clicked')

        if (this.selectedCards.length >= 2) {
            this.counter += 1;
            moves.innerText = this.counter;
            // CHECK IF USER CLICKED SAME CARD
            if (this.selectedCards[0] !== this.selectedCards[1]) {
                this.stopInteraction = true;
                // CHECK IF SELECTED CARDS ARE A PAIR
                // SET TO BE SHOWN
                if (this.checkIfPair()) {
                    // SET AS DONE
                    // REMOVE EVENTLISTENER
                    this.selectedCards.forEach(card => {
                        card.classList.add('game-card--passed')
                        card.removeEventListener('click', this.eventListener.bind(this, card))
                    })

                }

                // RESET MOVE
                setTimeout(() => {
                    let self = this;
                    self.selectedCards.forEach(card => card.classList.remove('game-card--clicked'))
                    self.selectedCards = [];
                    this.stopInteraction = false;
                }, 700)
            } else {
                // REMOVE IF USER CLICKED SAME CARD
                this.selectedCards.pop();
            }
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

        cardField.addEventListener('click', this.eventListener.bind(this, cardField));

        return cardField;
    }

    eventListener(card) {
        if (!this.stopInteraction) {
            this.selectCard(card)
        }
    }
}

startButton.addEventListener('click', function () {
    let game = new Game();
    game.startGame();
    startButton.style.display = 'none';
    winnerTag.style.display = 'none';
    counter.style.display = 'block';
})