// jmoxon theme behaviour. Bundled by Hugo's js.Build (esbuild).

const THEME_KEY = 'theme';

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return prefersDark() ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    // Forget the choice when it matches the system, so the site keeps
    // following the system setting if that changes later.
    const systemTheme = prefersDark() ? 'dark' : 'light';
    if (theme === systemTheme) {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, theme);
    }
  } catch (e) {
    // Storage unavailable (private mode): the choice lasts for this page only.
  }
}

function initThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const sync = () => {
      const dark = currentTheme() === 'dark';
      button.setAttribute('aria-pressed', String(dark));
    };
    sync();
    button.addEventListener('click', () => {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      sync();
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
  });
}

function initNavbarBurgers() {
  document.querySelectorAll('.navbar-burger').forEach((burger) => {
    const toggle = () => {
      const target = document.getElementById(burger.dataset.target);
      const open = burger.classList.toggle('is-active');
      if (target) target.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', toggle);
  });
}

function initButtons() {
  // Show a loading state on buttons when clicked
  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => button.classList.toggle('is-loading'));
  });
}


document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarBurgers();
  initButtons();
});
