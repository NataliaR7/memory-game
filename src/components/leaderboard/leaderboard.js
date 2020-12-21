import record from './record';

const recordCount = 20;
export default function leaderboard(records) {
    // let records = [];
    // for(let i = 1; i < 20; i++) {
    //     records.push(record(i, `User ${i}`, 400 - i));
    // }
    if (records[0]) records[0] = wrapRecords(records[0], 'firstPlace');
    if (records[1]) records[1] = wrapRecords(records[1], 'secondPlace');
    if (records[2]) records[2] = wrapRecords(records[2], 'thirdPlace');
    return `
    <div class="head">Leaderboard</div>
    <div class="body">${records.join('')}</div>`;
}

function wrapRecords(record, id) {
    return `<div id="${id}">${record}</div>`;
}
