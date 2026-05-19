(function () {
  try {
    if (new URLSearchParams(window.location.search).get('embed') === '1') {
      document.documentElement.classList.add('app-embed');
    }
  } catch (e) {}
})();
