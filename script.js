let xp = 0;
let health = 100;
let money = 50;
let currentWeaponIndex = 0;
let inventory = ["stick"];
let fighting;
let monsterHealth;



let xpText = document.querySelector("#xpText");
let healthText = document.querySelector("#healthText");
let moneyText = document.querySelector("#moneyText");
let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");
let monsterNameText = document.querySelector("#monsterNameText");
let monsterHPText = document.querySelector("#monsterHPText");
let monsterLevelText = document.querySelector("#monsterLevelText");
let text = document.querySelector(".text");
let image = document.querySelector("#image");
let mobStat = document.querySelector("#mobStat");

locations = [{
    name: "68 alley",
    "button text": ['Go to bar', "Go to Cho Lon", "Face off with Quang Nam Le"],
    "button functions" : [goBar, goChoLon, goFaceOff],
    text: "This is Tan Binh district, alley 68, Bui Thi Xuan.\nWhere we house whores, pothouses, and all sort of depraved people.",
    image: "./images/main_image.jpg"
}, {
    name: "bar",
    "button text": ['"Sex On the Beach" cocktail, heal 10 HP (10$)', "Buy new weapon (30$)", "Leave bar"],
    "button functions" : [buyCocktail, buyWeapon, goTown],
    text: 'You go in the bar, which is the place you have grown up with for your whole life.\nMy bros meet me "cằm beer cụng bay nắp".\nCòn tụi mày gặp tao vào 48 tao chắp.',
    image: "./images/bar_image.jpg"
}, {
    name: "Cho Lon market",
    "button text": ["Fight Long the Dragon Kick", "Fight Hau the Scar Face", "Return to the hood"],
    "button functions" : [fightLong, fightHau, goTown],
    text: 'You arrived at the notorious Cho Lon market, where all sort of criminals in Ho Chi Minh city loiters.',
    image: "./images/cho_lon_image.webp"
}, {
    name: "start of Long fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You enter into a fight with Long the Dragon Kick. Don't sweat too much, he is just some lowlife mob.",
    image: "./images/long_image.jpg",
}, {
    name: "start of Hau fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You enter into a fight with Hau the Scarface. He is a fierce opponent, watch out for his cross slash!",
    image: "./images/hau_image.jpg",
}, {
    name: "start of Nam fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You have prepared your whole life for this moment. You are facing your nemesis, whom you have dreamt of gutting for every night. \nThis is the battle for the honor of a true thug, only one of you can get out alive. Let's get going!",
    image: "./images/nam_image.jpg",
}, {
    name: "after beat a thug",
    "button text": ["Go back to the hood", "Go back to the hood", "Go back to the hood"],
    "button functions": [goTown, easterEgg, goTown],
    text: "Congratulations! You have beat the thug.\n",
    image: "./images/winning_image.jpg",
}, {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [replay, replay, replay],
    text: "You have lost! Fame in night city comes and goes like the wind, and it is hard to leave your mark, to become a true legend like Quang Nam Le.\nBut the spirit of a true THUG will never fade away.\nWill you try again one more time?",
    image: "./images/losing_image.png",
}, {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [replay, replay, replay],
    text: "You did it! Not a lot of people can become LEGEND in the night city. Now and ever after people will remember your name as one of the legends in the underground.\n",
    image: "./images/end_game_image.jpg", 
}, {
    name: "easter egg",
    "button text": ["Pick 2", "Pick 8", "Return to the hood"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You enter into a minigame. In this game, you pick either 2 or 8, and we will randomly generate 6 numbers in the range of 1 to 10.\nIf your pick is one of the 6 numbers, you are rewarded!",
    image: "./images/easteregg_image.png", 
}]



weapons = [{
    name: "stick",
    power: 5,
}, {
    name: "knife",
    power: 15,
    image: "./images/knife_image.jpg"
}, {
    name: "gun",
    power: 30,
    image: "./images/gun_image.jpg"
}, {
    name: "cue",
    power: 60,
    image: "./images/cue_image.webp"
}]


mobs = [
    {
        name: "Long",
        power: 2,
        health: 15,
        reward: 10,
        xp_gain: 2,
    }, {
        name: "Hau",
        power: 8,
        health: 80,
        reward: 40,
        xp_gain: 15,
    }, {
        name: "Nam",
        power: 15,
        health: 300,
    }
]


button1.onclick = goBar;
button2.onclick = goChoLon;
button3.onclick = goFaceOff;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
    image.setAttribute("src", location.image);
}

//*Three main locaions -------

function goTown () {
    mobStat.style.display = "none";
    update(locations[0]);
};

function goBar() {
    update(locations[1]);
};

function goChoLon() {
    update(locations[2]);
};

//*Location 1 activities
function buyCocktail()  {
    if (money >= 10) {
        money -= 10;
        health += 10;
        moneyText.innerText = money;
        healthText.innerText = health;  
        text.innerText  = "The taste of alcohol rejuvinates your gangster spirit. You gain ten health points."
        image.setAttribute("src", "./images/cocktail_image.jpg");
    } else {
        text.innerText = "You don't have enough money to drink!";
    }
};

function buyWeapon() {
    if (money >= 30 && inventory.length < 4) {
        currentWeaponIndex++;
        inventory.push(weapons[currentWeaponIndex].name)
        money -= 30;
        moneyText.innerText = money;
        text.innerText = `You have just acquired a new ${weapons[currentWeaponIndex].name}. Your inventory now has ${inventory.join(", ")}`;
        image.setAttribute("src", weapons[currentWeaponIndex].image);
    } else if (inventory.length === 4) {
        button2.onclick = sellWeapon;
        button2.innerText = "Sell your strongest weapon for 15$."
        text.innerText = "You already have the strongest weapon, but you can sell it for money."
    }
};

function sellWeapon () {
    if (inventory.length > 1) {
        money += 15;
        moneyText.innerText = money;
        currentWeaponIndex--;
        const soldWeapon = inventory.pop();
        text.innerText = `You successfully sell your ${soldWeapon}. Your inventory now is: ${inventory.join(", ")}`;
    } else {
        text.innerText = "You cannot sell your only weapon! You annoy the owner of the bar!";
    };
}




//*Location 2 activities
function fightLong () {
    fighting = 0;
    update(locations[3]);
    displayMonsterStat(fighting);
};

function fightHau () {
    fighting = 1;
    update(locations[4]);
    displayMonsterStat(fighting);
};

function goFaceOff() {
    fighting = 2;
    update(locations[5]);
    displayMonsterStat(fighting);
};

function displayMonsterStat (fighting) {
    monsterHealth = mobs[fighting].health;
    monsterNameText.innerText = mobs[fighting].name;
    monsterHPText.innerText = monsterHealth;
    monsterLevelText.innerText = mobs[fighting].power;
    mobStat.style.display = "block";
}

function attack() {
    monsterHealth -= weapons[currentWeaponIndex].power + xp;
    health -= returnDamage(fighting);
    monsterHPText.innerText = monsterHealth;
    healthText.innerText = health;
    text.innerText = "You and your opponent attack each other!";
    if (monsterHealth <= 0) {
        defeatMonster();
    } else if (health <= 0) {
        lose();
    }
};

function returnDamage(fighting) {
    const damage = mobs[fighting].power * 5 - Math.floor(Math.random() * xp)
    return damage <= 0 ? 0 : damage;
}

function dodge() {
    const rng = Math.random();
    if (rng <= 0.2) {
        text.innerText = "You dodged the attack. The thug attacked you and tripped, living chance for you to deal a counter attack!\nYou deal triple damage back on the thug!"
        monsterHealth -= (weapons[currentWeaponIndex].power + xp) * 3;
        monsterHPText.innerText = monsterHealth;
    } else if (rng > 0.2 && rng <= 0.7) {
        text.innerText = "You dodged the attack";
    } else {
        text.innerText = "You failed to dodge the attack. You received more damage dealt on you!";
        health -= returnDamage(fighting) * 1.5;
        healthText.innerText = health;
    }

    if (monsterHealth <= 0) {
        defeatMonster();
    } else if (health <= 0) {
        lose();
    }

};


function defeatMonster() {
    if (fighting === 2) {
        winGame()
    } else {
        money += mobs[fighting].reward;
        moneyText.innerText = money;
        xp += mobs[fighting].xp_gain;
        xpText.innerText = xp;
        update(locations[6]);
        text.innerText += `You loot from his body ${mobs[fighting].reward}$`;
    }
}

function lose () {
    update(locations[7]);
}

function replay() {
    xp = 0;
    health = 100;
    money = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    moneyText.innerText = money;
    goTown()
}


function winGame() {
    update(locations[8]);
};

function easterEgg() {
    update(locations[9]);
}

function pickTwo() {
    pickChoice(2);
    button1.innerText = "Return to the hood";
    button2.innerText = "Return to the hood";
    button1.onclick = goTown;
    button2.onclick = goTown;
};

function pickEight() {
    pickChoice(8);
    button1.innerText = "Return to the hood";
    button2.innerText = "Return to the hood";
    button1.onclick = goTown;
    button2.onclick = goTown;
};

function pickChoice (choice) {
    text.innerText = `You picked number ${choice}.\nThe generated numbers are:\n`;
    const numbers = [];
    while (numbers.length < 6) {
        numbers.push(Math.floor(Math.random()*6 + 1));
    };

    for (let i = 0; i < numbers.length; i++) {
        text.innerText += numbers[i] + "\n";
    };

    if (numbers.includes(choice)) {
        money += 20;
        moneyText.innerText = money;
        text.innerText += "Your choice matches the random numbers. You receive 15$ for your effort!";
        image.setAttribute("src", "./images/winning_easter_image.png");
    } else {
        health -= 10;
        healthText.innerText = health;
        text.innerText += "Your choice does not match the random numbers. You are punished!";
        image.setAttribute("src", "./images/losing_easter_image.jpg");
    };

    if (health <= 0) {
        lose();
    }

}