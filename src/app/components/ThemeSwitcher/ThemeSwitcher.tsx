const themes = [
  'lara-light-indigo',
  'lara-dark-indigo',
  'bootstrap4-light-purple',
  'bootstrap4-dark-purple',
];

const ThemeSwitcher = () => {
  const handleThemeChange = (newTheme: string) => {
    const oldThemeLink = document.getElementById(
      'theme-selector',
    ) as HTMLElement;

    if (oldThemeLink) {
      oldThemeLink.remove();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/themes/${newTheme}/theme.css`;
    link.id = 'theme-selector';
    document.head.appendChild(link);

    saveTheme(newTheme);
  };

  const saveTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
  };

  const getTheme = () => {
    localStorage.getItem('theme');
  };

  return (
    <div>
      {themes.map((theme) => (
        <button key={theme} onClick={() => handleThemeChange(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
