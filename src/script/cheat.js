var rainbow = new Audio('./res/starman.mp3');
var home = new Audio('./res/home.mp3');
var clique = 0;

home.play();

function rainbowToggle() {
    clique = (clique + 1) % 2;

    const ch = document.getElementsByClassName("openmod");
    const divs = document.getElementsByTagName("div");
    
    if (clique == 1) {
        console.log("active");

        home.pause();
        
        for (let i = 0; i < divs.length; i++) {
            divs[i].classList.add("rainbow");
        }

        for (let i = 0; i < ch.length; i++) {
            ch[i].classList.add("rainbow");
        }

        rainbow.loop = true;
        rainbow.play();
    }

    if (clique == 0){
        console.log("desactive");

        for (let i = 0; i < divs.length; i++) {
            divs[i].classList.remove("rainbow");
        }

        for (let i = 0; i < ch.length; i++) {
            ch[i].classList.remove("rainbow");
        }

        rainbow.pause();   
        home.play();    
        rainbow.currentTime = 0;
    }
}


