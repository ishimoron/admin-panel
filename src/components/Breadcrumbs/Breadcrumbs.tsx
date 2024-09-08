import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Box from '@mui/joy/Box';
import BreadcrumbsJoy from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import { Link } from '@tanstack/react-router';

import { Routes_E } from '../../enums/Routes_E';

interface BreadcrumbsProps {
  title: string;
  route: string;
  children: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  title,
  route,
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BreadcrumbsJoy
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon />}
            sx={{ pl: 0 }}
          >
            <Link color="neutral" to={Routes_E.DASHBOARD} aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link>
              <Typography level="title-sm" color="neutral">
                {route}
              </Typography>
            </Link>
          </BreadcrumbsJoy>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            {title}
          </Typography>
          {/* <Button color="primary" startDecorator={<DownloadRoundedIcon />}>
					Download PDF
				</Button> */}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default Breadcrumbs;
