let pending = 0;
let timer = null;
const DELAY = 800;

function queueIncrement(increment) {
  pending += increment;
  clearTimeout(timer);
  timer = setTimeout(flush, DELAY);
}

function flush() {
  timer = null;
  if (pending === 0) return;

  const toSend = pending;
  pending = 0;

  fetch('/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clicks: toSend })
  }).catch(err => {
    console.error(err);
    pending += toSend;
    if (!timer) timer = setTimeout(flush, DELAY);
  });
}