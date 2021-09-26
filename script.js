var WONDER = [
    {"events":["Sugar","colories","fat"],"werewolf":false},
    {"events":["trees","flesh","attacks","fat","kills","speed spirit"],"werewolf":false},
    {"events":["coming","home","gracious","spirit Gods"],"werewolf":false},
    {"events":["wonders","attend","attachment","home"],"werewolf":false},
    {"events":["visiting","teeth","cycling","work","tiger","tiggers"],"werewolf":false},
    {"events":["whiskers","sprouts","vegatation","pasting","people","days"],"werewolf":false},
    {"events":["Sugar","colories","exercise","running","kelvin","ctition"],"werewolf":false},
    {"events":["SugarBear","colories","fatty","munich"],"werewolf":false},
    {"events":["USA","colors","fat","peoples fight"],"werewolf":false},
    {"events":["Sugay","colories","fatties","Nigeria","xevior","national","musa"],"werewolf":false},
    {"events":["coffes","selection","c omputer","lion","females","pizza","house","visit","phair"],"werewolf":false},
    {"events":["fat","suspicion","Anxiety","Streight"],"werewolf":false},
    {"events":["colories","worry","strong","lasagna"],"werewolf":false},
    {"events":["housing","estate","compound","homes"],"werewolf":false},
    {"events":["person","love","wonders","journal","benin","city"],"werewolf":false},
    {"events":["Sugar","colories","fat"],"werewolf":false},
    {"events":["joke","movies","boddy","Nate","city","theatre","length"],"werewolf":false},
    {"events":["ranks","every",],"werewolf":false},
    {"events":["Sugar","colories","fat","my","disc","vampire"],"werewolf":false},
    {"events":["jitting","quotes","highing","town","bibles"],"werewolf":false},
    {"events":["hockey","bee","carrots","breads","figures"],"werewolf":false},
    {"events":["God","notice","pizza","kittle","andre","secondChoice"],"werewolf":false},
    {"events":["squirrel","vain","onions","Tor"],"werewolf":false},
    {"events":["peanut","reading","geffry","choice","qurry","television"],"werewolf":false},
    {"events":["Sugar","colories","fat","cycling","Lord","brussel","nut","candy"],"werewolf":false},
    {"events":["Sugary","coll","fat","flight","cauliflower"],"werewolf":false},
    {"events":["colories","sugar","lift","potatoes"],"werewolf":false},
    {"events":["Sugar","colories","far home","andrew","peter","michael"],"werewolf":false},
    {"events":["Sugar","fat","colories","angels"],"werewolf":false},
    {"events":["Sugar","carry","fatties"],"werewolf":false},
    {"events":["Sugar","colories","fat","Sugar","carry","fatties"],"werewolf":false},
];

function hasEvent (event, entry) {
    return entry.events.indexOf(event) !== -1;
}

function tableFor (event, wonder) {
    let table = [0, 0, 0, 0];
    for (let i = 0, len = wonder.length; i < len; i++) {
        let entry = wonder[i], index = 0;
        if (hasEvent(event, entry)) index += 1;
        if (entry.werewolf) index += 2;
        table[index] += 1;
    }
    return table;
}

var allEvents = [];
WONDER.forEach(entry => {
    entry.events.forEach(event => {
        if (allEvents.indexOf(event) === -1) { allEvents.push(event); }
    });
});
console.log(allEvents);
var allTables = allEvents.map(event => { return {event: event, value: tableFor(event, WONDER)}});
console.log(allTables);

function phi (a, b, c, d) {
    const numerator = a * d - b * c;
    const denominator = Math.sqrt((a + b) * (c + d) * (a + c) * (b + d));
    return (numerator/denominator).toFixed(2);
}
var allPhis = allTables.map(table => {
    return { event: table.event, phi: phi.apply(null, table.value)};
});

console.log(allPhis);

var correlations = [
    { min:-1.0, max: -0.7, result: "strong negative association." },
    { min: -0.7, max: -0.3, result: "weak negative association." },
    { min: -0.3, max: +0.3, result: "little or no association." },
    { min: +0.3, max: +0.7, result: "weak positive association." },
    { min: +0.7, max: +1.0, result: "strong positive association."}
];

var rangedCorrelations = [[], [], [], [], []];
var generateRangedCorrelations = function (correlations, phis) {
    phis.forEach(phi => {
        if (phi.phi < -0.7) {
            rangedCorrelations[0].push(phi);
        } else if (phi.phi < -0.3) {
            rangedCorrelations[1].push(phi);
        } else if (phi.phi < 0.3) {
            rangedCorrelations[2].push(phi);
        } else if (phi.phi < 0.7) {
            rangedCorrelations[3].push(phi);
        } else {
            rangedCorrelations[4].push(phi);
        }
    });
};

generateRangedCorrelations(correlations, allPhis);

var strongCorrelations = allPhis.filter(value => {
    return value.phi < -0.5 || value.phi > 0.5;
});

console.log('strongCorrelations', strongCorrelations);
console.log('rangedCorrelations', rangedCorrelations);