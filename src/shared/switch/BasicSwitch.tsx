import { Switch, styled } from '@mui/material';
import React from 'react';

function BasicSwitch({ ...resProps }: any) {
  const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    display: 'flex',

    '& .MuiSwitch-switchBase': {
      padding: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#20D5EC',
          opacity: 1,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.5)',
      },
    },

    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: '4px solid #fff',
      borderRadius: '50%',
      boxSizing: 'border-box',
      boxShadow: 'none',
    },

    '& .MuiSwitch-track': {
      borderRadius: 10,
      backgroundColor: '#ccc',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 300,
      }),
    },
  }));

  return <StyledSwitch {...resProps} />;
}

export default BasicSwitch;
