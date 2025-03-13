
document.addEventListener('DOMContentLoaded', () => {

    //open/closes menu
    menuButton = document.getElementById("menuButton")
    menuButton.addEventListener('click', () => {
        menu = document.getElementById("menu")

        menu.classList.toggle("off")

    });

    //closes menu
    closeMenu = document.getElementById("closeMenu")
    closeMenu.addEventListener('click', () => {
        menu = document.getElementById("menu")

        menu.classList.toggle("off")

    });

    // Menu can now move screen, very epic
    menuItems = document.querySelectorAll(".menuItem");
    for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', () => {
            // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
            document.body.scrollTop = 600 * index; // For Safari
            document.documentElement.scrollTop =  600 * index; // For Chrome, Firefox, IE and Opera
    
        });
        
    }

    //Game logic
    gameInput = document.getElementById("input")
    
    gameInput.addEventListener("submit", (e) => {
        e.preventDefault();
        command = document.getElementById("inputText")
        if(command) {
            performCommand(command.value.trim())
        }
        command.value = ""
    });

  });


const performCommand = (command) => {
    prevInput = document.getElementById("prevInput")
    prevInput.innerText = "Previous command: " + command;
    output("Command: " + command + " was executed");
} 

const output = (text) => {
    outputText = document.getElementById("output")

    state = 0

    //finds first line break, this make that there is a single line of history
    for (let index = 0; index < outputText.innerText.length; index++) {
        if("\n" == outputText.innerText[index]) {
            state = index + 1
            break
        }
    }

    previousText = outputText.innerText.slice(state, outputText.innerText.length)
    outputText.innerText =  previousText + "\n" + text;
}