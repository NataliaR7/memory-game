let patterns = [getWavePattern, getZigZagPattern, getParallelPattern]

function getRandomPatter(color1, color2) {
    return patterns[Math.floor(Math.random() * patterns.length)](color1, color2);
}


export default function getRandomGradient() {
    const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.floor(Math.random() * hexValues.length);
            let y = hexValues[x];
            a += y;
        }
        return a;
    }

    let color1 = populate('#');
    let color2 = populate('#');
    let angle = Math.round(Math.random() * 360);

    let gradient = 'background: linear-gradient(' + angle + 'deg, ' + color1 + ' 40%, ' + color2 + '), linear-gradient(' + angle + 'deg, ' + color1 + ', ' + color2 + ')';
    return getRandomPatter(color1, color2);
}

function getWavePattern(color1, color2){
    return `background:
    radial-gradient(circle at 100% 50%, transparent 20%, ${color1} 21%,
        ${color1} 34%, transparent 35%, transparent),
    radial-gradient(circle at 0% 50%, transparent 20%, ${color1} 21%, ${color1} 34%, transparent 35%, transparent) 0 -50px;
  background-color: #EEEEEE;
  background-size: 75px 100px;`
}

function getZigZagPattern(color1, color2) {
    return `background:
    linear-gradient(135deg, ${color1} 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, ${color1} 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, ${color1} 25%, transparent 25%),
    linear-gradient(45deg, ${color1} 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: ${color2};`
}

function getParallelPattern(color1, color2) {
    return `background-color: ${color1};
    background-image: linear-gradient(90deg, transparent 50%,
        ${color2} 50%);
    background-size: 50px 50px;`
}
