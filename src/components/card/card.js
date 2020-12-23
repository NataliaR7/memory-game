export default function card(set = 'cardSet1', picture = '1.png', number, gradient) {
    let content;
    if (set === 'cardSet3') {
        content = `<img class="back card${number}" style="${gradient};"/>`
    } else {
        content = `<img class="back card${number}" src="./img/${set}/${picture}"/>`
    }
    return `
    <div class = 'card-wrapper flip-right'>
    <div class = 'card'>
        ${content}
        <div class='front'><img class="logo" alt="logo" src="./img/${set}/logo.png"/></div>
    </div>
    </div>
    `;
}