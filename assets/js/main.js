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
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      button.title = button.getAttribute('aria-label');
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
    burger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function initButtons() {
  // Show a loading state on buttons when clicked
  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => button.classList.toggle('is-loading'));
  });
}

function scrollToArticle() {
  // On small screens, jump past the header straight to the article
  const article = document.querySelector('#main_article');
  const burger = document.querySelector('.navbar-burger');
  if (article && burger && burger.offsetParent !== null) {
    article.scrollIntoView();
  }
}

function initBookmarks() {
  // Browsers no longer let pages add bookmarks, so show the shortcut instead.
  const isMac = /mac/i.test(navigator.userAgent);
  document.querySelectorAll('.bookmark-this').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.alert(`Press ${isMac ? 'Cmd' : 'Ctrl'}+D to bookmark this page.`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarBurgers();
  initButtons();
  scrollToArticle();
  initBookmarks();
});
