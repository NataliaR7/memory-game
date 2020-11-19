import record from './record'

const recordCount = 20;
export default function leaderboard() {
    let records = [];
    for(let i = 1; i < 20; i++) {
        records.push(record(i, `User ${i}`, 400 - i));
    }
    records[0] = wrapRecords(records[0], 'firstPlace');
    records[1] = wrapRecords(records[1], 'secondPlace');
    records[2] = wrapRecords(records[2], 'thirdPlace');
    return `
    <div class="head">Leaderboard</div>
    <div class="body">${records.join('')}</div>`;
}

function wrapRecords(record, id) {
    return `<div id="${id}">${record}</div>`
}
