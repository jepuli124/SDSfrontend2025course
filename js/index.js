
let gameCharacter = {
    class: "none",
    listOfItems: [],
    health: 0,
    gameState: 0
}


let enemy = {
    health: 0,
    damage: 0,
    damageLikelyhood: 0,
    stun: 0
}

document.addEventListener('DOMContentLoaded', () => {

    //open/closes menu
    const menuButton = document.getElementById("menuButton")
    menuButton.addEventListener('click', () => {
        const menu = document.getElementById("menu")

        menu.classList.toggle("off")

    });

    //closes menu
    const closeMenu = document.getElementById("closeMenu")
    closeMenu.addEventListener('click', () => {
        const menu = document.getElementById("menu")

        menu.classList.toggle("off")

    });

    // Menu can now move screen, very epic
    const menuItems = document.querySelectorAll(".menuItem");
    for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', () => {
            // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
            document.body.scrollTop = 250 * index; // For Safari
            document.documentElement.scrollTop =  250 * index; // For Chrome, Firefox, IE and Opera
    
        });

    }

    //Game logic
    const gameInput = document.getElementById("input")
    
    gameInput.addEventListener("submit", (e) => {
        e.preventDefault();
        clearOutput()
        const command = document.getElementById("inputText")
        additionalAction = gameStateAction() 
        if (additionalAction){
            
            if(command) {
                additionalAction(command.value.trim())
            }
        }
        command.value = ""
        showInventory()
    });

  });


const performCommand = (command) => {
    const prevInput = document.getElementById("prevInput")
    prevInput.innerText = "Previous command: " + command;
    output("Command: " + command + " was executed");
} 

const clearOutput = () => {
    const outputText = document.getElementById("output")
    outputText.innerText = ""
}

const output = (text) => {
    const outputText = document.getElementById("output")
    outputText.innerText = outputText.innerText + "\n" + text;
}

const createBarbarian = () => {
    gameCharacter.class = "barbarian"
    gameCharacter.listOfItems = ["axe", "health potion", "health potion"]
    gameCharacter.health = 20
}

const createAlchemist = () => {
    gameCharacter.class = "alchemist"
    gameCharacter.listOfItems = ["acid potion", "ice potion", "holy potion", "poison potion", "health potion", "health potion"]
    gameCharacter.health = 10
}

const createWizard = () => {
    gameCharacter.class = "wizard"
    gameCharacter.listOfItems = ["fire spell", "ice spell", "health spell", "rng spell"]
    gameCharacter.health = 5
}

const chooseAcharacter = (character) => {
    if(character == "1" || character == "barbarian") {
        createBarbarian()
    } else if (character == "2" || character == "alchemist") {
        createAlchemist()
    } else if (character == "3" || character == "wizard") {
        createWizard()
    } else {
        output("choose a class (number or character name)")
        return 
    }
    gameCharacter.gameState = 2;
    output("You chose: " + gameCharacter.class)
    output("Now entering a dungeon (press command to proceed)")
}



const gameSpawnEnemy = (command) => {
    let rando = Math.random()

    if(rando < 0.5) {
        output("The enemy is a knight")
        enemy.health = 10
        enemy.damage = 2
        enemy.damageLikelyhood = 1.0
        enemy.stun = 0
    } else if (rando < 0.9) {
        output("The enemy is a undead priest")
        enemy.health = 6
        enemy.damage = 5
        enemy.damageLikelyhood = 0.8
        enemy.stun = 0
    } else {
        output("The enemy is a dragon")
        enemy.health = 40
        enemy.damage = 3
        enemy.damageLikelyhood = 0.6
        enemy.stun = 0
    }

    if(gameCharacter.class == "wizard"){
        enemy.stun = 1
    }
    
}

const gameFight = (command) => {
    let damageDealt = "You did nothing (probably typo in command)";
    let damageReceived = "Enemy did nothing";
    if (command == "attack") {
        if(gameCharacter.listOfItems.includes("axe")){
            enemy.health -= 4
            damageDealt = "You hit them with an axe dealing 4 damage"
        } else {
            enemy.health -= 1
            damageDealt = "You hit them with a fist dealing 1 damage"
        }
    } else if (gameCharacter.listOfItems.includes(command)){
        if(command == "axe"){
            enemy.health -= 4
            damageDealt = "You hit them with an axe dealing 4 damage"
        }
        if(command == "health potion"){
            gameCharacter.health += 10
            damageDealt = "You drank a health potion, +10 hp"
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "acid potion"){
            enemy.health -= 8
            damageDealt = "You threw an acid potion at them dealing 8 damage"
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "ice potion"){
            enemy.health -= 2
            enemy.stun += 1
            damageDealt = "You threw an ice potion at them dealing 2 damage and freezing them"
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "holy potion"){
            gameCharacter.health += 15
            damageDealt = "You prayed upon an holy potion healing 15 hp."
            if(enemy.damageLikelyhood == 0.8){
                damageDealt += " and dealth 10 damage to the undead"
            }
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "poison potion"){
            if(enemy.damageLikelyhood !== 0.8){
                enemy.health -= 9
                damageDealt = "You threw an poison potion at them dealing 9 damage"
            } else {
                enemy.health -= 3
                damageDealt = "You threw an poison potion at them dealing 3 damage"
            }
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "fire spell"){
            if(enemy.damageLikelyhood !== 0.8){
                enemy.health -= 7
                damageDealt = "You cast a fire spell at them dealing 7 damage"
            } else {
                enemy.health -= 4
                damageDealt = "You cast a fire spell at them dealing 4 damage"
            }
        }
        if(command == "ice spell"){
            enemy.health -= 3
            enemy.stun += 1
            damageDealt = "You cast ice spell at them dealing 3 damage and freezing them"
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "health spell"){
            gameCharacter.health += 8
            damageDealt = "You cast a health spell, +8 hp"
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
        if(command == "rng spell"){
            rng = Math.random()
            if(rng > 0.6 && rng <= 0.8){
                gameCharacter.health += 30
                damageDealt = "You cast a strange health spell, +30 hp"
            } else if (rng > 0.8) {
                enemy.health -= 50
                damageDealt = "You cast a strange light spell at them dealing 50 damage"
            }
            gameCharacter.listOfItems.splice(gameCharacter.listOfItems.indexOf(command), 1)
        }
    } 

    if(enemy.health <= 0){
        gameCharacter.gameState += 1
    } else if(Math.random() < enemy.damageLikelyhood){
        if(enemy.stun <= 0){
            gameCharacter.health -= enemy.damage
            damageReceived = "Enemy dealt " + String(enemy.damage) + " damage to you."
        } else {
            damageReceived = "Enemy was stun/frozen/too slow this turn."
            enemy.stun -= 1
        }
        
    }
    output(damageDealt + ". " + damageReceived)
    if(enemy.health <= 0){
        output("enemy died, press command to receive loot")
    }
    if(gameCharacter.health <= 0){
        output("you died :(, press command to play again")
        gameCharacter.gameState = 0
    }
}

const gameLoot = (command) => {
    if(gameCharacter.class == "barbarian"){
        gameCharacter.listOfItems.push("health potion")
        output("you found health potion!")
    } else if (gameCharacter.class == "alchemist") {
        rng = Math.random()
        if(rng < 0.2){
            output("you found nothing")
        } else if (rng < 0.4) {
            gameCharacter.listOfItems.push("poison potion")
            gameCharacter.listOfItems.push("poison potion")
            output("you found 2 poison potions")
        } else if (rng < 0.6) {
            gameCharacter.listOfItems.push("ice potion")
            gameCharacter.listOfItems.push("poison potion")
            gameCharacter.listOfItems.push("health potion")
            output("you found an ice potion, a poison potion, and a health potion")
        } else if (rng < 0.8) {
            gameCharacter.listOfItems.push("health potion")
            gameCharacter.listOfItems.push("health potion")
            gameCharacter.listOfItems.push("acid potion")
            output("you found 2 health potions and an acid potion")
        } else {
            gameCharacter.listOfItems.push("holy potion")
            gameCharacter.listOfItems.push("ice potion")
            gameCharacter.listOfItems.push("acid potion")
            gameCharacter.listOfItems.push("acid potion")
            output("you found a holy potion, an ice potion, and 2 acid potions")
        }
    } else if (gameCharacter.class == "wizard") {
        rng = Math.random()
        if(rng < 0.2){
            output("you found nothing")
        } else if (rng < 0.4) {
            gameCharacter.listOfItems.push("ice spell")
            output("you found an ice spell")
        } else if (rng < 0.6) {
            gameCharacter.listOfItems.push("health spell")
            output("you found a health spell")
        } else if (rng < 0.8) {
            gameCharacter.listOfItems.push("health potion")
            gameCharacter.listOfItems.push("health potion")
            gameCharacter.listOfItems.push("ice spell")
            output("you found 2 health potions and an ice spell")
        } else {
            gameCharacter.listOfItems.push("rng spell")
            output("you found a rng spell")
        }
    }

    output("Moving deeper into dungeon (press command to continue)")
    gameCharacter.gameState = 2
}

const showInventory = () => {
    const inventory = document.getElementById("inventory")

    inventory.innerHTML = "";

    for (let index = 0; index < gameCharacter.listOfItems.length; index++) {
        const element = gameCharacter.listOfItems[index];
        const card = document.createElement("div")
        const title = document.createElement("h3")
        const description = document.createElement("p")

        card.classList.add("inventory-slot")
        title.classList.add("shadow-text")

        if(element == "axe"){
            title.innerText = "axe"
            description.innerText = "A handy weapon"
            card.classList.add("common")
        }
        if(element == "health potion"){
            title.innerText = "health potion"
            description.innerText = "A easy way to heal"
            card.classList.add("rare")
        }
        if(element == "acid potion"){
            title.innerText = "acid potion"
            description.innerText = "Deals serious damage"
            card.classList.add("uncommon")
        }
        if(element == "ice potion"){
            title.innerText = "ice potion"
            description.innerText = "Enemy can't make a move this turn and light damage"
            card.classList.add("uncommon")
        }
        if(element == "holy potion"){
            title.innerText = "holy potion"
            description.innerText = "Heals a lot, extra damage to undead"
            card.classList.add("rare")
        }
        if(element == "poison potion"){
            title.innerText = "poison potion"
            description.innerText = "A small amount of damage, extra damage to living"
            card.classList.add("common")
        }
        if(element == "fire spell"){
            title.innerText = "fire spell"
            description.innerText = "A medium amount of damage, extra damage to living"
            card.classList.add("common")
        }
        if(element == "ice spell"){
            title.innerText = "ice spell"
            description.innerText = "A small amount of damage, enemy can't make a move this turn, single use"
            card.classList.add("rare")
        }
        if(element == "health spell"){
            title.innerText = "health spell"
            description.innerText = "A large amount of healing, single use"
            card.classList.add("rare")
        }
        if(element == "rng spell"){
            title.innerText = "rng spell"
            description.innerText = "Something crazy might happen..., sadly it is single use"
            card.classList.add("rare")
        }

        card.appendChild(title)
        card.appendChild(description)
        inventory.appendChild(card)
    }
}

const gameStateAction = () =>{
    
    if(gameCharacter.gameState == 0) {
        output("Choose a character class: 1: barbarian, 2: alchemist, 3: wizard")
        gameCharacter.gameState += 1
        return null
    } else if (gameCharacter.gameState == 1) {
        return chooseAcharacter
    } else if (gameCharacter.gameState == 2) {
        output("Oh noes: an enemy has been spawn, fight! (use attack or items)")
        gameCharacter.gameState += 1
        return gameSpawnEnemy
    } else if (gameCharacter.gameState == 3) {
        return gameFight
    } else if (gameCharacter.gameState == 4) {
        return gameLoot
    }
}