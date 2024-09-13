import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import thumbnail from '../../assets/thumbnail.png';
import { relative } from 'path';

const TwoEqualBlocks = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '100%', width: '100%' }}>
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: '50%',
            // height: '50%',
            minWidth:'50%',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: '#fff',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            position:'relative'
          }}
        >
          <Typography variant="body1">
            <img src={thumbnail} style={{ borderRadius: '50%', width: '125px' }} alt="Thumbnail" />
            <span style={{position:'absolute',left:'10px',bottom:'10px'}}>UserName {i + 1}</span>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TwoEqualBlocks;