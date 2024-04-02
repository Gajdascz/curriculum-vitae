const applyDefaultTheme = () => {
  const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
  if (prefersLightTheme.matches)
    document.documentElement.classList.add('light-theme');
};

applyDefaultTheme();
