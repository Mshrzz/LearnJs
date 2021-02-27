const inputArea = document.querySelector('input'),
      repeatArea = document.querySelector('#repeater');

function debounce(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= t)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  }
}

function textChanger() {
    repeatArea.textContent = inputArea.value;
}

inputArea.addEventListener('input', debounce(textChanger, 300));