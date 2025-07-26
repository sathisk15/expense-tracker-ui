import React, { useState } from 'react';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(theme === 'darks');
  return <div>ThemeSwitch</div>;
};

export default ThemeSwitch;
