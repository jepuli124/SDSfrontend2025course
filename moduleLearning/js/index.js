
document.addEventListener('DOMContentLoaded', () => {

    //FAQ content shower/disabler
    const faqHeader = document.querySelector('.faq-header');
    faqHeader.addEventListener('click', (e) => {
        const groupHeader = e.target.closest('.faq');
        if (!groupHeader) return;
    
        const offgroup = groupHeader.querySelectorAll('.off');
        const ongroup = groupHeader.querySelectorAll('.on');
    
        offgroup.forEach((element) => {

            element.classList.remove('off');
            element.classList.add('on');

        });
        ongroup.forEach((element) => {

            element.classList.remove('on');
            element.classList.add('off');

        });
        });

    //open/closes menu
    const menuButton = document.getElementById("menuButton")
    menuButton.addEventListener('click', () => {
        const menu = document.getElementById("menu")

        menu.classList.toggle("off")

        const menuButtons = document.querySelectorAll(".menuItem");
        menuButtons.forEach((button) => {
            button.classList.toggle('on');
            button.classList.toggle('off');
        })

    });

    //closes menu
    closeMenu = document.getElementById("closeMenu")
    closeMenu.addEventListener('click', () => {
        menu = document.getElementById("menu")

        menu.classList.toggle("off")
        const menuButtons = document.querySelectorAll(".menuItem");
        menuButtons.forEach((button) => {
            button.classList.remove('on');
            button.classList.add('off');
        })

    });

    // Menu can now move screen, very epic
    const menuItems = document.querySelectorAll(".menuItem");
    for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', () => {
            // https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
            document.body.scrollTop = 300 * index; // For Safari
            document.documentElement.scrollTop =  300 * index; // For Chrome, Firefox, IE and Opera
    
        });
        
    }
    

  });

