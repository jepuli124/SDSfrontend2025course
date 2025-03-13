
let gameCharacter = {
    class: "none",
    listOfItems: [],
    health: 0,
    gameState: 0
}


let enemy = {
    health: 0,
    damage: 0,
    damageLikelyhood: 0
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

const output = (text) => {
    const outputText = document.getElementById("output")

    let state = 0

    //finds first line break, this make that there is a single line of history
    for (let index = 0; index < outputText.innerText.length; index++) {
        if("\n" == outputText.innerText[index]) {
            state = index + 1
            break
        }
    }

    const previousText = outputText.innerText.slice(state, outputText.innerText.length)
    outputText.innerText =  previousText + "\n" + text;
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
    } else if (rando < 0.9) {
        output("The enemy is a undead priest")
        enemy.health = 6
        enemy.damage = 5
        enemy.damageLikelyhood = 0.8
    } else {
        output("The enemy is a dragon")
        enemy.health = 40
        enemy.damage = 3
        enemy.damageLikelyhood = 0.6
    }
    
}

const gameFight = (command) => {

}

const gameLoot = (command) => {

}

const showInventory = () => {
    const inventory = document.getElementById("inventory")

    inventory.innerHTML = "";

    for (let index = 0; index < gameCharacter.listOfItems.length; index++) {
        const element = gameCharacter.listOfItems[index];
        console.log(element)
        const card = document.createElement("div")
        const title = document.createElement("h3")
        const description = document.createElement("p")

        card.classList.add("inventory-slot")
        title.classList.add("shadow-text")

        if(element == "axe"){
            title.innerText = "axe"
            description.innerText = "A handy weapon"
        }
        if(element == "health potion"){
            title.innerText = "health potion"
            description.innerText = "A easy way to heal"
        }
        if(element == "acid potion"){
            title.innerText = "acid potion"
            description.innerText = "Deals serious damage"
        }
        if(element == "ice potion"){
            title.innerText = "ice potion"
            description.innerText = "Enemy can't make a move this turn and light damage"
        }
        if(element == "holy potion"){
            title.innerText = "holy potion"
            description.innerText = "Heals a lot and medium damage, extra damage to undead"
        }
        if(element == "poison potion"){
            title.innerText = "poison potion"
            description.innerText = "A small amount of damage, extra damage to living"
        }
        if(element == "fire spell"){
            title.innerText = "fire spell"
            description.innerText = "A medium amount of damage, extra damage to living"
        }
        if(element == "ice spell"){
            title.innerText = "ice spell"
            description.innerText = "A small amount of damage, enemy can't make a move this turn, single use"
        }
        if(element == "health spell"){
            title.innerText = "health spell"
            description.innerText = "A large amount of healing, single use"
        }
        if(element == "rng spell"){
            title.innerText = "rng spell"
            description.innerText = "Something crazy might happen..., sadly it is single use"
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