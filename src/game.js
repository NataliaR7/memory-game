import card from './components/card/card';

const cardCount = 20;
let cards = [];
fillCardsCollection();


function fillCardsCollection() {
    for(let i = 1; i < cardCount / 2; i++) {
        cards.push(card(false, 'cardSet1', `${i}.png`));
        cards.push(card(false, 'cardSet1', `${i}.png`));
	}
	cards = randomSort(cards);
}

function randomSort(source) {
	let j, temp = 0;
	let result = source.slice();
	for(var i = result.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = result[j];
		result[j] = result[i];
		result[i] = temp;
	}
	return result;
}