//PULO

const mario = document.querySelector(".mario");

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500); // remove a classe dps que a animação terminar (500ms)
};
document.addEventListener("keydown", jump); //keydown é quando qualquer tecla do teclado for pressionada

const pipe = document.querySelector(".pipe");
const cloud = document.querySelector(".clouds");
const gameOver = document.querySelector(".game-over");
let score = 0;
const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft; //pega o deslocamento horizontal esquerdo da posição do pipe(tubo)
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", ""); //pega o bottom da imagem do mario
  const cloudPosition = cloud.offsetLeft;
  //   console.log(marioPosition);

  if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
    //o if verifica se a posição do pipe é menor ou igual a 120, se a altura do mario é suficiente para estar acima do tubo quando se encontram (80px) e se a posição do tubo é maior q 0, se n tiver esse maior que 0 o tubo para quando chegar no 0

    //O MARIO E O TUBO SEMPRE SE ENCONTRAM EM 120PX
    //tira a animação do tubo, ou seja, para ele onde está
    pipe.style.animation = "none";
    //seta a posição esquerda do tubo como sendo onde o mario encostou
    pipe.style.left = `${pipePosition}px`;

    //pausa a animação do mario, e ele fica parado onde está também
    mario.style.animation = "none";
    //seta a posição do mario como a posição em que ele encostou no tubo, no caso na altura
    mario.style.bottom = `${marioPosition}px`;

    //se o mario encostar troca a imagem do gif pela imagem de game over
    mario.src = "../images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    //pausa a animação das nuvens quando o mario encostar no tubo
    cloud.style.animation = "none";
    //seta a posição das nuvens onde elas estão quando o mario encostar no tubo
    cloud.style.left = `${cloudPosition}px`;
    //game over
    gameOver.style.display = "flex";

    clearInterval(loop);
  } else {
    scoreFunction();
  }
}, 10);

// Reiniciar o jogo
const restartGame = () => {
  location.reload(); //dá reload na página
  return false; //necessário quando estamos dando reload depois de um click em botão
};

//pontuação
const scoreNumber = document.querySelector(".score-number");
const scoreFunction = () => {
  //pontuação
  score += Number(pipe.offsetLeft);
  console.log(score);
  scoreNumber.textContent += score;
};
