const patterns = [getWavePattern, getZigZagPattern, getParallelPattern];
const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

export default function getRandomGradient() {
    let color1 = getRandomHexColor();
    let color2 = getRandomHexColor();
    return getRandomPatter(color1, color2);
}

function getRandomHexColor() {
    const colorLength = 6;
    let color = '#';
    for (let i = 0; i < colorLength; i++) {
        let randomIndex = Math.floor(Math.random() * hexValues.length);
        let randomHexNumber = hexValues[randomIndex];
        color += randomHexNumber;
    }
    return color;
}

function getRandomPatter(color1, color2) {
    return patterns[Math.floor(Math.random() * patterns.length)](color1, color2);
}

function getWavePattern(color) {
    return `background:
    radial-gradient(circle at 100% 50%, transparent 20%, ${color} 21%,
        ${color} 34%, transparent 35%, transparent),
    radial-gradient(circle at 0% 50%, transparent 20%, ${color} 21%, ${color} 34%, transparent 35%, transparent) 0 -50px;
  background-color: #EEEEEE;
  background-size: 75px 100px;`;
}

function getZigZagPattern(color1, color2) {
    return `background:
    linear-gradient(135deg, ${color1} 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, ${color1} 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, ${color1} 25%, transparent 25%),
    linear-gradient(45deg, ${color1} 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: ${color2};`;
}

function getParallelPattern(color1, color2) {
    return `background-color: ${color1};
    background-image: linear-gradient(90deg, transparent 50%,
        ${color2} 50%);
    background-size: 50px 50px;`;
}
