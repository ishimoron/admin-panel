import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';
import { useEffect, useState } from 'react';

const ColorSchemeToggle = (props: IconButtonProps) => {
  const { onClick, sx, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...other}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
      sx={{ ...sx }}
    >
      {mode === 'dark' ? <DarkModeRoundedIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ColorSchemeToggle;
