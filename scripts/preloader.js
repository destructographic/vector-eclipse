// declare an array of assets for preload
const assetsForPreload = [
    { src: 'assets/red-circle.svg', type: 'image' },
    { src: 'assets/space_bg1.png', type: 'image' },
    { src: 'assets/space_bg_dust1.png', type: 'image' },
    { src: 'assets/starfield_test2.png', type: 'image' },
    { src: 'assets/ve_logo_dither.png', type: 'image' },
    { src: 'assets/ve-dash1.png', type: 'image' },
   // { src: 'assets/track01.mp3', type: 'sound' },
 ];



 

// display or hide the loading curtain
function loaderCurtain(action) {
  const curtainElement = document.getElementById('curtain');
  if (action === 'show') {
    curtainElement.style.display = 'block';
  } else if (action === 'hide') {
    curtainElement.style.display = 'none';
  } else {
    console.error('Invalid action provided. Use "show" or "hide".');
  }
}



// object to store preloaded assets
const preloadedAssets = {};





// preload the assets and return a promise
function preloadAssets() {
  return new Promise((resolve, reject) => {
    let assetsLoaded = 0;
    const totalAssets = assetsForPreload.length;

    assetsForPreload.forEach(asset => {
      let element;
      if (asset.type === 'image') {
        element = new Image();
      } else if (asset.type === 'sound') {
        element = new Audio();
      }

      element.src = asset.src;

      element.addEventListener('load', () => {
        preloadedAssets[asset.src] = element;
        assetsLoaded++;
        if (assetsLoaded === totalAssets) {
          resolve();
        }
      });

      element.addEventListener('error', () => {
        reject();
      });
    });
  });
}



