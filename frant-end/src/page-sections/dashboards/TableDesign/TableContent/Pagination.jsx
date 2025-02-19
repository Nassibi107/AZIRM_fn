import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid, InputAdornment } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const TablePaginater = ({currentPageBase, setCurrentPageBase, setRowsPerPageBase, maxContent}) => {

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const totalPages = Math.ceil(maxContent / rowsPerPage);

  const handleLeftClick = () => {
    if (currentPageBase > 1) setCurrentPageBase(currentPageBase - 1);
  };

  const handleRightClick = () => {
    if (currentPageBase < totalPages) setCurrentPageBase(currentPageBase + 1);
  };

  return (
    <Grid pb={5} mt={0} container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid
            item
            sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            }}
        >
            <Grid item sx={{ marginLeft: '10px' }}>
                <span>{`${(currentPageBase - 1) * rowsPerPage + 1}–${Math.min(currentPageBase * rowsPerPage, maxContent)} of ${maxContent}`}</span>
            </Grid>

            <Grid item>
                {/* <Tooltip title={`Rows per page`} arrow placement="top" slots={{transition: Zoom,}}> */}
                    <Select
                        value={rowsPerPage}
                        onChange={(event) => {
                            setRowsPerPage(event.target.value);
                            setRowsPerPageBase(event.target.value);
                            setCurrentPageBase(1);
                        }}
                        displayEmpty
                        sx={{
                            // minWidth: '80px',
                            height: '40px',
                            border: 'none',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                    >
                        {[5, 10, 25, 50].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </Select>
                {/* </Tooltip> */}
            </Grid>
        </Grid>

      <Grid
            item
            sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            }}
        >
            <Grid item>
                <InputAdornment position="start">
                    <ArrowLeftIcon
                    color="action"
                    sx={{
                        cursor: currentPageBase > 1 ? 'pointer' : 'default',
                        color:currentPageBase > 1 ? (isDark ? '#A5A6A9' : 'rgba(0,0,0,0.9)') :  (isDark ? 'rgba(0,0,0,0.5)' : 'rgb(0,0,0,0.1)'), 
                        borderRadius: '50%',
                        '&:hover': {
                        backgroundColor: currentPageBase > 1 ? (isDark ? '#494B4E' : '#E0E0E0') : 'undefined',
                        },
                    }}
                    onClick={handleLeftClick}
                    disabled={currentPageBase <= 1}
                    />
                </InputAdornment>
            </Grid>

            {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isStart = pageNumber === 1;
            const isEnd = pageNumber === totalPages;
            const isNearCurrent = Math.abs(pageNumber - currentPageBase) <= 1;

            if (
                (pageNumber > 1 && pageNumber < currentPageBase - 1 && !isStart) ||
                (pageNumber < totalPages && pageNumber > currentPageBase + 1 && !isEnd)
            ) {
                if (pageNumber === currentPageBase - 2 || pageNumber === currentPageBase + 2) {
                return (
                    <span
                    key={`ellipsis-${pageNumber}`}
                    style={{
                        margin: '0 5px',
                        color: '#999',
                        fontSize: '14px',
                    }}
                    >
                    ...
                    </span>
                );
                }
                return null;
            }
            return (
                <button
                key={pageNumber}
                onClick={() => setCurrentPageBase(pageNumber)}
                style={{
                    minWidth: '25px',
                    minHeight: '25px',
                    borderRadius: '50%',
                    border: '0px solid #ccc',
                    backgroundColor: pageNumber === currentPageBase
                    ? (isDark ? 'rgb(144, 202, 249)' : 'rgb(144, 202, 249)')
                    : 'transparent',
                    color: pageNumber === currentPageBase
                    ? (isDark ? 'black' : 'white')
                    : (isDark ? 'white' : 'black'),
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = pageNumber === currentPageBase
                    ? (isDark ? '#42A5F5' : '#42A5F5')
                    : (isDark ? '#232628' : '#F5F5F5');
                    e.target.style.color = pageNumber === currentPageBase ? 'black' : (isDark ? 'white' : 'black');
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = pageNumber === currentPageBase
                    ? (isDark ? 'rgb(144, 202, 249)' : 'rgb(144, 202, 249)')
                    : 'transparent';
                    e.target.style.color = pageNumber === currentPageBase ? 'black' : (isDark ? 'white' : 'black');
                }}
                >
                {pageNumber}
                </button>
            );
            })}

            <Grid item>
                <InputAdornment position="start">
                    <ArrowRightIcon
                    color="action"
                    sx={{
                        cursor: currentPageBase < totalPages ?  'pointer' : 'default',
                        color:currentPageBase < totalPages ?  (isDark ? '#A5A6A9' : 'rgba(0,0,0,0.9)') : (isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)'),
                        borderRadius: '50%',
                        '&:hover': {
                        backgroundColor: currentPageBase < totalPages ? (isDark ? '#494B4E' : '#E0E0E0') : undefined,
                        },
                    }}
                    onClick={handleRightClick}
                    disabled={currentPageBase >= totalPages}
                    />
                </InputAdornment>
            </Grid>
      </Grid>
    </Grid>
  );
};

export default TablePaginater;
