(() => {
  document.addEventListener('click', (event) => {
    const review = event.target.closest('[data-review]');
    if (!review) return;
    const item = review.closest('.approveItem');
    if (!item) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const id = item.dataset.id || 'a1';
    window.location.href = './approval-review.html?id=' + encodeURIComponent(id);
  }, true);
})();