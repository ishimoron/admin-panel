import { Box, CircularProgress } from '@mui/joy';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '100vh',
      }}
    >
      <CircularProgress variant="soft" />
    </Box>
  );
};

export default Loading;
