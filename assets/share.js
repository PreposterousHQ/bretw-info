(() => {
  document.querySelectorAll('.share-control').forEach(control => {
    const url = control.dataset.shareUrl;
    const title = control.dataset.shareTitle;
    const status = control.querySelector('.share-status');
    const fallback = control.querySelector('.share-fallback');
    control.querySelector('[data-copy-link]').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = 'Link copied.';
        fallback.hidden = true;
      } catch {
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        status.textContent = 'Select and copy the link below.';
      }
    });
    const native = control.querySelector('[data-native-share]');
    if (typeof navigator.share === 'function') {
      native.hidden = false;
      native.addEventListener('click', async () => {
        try { await navigator.share({title, url}); }
        catch (error) {
          if (error.name !== 'AbortError') status.textContent = 'Choose a service above or copy the link.';
        }
      });
    }
    control.addEventListener('toggle', () => {
      if (control.open) document.querySelectorAll('.share-control[open]').forEach(other => {
        if (other !== control) other.open = false;
      });
    });
  });
})();
