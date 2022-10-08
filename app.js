/**
 * @description Represents a dino
 * @constructor
 */
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

/**
 * @description Represents a human
 * @constructor
 */
class Human {
    constructor(data) {
        this.name = data.name
        this.feet = data.feet
        this.inches = data.inches
        this.weight = data.weight
        this.diet = data.diet
    }
}

/**
 * @description Create dinos array from JSON data
 * @returns {array} Dinos array
 */
async function createDinos() {
    // const dinoData = await fetch(`./dino.json`).then(rs => rs.json())
    const dinoData = {
        "Dinos": [
            {
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh."
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": "372",
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ]
    };
    return dinoData.Dinos.map(data => new Dino(data))
}

/**
 * @description Create a Human object from form data
 * @returns {Human} Human object from form data
 */
function getHumanFromForm() {
    return new Human({
        name: document.querySelector('#name').value,
        feet: document.querySelector('#feet').value,
        inches: document.querySelector('#inches').value,
        weight: document.querySelector('#weight').value,
        diet: document.querySelector('#diet').value,
    })
}

/**
 * @description Compare dino's weight to human's weight
 * @param  {Dino} dino
 * @param  {Human} human
 * @returns {number} 1: dino > human, -1: dino < human, 0: dino = human
 */
function compareDinoWeight(dino, human) {
    return dino.weight > human.weight
        ? 1
        : dino.weight < human.weight ? -1 : 0;
}


/**
 * @description Compare dino's height to human's height
 * @param  {Dino} dino
 * @param  {Human} human
 * @returns {number} 1: dino > human, -1: dino < human, 0: dino = human
 */
function compareDinoHeight(dino, human) {
    const humanHeight = human.feet * 12 + human.inches;
    return dino.height > humanHeight
        ? 1
        : dino.height < humanHeight ? -1 : 0;
}

/**
 * @description Compare dino's diet to human's diet
 * @param  {Dino} dino
 * @param  {Human} human
 * @returns {boolean} Check if dino's diet is the same as human's diet
 */
function compareDinoDiet(dino, human) {
    return dino.diet == human.diet.toLowerCase();
}

/**
 * @description Generate a tile DOM for dino
 * @param  {Dino} dino
 * @returns {string} Tile DOM in string
 */
function genTile4Dino(dino) {
    return `
        <div class="grid-item">
            <h3>${dino.species}</h3>
            <img src="./images/${dino.species.toLowerCase()}.png"></img>
            <p>${dino.fact}</p>
        </div>
        `;
}

/**
 * @description Generate a tile DOM for human
 * @param  {Human} human
 * @returns {string} Tile DOM in string
 */
function genTile4Human(human) {
    return `
        <div class="grid-item">
            <h3>${human.name}</h3>
            <img src="./images/human.png"></img>
            <p></p>
        </div>
        `;
}

/**
 * @description Render a tile on DOM
 * @param  {string} tile
 * @returns {void}
 */
function renderTile(tile) {
    document.querySelector('#grid').innerHTML += tile;
}

/**
 * @description Remove user input form from DOM
 * @returns {void}
 */
function removeForm() {
    document.querySelector('#dino-compare').style.display = 'none';
}
/**
 * @description Random dino fact depend on human data
 * @param  {Dino} dino
 * @param  {Human} human
 * @returns {void}
 */
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

/**
 * @description Shuffle an array randomly
 * @param  {array} array
 * @returns {array} shuffled array
 */
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
