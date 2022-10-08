
// Create Dino Constructor
class Dino {
    constructor(data) {
        this.species = data.species;
        this.weight = data.weight;
        this.height = data.height;
        this.diet = data.diet;
        this.where = data.where;
        this.when = data.when;
        this.fact = data.fact;
    }
}


// Create Dino Objects
async function createDinos() {
    const dinoData = await fetch(`./dino.json`).then(rs => rs.json())
    return dinoData.Dinos.map(data => new Dino(data))
}


// Create Human Object
class Human {
    constructor(data) {
        this.name = data.name
        this.feet = data.feet
        this.inches = data.inches
        this.weight = data.weight
        this.diet = data.diet
    }
}

// Use IIFE to get human data from form
function getHumanFromForm() {
    return new Human({
        name: document.querySelector('#name').value,
        feet: document.querySelector('#feet').value,
        inches: document.querySelector('#inches').value,
        weight: document.querySelector('#weight').value,
        diet: document.querySelector('#diet').value,
    })
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDinoWeight(dino, human) {
    return dino.weight > human.weight
        ? 1
        : dino.weight < human.weight ? -1 : 0;
}


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDinoHeight(dino, human) {
    const humanHeight = human.feet * 12 + human.inches;
    return dino.height > humanHeight
        ? 1
        : dino.height < humanHeight ? -1 : 0;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDinoDiet(dino, human) {
    return dino.diet == human.diet.toLowerCase();
}

// Generate Tiles for each Dino in Array
function genTile4Dino(dino) {
    return `
        <div class="grid-item">
            <h3>${dino.species}</h3>
            <img src="./images/${dino.species.toLowerCase()}.png"></img>
            <p>${dino.fact}</p>
        </div>
        `;
}

function genTile4Human(human) {
    return `
        <div class="grid-item">
            <h3>${human.name}</h3>
            <img src="./images/human.png"></img>
            <p></p>
        </div>
        `;
}

// Add tiles to DOM
function renderTile(tile) {
    document.querySelector('#grid').innerHTML += tile;
}

// Remove form from screen
function removeForm() {
    document.querySelector('#dino-compare').style.display = 'none';
}

function randomDinoFact(dino, human) {
    if (dino.species === 'Pigeon')
        return;
    const rand = Math.floor(Math.random() * 100);
    let extraFact = '';
    if (rand < 20) {
        const compareW = compareDinoWeight(dino, human);
        extraFact = compareW == 1
            ? 'This dino is heavier than you.'
            : compareW == -1
                ? 'You are heavier than this dino.'
                : 'This dino has the same weight as you.';
    } else if (rand < 40) {
        const compareH = compareDinoHeight(dino, human);
        extraFact = compareH == 1
            ? 'This dino is taller than you.'
            : compareH == -1
                ? 'You are taller than this dino.'
                : 'This dino has the same height as you.';
    } else if (rand < 60) {
        extraFact = compareDinoDiet(dino, human)
            ? 'This dino has the same diet as you.'
            : 'This dino has the different diet from you.';
    } else if (rand < 80) {
        extraFact = `This dino lived in ${dino.where}`;
    } else {
        extraFact = `This dino lived during ${dino.when}`;
    }
    dino.fact += ' ' + extraFact;
}

function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const iShuffle = Math.floor(Math.random() * array.length);
        let tmp = array[i];
        array[i] = array[iShuffle];
        array[iShuffle] = tmp;
    }
    return array;
}

// On button click, prepare and display infographic
document.querySelector('#btn').addEventListener('click', async () => {
    const human = getHumanFromForm();
    removeForm();
    const dinoTiles = shuffle(await createDinos())
        .map(dino => {
            randomDinoFact(dino, human);
            return genTile4Dino(dino);
        })
    for (let i = 0; i < 9; i++) {
        if (i < 4)
            renderTile(dinoTiles[i]);
        else if (i === 4) {
            renderTile(genTile4Human(human));
        } else {
            renderTile(dinoTiles[i - 1]);
        }
    }
})
