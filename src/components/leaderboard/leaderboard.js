export default function leaderboard(records) {
    if (records[0]) records[0] = wrapRecords(records[0], 'firstPlace');
    if (records[1]) records[1] = wrapRecords(records[1], 'secondPlace');
    if (records[2]) records[2] = wrapRecords(records[2], 'thirdPlace');
    return `
    <div class="head">ТАБЛИЦА ЛИДЕРОВ</div>
    <div class="body">${records.join('')}</div>`;
}

function wrapRecords(record, recordClass) {
    return `<div class="${recordClass}">${record}</div>`;
}
