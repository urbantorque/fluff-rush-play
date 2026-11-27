// Only loaded by the archived game's checkpoint entry. Each scene keeps its own progress.
(() => {
  const requested = new URLSearchParams(location.search).get('scene');
  const scene = ['two-hours', 'festival', 'breakfast', 'seedfall'].includes(requested) ? requested : 'two-hours';
  const prefix = document.currentScript.dataset.savePrefix || 'fluff-rush.review.c8b5302f32d2.' + scene + '.';
  for (const name of ['localStorage', 'sessionStorage']) {
    const backing = window[name];
    const keys = () => Object.keys(backing).filter(key => key.startsWith(prefix));
    const storage = {
      get length() { return keys().length; },
      key(index) { return keys()[index]?.slice(prefix.length) ?? null; },
      getItem(key) { return backing.getItem(prefix + key); },
      setItem(key, value) { backing.setItem(prefix + key, value); },
      removeItem(key) { backing.removeItem(prefix + key); },
      clear() { for (const key of keys()) backing.removeItem(key); },
    };
    Object.defineProperty(window, name, { value: storage });
  }
})();
