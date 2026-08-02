const loadScreen = document.querySelector('.load-screen');
const progressBar = loadScreen.querySelector('.progress');
const percEl = document.getElementById('perc');
const canvas = document.getElementById('cvs');
const scripts = ['preload', 'Emoji', 'flush', 'main'];
let timeout = null;
let progress = 0;

function loadingScreen() { 
  const randomProgressJump = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
  const randomDelay = Math.floor(Math.random() * (100 - 20 + 1)) + 20;

  if (progress >= 100) {
    clearTimeout(timeout);

    scripts.forEach(script => {
      const el = document.createElement('script');
      el.src = `${script}.js`;
      document.body.appendChild(el);
    });

    loadScreen.style.display = 'none';
    canvas.style.display = 'block';
    return;
  }

  progressBar.style.width = `${progress}%`;
  percEl.textContent = `${progress}%`;
  progress += randomProgressJump;

  timeout = setTimeout(loadingScreen, randomDelay);
}

loadingScreen();