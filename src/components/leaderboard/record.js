export default function record(number, userName, point) {
    return `
    <div class = 'record'>
        <div class = "number"><span>${number}</span></div>
        <div class = 'userName'>${userName}</div>
        <div class = 'point'>
            <span class='currentPoint'>${point}</span>
            <span>point<span>
        </div>
    </div>
    `;
}