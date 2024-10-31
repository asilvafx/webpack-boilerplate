
(() => {
  const THEME = 'theme';
  const getStoredTheme = () => localStorage.getItem(THEME);
  const setStoredTheme = theme => localStorage.setItem(THEME, theme);
  const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
  if (urlParams.get('theme') && ['auto', 'dark', 'light'].includes(urlParams.get('theme'))) {
    localStorage.setItem(THEME, urlParams.get('theme'));
  }
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }; 
  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    const event = new Event('ColorSchemeChange');
    document.documentElement.dispatchEvent(event);
  };
  setTheme(getPreferredTheme());
  const showActiveTheme = theme => {
    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-theme-value="${theme}"]`);
    if(btnToActive){ 
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('xlink:href');
      for (const element of document.querySelectorAll('[data-theme-value]')) {
        element.classList.remove('active');
      }
      btnToActive.classList.add('active');
      activeThemeIcon.setAttribute('xlink:href', svgOfActiveBtn);
    }
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });

  window.colorTheme = function colorTheme(theme){
    if(theme!=""){
      switch(theme){
        case "dark":
        case "light":
        case "auto":
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme);
        break;
      }
    }
  }

  showActiveTheme(getPreferredTheme());
}
)(); 