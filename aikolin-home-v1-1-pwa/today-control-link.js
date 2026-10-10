(() => {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-screen="today"]');
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = './today-preview.html';
  }, true);
})();