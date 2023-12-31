// main.js



// chain the functions with promises
preloadAssets()
  .then(() => {
    populateTitleScreen();
    loaderCurtain('hide');
  })
  .catch(() => {
    console.error('Error in asset preload.');
  });


  


function populateTitleScreen() {
  const gameArea = document.getElementById('game-area');  
  gameArea.style.backgroundImage = `url(${preloadedAssets['assets/space_bg1.png'].src}), 
  url(${preloadedAssets['assets/nebulae.png'].src}), 
  url(${preloadedAssets['assets/space_bg_dust1.png'].src}), 
  url(${preloadedAssets['assets/starfield_test2.png'].src})`;

  const titleLogo = document.createElement('img');
  titleLogo.id = 'title-logo';
  titleLogo.src = preloadedAssets['assets/ve_logo_dither.png'].src;
  gameArea.appendChild(titleLogo);

  const startGameText = document.createElement('p');
  startGameText.textContent = 'START GAME';
  startGameText.classList.add('start-game-text');
  gameArea.appendChild(startGameText);

  // add event listener to startGameText
  startGameText.addEventListener('click', gameLoop);
}



function gameLoop() {
  const titleLogo = document.getElementById('title-logo');
  const startGameText = document.querySelector('.start-game-text');
  
  // hide titleScreen content
  titleLogo.style.display = 'none';
  startGameText.style.display = 'none';

  drawCockpit(); 
}






function drawCockpit() {
  const gameArea = document.getElementById('game-area'); 
  // add elements to "game-area"
  // TODO: build this structure in html instead with 
  // preset display=none and just toggle display
  const shell = document.createElement('div');
  shell.id = 'shell';
  gameArea.appendChild(shell);
  shell.style.backgroundImage = `url(${preloadedAssets['assets/ve-dash1.png'].src})`;
  const dashboard = document.createElement('div');
  dashboard.id = 'dashboard';
  shell.appendChild(dashboard);
  const background = document.createElement('div');
  background.className = 'background';
  dashboard.appendChild(background);
  
  // create the "left" screen
  const left = document.createElement('div');
  left.id = 'left';
  dashboard.appendChild(left);
  // add image to the left screen
  const leftImage = document.createElement('img');
  leftImage.src = preloadedAssets['assets/halftone-screen-left.png'].src;
  left.appendChild(leftImage);

  // create the "middle" screen
  const middle = document.createElement('div');
  middle.id = 'middle';
  dashboard.appendChild(middle);
  // add iframe to "middle" screen 
  const iframe = document.createElement('iframe');
  iframe.width = '560';
  iframe.height = '315';
  iframe.src = 'https://www.youtube.com/embed/IixELyhvSKc';
  iframe.title = 'YouTube video player';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = false;
  iframe.autoplay = true;
  middle.appendChild(iframe);

  // create the "right" screen
  const right = document.createElement('div');
  right.id = 'right';
  dashboard.appendChild(right);
  // add image to the right screen
  const rightImage = document.createElement('img');
  rightImage.src = preloadedAssets['assets/halftone-screen-right.png'].src;
  right.appendChild(rightImage);

}





  function textBasedGame() {
  // console.log("called: gameLoop()");
  const titleLogo = document.getElementById('title-logo');
  const startGameText = document.querySelector('.start-game-text');

  // hide titleScreen content
  titleLogo.style.display = 'none';
  startGameText.style.display = 'none';

  // text game here
  const USSAssembly = {
    name: 'USS Assembly',
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
  };

  const alienShips = [];
  const totalAlienShips = 6;

  // create alien ships
  for (let i = 0; i < totalAlienShips; i++) {
    const alienShip = {
      name: `Alien Ship ${i + 1}`,
      hull: getRandomValue(3, 6),
      firepower: getRandomValue(2, 4),
      accuracy: getRandomValue(0.6, 0.8),
    };
    alienShips.push(alienShip);
  }

  let currentShip = 0; // index of the ship to attack

  while (currentShip < totalAlienShips && USSAssembly.hull > 0) {
    console.log(`You attack ${alienShips[currentShip].name}!`);

    if (Math.random() < USSAssembly.accuracy) {
      console.log('You hit the enemy ship!');

      alienShips[currentShip].hull -= USSAssembly.firepower;

      if (alienShips[currentShip].hull <= 0) {
        console.log(`${alienShips[currentShip].name} has been destroyed!`);

        currentShip++; // move to the next ship

        if (currentShip === totalAlienShips) {
          console.log('You destroyed all alien ships! You win!');
          return;
        }

        const choice = window.prompt('Do you want to attack the next ship or retreat? (attack/retreat)');
        if (choice === 'retreat') {
          console.log('You chose to retreat. Game over.');
          return;
        }
      }
    } else {
      console.log('You missed the enemy ship!');
    }

    if (alienShips[currentShip].hull > 0) {
      console.log(`${alienShips[currentShip].name} attacks you!`);

      if (Math.random() < alienShips[currentShip].accuracy) {
        console.log('You have been hit!');
        USSAssembly.hull -= alienShips[currentShip].firepower;

        if (USSAssembly.hull <= 0) {
          console.log('Your ship has been destroyed! Game over.');
          return;
        }
      } else {
        console.log(`${alienShips[currentShip].name} missed you!`);
      }
    }
  }
}


// get a random value within a range
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

