const apiLink = "https://pokeapi.co/api/v2/pokemon/";
const githubSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const speciesAPI = "https://pokeapi.co/api/v2/pokemon-species/"

const userInput = document.getElementById("search-input");
const button = document.getElementById("search-button");
const creatureImage = document.getElementById("pokemon-image");
const creatureRarity = document.querySelector(".rarity");
const creatureQuote = document.querySelector(".quote-container");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById('height');
const creatureTypes = document.getElementById("types");
const skillsContainer = document.getElementById("skills-container");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const total = document.getElementById("total")


const displaySprite = (id) => {
    creatureImage.setAttribute("src", githubSprite + id + ".png");
}

const displayCreatureInformation = (data) => {
    const {id, name, weight, height, special, stats} = data;
    const hpStat = stats[0].base_stat;
    const attackStat = stats[1].base_stat;
    const defenseStat = stats[2].base_stat;
    const specialAttackStat = stats[3].base_stat;
    const specialDefenseStat = stats[4].base_stat;
    const speedStat = stats[5].base_stat;
    const totalStat = hpStat + attackStat + defenseStat + specialAttackStat + specialDefenseStat + speedStat;

    /// From here to belove is valid
    displaySprite(id);
    addRarity(id, totalStat);
    addQuote(id);
    creatureName.textContent = name.toUpperCase();
    creatureName.classList = [data.types[0].type.name];
    creatureId.textContent = "# " + id;   
    
    creatureWeight.textContent = weight;
    creatureHeight.textContent = height;
    hp.textContent = hpStat;
    attack.textContent = attackStat;
    defense.textContent = defenseStat;
    specialAttack.textContent = specialAttackStat;
    specialDefense.textContent = specialDefenseStat;
    speed.textContent = speedStat;
    total.textContent = totalStat;
};

const addType = (data) => {
    creatureTypes.innerHTML = "";
    const {types} = data;
    creatureTypes.innerHTML += types.map(({type}) => {
        return `<div class = "type ${type.name}">${type.name.toUpperCase()}</div>`
    }).join("");
}

const addSkill = (data) => {
    skillsContainer.innerHTML = "";
    const {abilities} = data;
    abilities.forEach((ability) => {
        skillsContainer.innerHTML += `
            <div class = "skill">
                <span class = "skill-name">- ${ability.ability.name}</span><span class = "skill-status ${ability.is_hidden ? "hidden-skill" : "normal-skill"}">${ability.is_hidden ? "hidden skill" : "normal"}</span>
            </div>
        `;
    });
}

const addRarity = async (id, totalStat) => {
    creatureRarity.innerHTML = "";
    const res = await fetch(speciesAPI + id + "/");
    const data = await res.json();
    if (data.is_mythical) {
        creatureRarity.innerHTML += `<span class = "mythical">MYTHIC</span>`;
    } else if (data.is_legendary) {
        creatureRarity.innerHTML += `<span class = "lengendary">LEGENDARY</span>`
    } else if (totalStat >= 500) {
        creatureRarity.innerHTML += `<span class = "epic">EPIC</span>`
    } else if (totalStat >= 400) {
        creatureRarity.innerHTML += `<span class = "rare">RARE</span>`
    } else if (totalStat >= 300) {
        creatureRarity.innerHTML += `<span class = "uncommon">UNCOMMON</span>`
    } else {
        creatureRarity.innerHTML += `<span class = "common">COMMON</span>`
    };
}

const addQuote = async (id) => {
    const res = await fetch(speciesAPI + id + "/");
    const data = await res.json();
    const {flavor_text_entries} = data;
    const filteredTextEntries = flavor_text_entries.filter(({language:{name}}) => name === "en");
    const finalTextEntries = filteredTextEntries.map((entry) => entry.flavor_text.replace(/(?:\n|\f)/g, " "));
    const choosenText = finalTextEntries[Math.floor(Math.random() * finalTextEntries.length)];
    creatureQuote.textContent = choosenText;
    creatureQuote.style.display = "block";
}

const reset = () => {
    userInput.value = "";
    creatureName.textContent = "";
    creatureImage.removeAttribute("src");
    creatureId.textContent = "";
    creatureWeight.textContent = "";
    creatureHeight.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    total.textContent = "";
    creatureRarity.innerHTML = "";
    creatureQuote.textContent = "";
    creatureQuote.style.display = "none";
    creatureTypes.innerHTML = "";
    skillsContainer.innerHTML = "";
}

const cleanUserValue = (value) => {
    if (isNaN(value)) {
        return value[0].toUpperCase() + value.slice(1,).toLowerCase();
    } else {
        return value;
    }
}

const fetchData = async () => {
    try {
        const userValue = cleanUserValue(userInput.value);
        userInput.value = "";
        const res = await fetch(apiLink+`${userValue}/`);
        const data = await res.json();
        displayCreatureInformation(data);
        addType(data);
        addSkill(data);
    } catch (error) {
        reset();
        console.error(error);
        alert("Creature Not Found");
    }
};

button.addEventListener("click", fetchData);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
})

