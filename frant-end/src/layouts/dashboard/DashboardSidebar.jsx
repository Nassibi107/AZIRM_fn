// DashboardSidebar.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { Link } from '@/components/link';
import { Scrollbar } from '@/components/scrollbar';
import { FlexBetween } from '@/components/flexbox';
import MultiLevelMenu from './MultiLevelMenu';
import UserAccount from '../layout-parts/UserAccount';
import ArrowLeftToLine from '@/icons/duotone/ArrowLeftToLine';
import { SidebarWrapper } from '../layout-parts/styles/sidebar';
import { useSelector } from 'react-redux';
import { ModeSelectors } from '@/___GlobalState__/Selectors/ModeSelectors'; // Adjust the path as per your actual file structure
import useLayout from './context/useLayout';


const TOP_HEADER_AREA = 70;

const DashboardSidebar = () => {
  const Mode = useSelector(ModeSelectors);
  const [chmod ,  setChmod] = useState(Mode);
  useEffect (() => setChmod(Mode) , [Mode] );
  const {
    sidebarCompact,
    handleSidebarCompactToggle
  } = useLayout();

  const [onHover, setOnHover] = useState(false);
  const COMPACT = sidebarCompact && !onHover ? 1 : 0;
  return (
  <SidebarWrapper compact={sidebarCompact ? 1 : 0} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => sidebarCompact && setOnHover(false)}>
        <FlexBetween padding="1.5rem 1rem .5rem 2rem" height={TOP_HEADER_AREA}>
          <Link href="/">
          <Box component="img" src="/static/logo/logo-svg.svg" alt="logo" width={30}  />
          </Link>
          {!COMPACT && (
            <IconButton onClick={handleSidebarCompactToggle}>
              <ArrowLeftToLine />
            </IconButton>
          )}
        </FlexBetween>
        <Scrollbar autoHide clickOnTrack={false} sx={{ overflowX: 'hidden', maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)` }}>
          <Box height="100%" px={2}>
            <MultiLevelMenu   sidebarCompact={!!COMPACT} />
            {!COMPACT && <UserAccount />}
          </Box>
        </Scrollbar>
      </SidebarWrapper>
  );
};

export default DashboardSidebar;
