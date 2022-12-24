var dino = document.getElementsByClassName('dino')[0];
var bg = document.getElementsByClassName('background')[0];
var velocidade = 5;
var brotafreq = Math.random()*6000;

isJumping = false;

document.addEventListener("keypress", (press) => {
    var keypressed = press.key;

    if(keypressed == "w") { saltar(); return}
});


function moverFundo(){
    fundo = document.getElementsByClassName('background')[0];
    fundoX = parseInt(getComputedStyle(fundo).getPropertyValue('background-position'));

    if(fundoX <= -525){
        fundo.style.backgroundPosition == "0px"
    }

    fundo.style.backgroundPosition = fundoX-velocidade + "px";
}

function saltar() {

    if(isJumping == true){return}

    isJumping = true;

    let dinoY = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    
    if (dinoY <= 5) {

        let subindo = setInterval(() =>{
            let dinoY = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));

            if(dinoY >= 100) {
                clearInterval(subindo);

                let descendo = setInterval(() => {
                    let dinoY = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));

                    if(dinoY <= 5){clearInterval(descendo); isJumping = false; return}

                    dino.style.bottom = dinoY - velocidade + "px";

                },20)
            }

            dino.style.bottom = dinoY + velocidade + "px";

        },20)
    }

    }
    

function brotaCactus() {

    let cactus = document.createElement("div");
    cactus.classList.add('cactus');

    bg.appendChild(cactus);

    let cactusVindo = setInterval(() => {

        instaCactus = document.getElementsByClassName('cactus')[0];
        let cactusX = parseInt(getComputedStyle(instaCactus).getPropertyValue('left'));

        let dinoY = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));

        if(cactusX <= 0){
            if(isJumping == false && dinoY <= 60){
                gameOver();
            }
            removido = bg.lastElementChild;
            bg.removeChild(removido);
            clearInterval(cactusVindo);
            return;
        }  else { instaCactus.style.left = cactusX - velocidade*2 + "px";}

    },20);

}

function gameOver(){
    let all = document.querySelectorAll('.background')[0];
    all.parentNode.removeChild(all);
    clearInterval(movimento);
    clearInterval(vemCactus);
    scrGameOver = document.createElement('div');
    scrGameOver.classList.add('telaFinal');
    document.body.appendChild(scrGameOver);
    scrGameOver.innerHTML = "Game Over";
}

let movimento = setInterval(moverFundo,10);
let vemCactus = setInterval(brotaCactus,brotafreq);


