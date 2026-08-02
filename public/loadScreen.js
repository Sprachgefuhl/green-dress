const loadScreen = document.querySelector('.load-screen');
const progressBar = loadScreen.querySelector('.progress');
const percEl = document.getElementById('perc');
const canvas = document.getElementById('cvs');
const scripts = ['preload', 'Emoji', 'flush', 'main'];
let timeout = null;
let progress = 0;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.onload = resolve;
    el.onerror = reject;
    document.body.appendChild(el);
  });
}

function loadingScreen() { 
  const randomProgressJump = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
  const randomDelay = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

  if (progress >= 100) {
    clearTimeout(timeout);

    Promise.all(scripts.map(name => loadScript(`${name}.js`)))
      .then(() => {
        loadScreen.style.display = 'none';
        canvas.style.display = 'block';
      })
      .catch(err => {
        console.error('Script failed to load:', err);
        // Optional: still hide the loader or show an error UI
        loadScreen.style.display = 'none';
        canvas.style.display = 'block';
      });

    return;
  }

  progressBar.style.width = `${progress}%`;
  percEl.textContent = `${progress}%`;
  progress += randomProgressJump;

  timeout = setTimeout(loadingScreen, randomDelay);
}

loadingScreen();