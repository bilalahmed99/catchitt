import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const CustomTabs = styled(Tabs)({
  backgroundColor: '#fff',
});

const ads: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="text-left"  sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <AppBar position="static" color="default"  sx={{boxShadow: 'none', borderBottom: '1px solid #16182333'}} >
        <CustomTabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="fullWidth"
        >
           <Tab label="Topic" id="simple-tab-0" aria-controls="simple-tabpanel-0"
              sx={{ flex: 1, color: 'black', textTransform: 'none'}} 
             />
          <Tab label="Gender" id="simple-tab-1" aria-controls="simple-tabpanel-1" 
            sx={{ flex: 1, color: 'black',  textTransform: 'none', '&.Mui-selected': { color: 'black', borderBottom: '2px solid black' } }} 
           />
        </CustomTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
          Inferred by <br /> Seezitt
          </span>
          <div className='d-flex justify-between'>
                <div >
                    <div className='text-left'>
                      <p>View all</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>

            </div>
        </div>
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
            Your choices
          </span>
          <div className='d-flex justify-between'>
                <div >
                    <div className='text-left'>
                      <p>View all</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>
            </div>
        </div>
        <div className='w-100 border-bottom py-3 mb-3'>
          <span className='text-sm font-medium text-[#16182399]'>
            All topics
          </span>
          <div className='d-flex justify-between mt-3'>
                <div >
                    <div className='text-left'>
                      <p>Education</p>
                    </div>
                </div>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4566 8.84045L8.90329 4.28378C8.8412 4.22133 8.80636 4.13684 8.80636 4.04878C8.80636 3.96072 8.8412 3.87623 8.90329 3.81378L9.51662 3.20045C9.57907 3.13836 9.66356 3.10352 9.75162 3.10352C9.83968 3.10352 9.92417 3.13836 9.98662 3.20045L15.39 8.60045C15.4212 8.63143 15.446 8.6683 15.4629 8.70892C15.4798 8.74954 15.4886 8.79311 15.4886 8.83711C15.4886 8.88112 15.4798 8.92469 15.4629 8.96531C15.446 9.00593 15.4212 9.04279 15.39 9.07378L9.98662 14.4804C9.92417 14.5425 9.83968 14.5774 9.75162 14.5774C9.66356 14.5774 9.57907 14.5425 9.51662 14.4804L8.90329 13.8671C8.87204 13.8361 8.84725 13.7993 8.83032 13.7586C8.8134 13.718 8.80469 13.6744 8.80469 13.6304C8.80469 13.5864 8.8134 13.5429 8.83032 13.5023C8.84725 13.4616 8.87204 13.4248 8.90329 13.3938L13.4566 8.84045Z" fill="#161823"/>
                </svg>

            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
        <div className='p-5 d-flex flex-col text-center'>
        <svg style={{height: '3rem'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 53 53" fill="none">
        <path d="M2.14821 26.3405C2.14821 14.7714 2.14821 8.98692 5.74225 5.39287C9.3363 1.79883 15.1208 1.79883 26.6899 1.79883C38.2589 1.79883 44.0435 1.79883 47.6375 5.39287C51.2315 8.98692 51.2315 14.7714 51.2315 26.3405C51.2315 37.9095 51.2315 43.6941 47.6375 47.2881C44.0435 50.8822 38.2589 50.8822 26.6899 50.8822C15.1208 50.8822 9.3363 50.8822 5.74225 47.2881C2.14821 43.6941 2.14821 37.9095 2.14821 26.3405Z" stroke="#141B34" stroke-width="2.5"/>
        <path d="M16.3565 38.0072C15.6662 38.0072 15.1065 38.5668 15.1065 39.2572C15.1065 39.9475 15.6662 40.5072 16.3565 40.5072L16.3565 38.0072ZM37.0232 40.5072C37.7136 40.5072 38.2732 39.9475 38.2732 39.2572C38.2732 38.5668 37.7136 38.0072 37.0232 38.0072V40.5072ZM34.0468 26.7353C34.5267 26.239 34.5134 25.4477 34.0172 24.9678C33.5209 24.4879 32.7296 24.5011 32.2497 24.9974L34.0468 26.7353ZM30.1149 29.0029L31.0135 29.8718H31.0135L30.1149 29.0029ZM23.2648 29.0029L22.3663 29.8718H22.3663L23.2648 29.0029ZM21.1301 24.9974C20.6502 24.5011 19.8588 24.4879 19.3626 24.9678C18.8663 25.4477 18.8531 26.239 19.333 26.7353L21.1301 24.9974ZM27.9399 13.4238C27.9399 12.7335 27.3802 12.1738 26.6899 12.1738C25.9995 12.1738 25.4399 12.7335 25.4399 13.4238L27.9399 13.4238ZM16.3565 40.5072L37.0232 40.5072V38.0072L16.3565 38.0072L16.3565 40.5072ZM32.2497 24.9974L29.2164 28.1339L31.0135 29.8718L34.0468 26.7353L32.2497 24.9974ZM24.1634 28.1339L21.1301 24.9974L19.333 26.7353L22.3663 29.8718L24.1634 28.1339ZM29.2164 28.1339C28.3842 28.9943 27.8462 29.5468 27.3989 29.8997C26.9785 30.2314 26.7952 30.2572 26.6899 30.2572L26.6899 32.7572C27.5877 32.7572 28.3096 32.3656 28.9473 31.8624C29.5581 31.3806 30.231 30.6809 31.0135 29.8718L29.2164 28.1339ZM22.3663 29.8718C23.1487 30.6809 23.8217 31.3806 24.4324 31.8624C25.0701 32.3656 25.792 32.7572 26.6899 32.7572L26.6899 30.2572C26.5845 30.2572 26.4012 30.2314 25.9809 29.8997C25.5335 29.5468 24.9955 28.9943 24.1634 28.1339L22.3663 29.8718ZM27.9399 31.5072L27.9399 13.4238L25.4399 13.4238L25.4399 31.5072H27.9399Z" fill="#141B34"/>
        </svg>
          <p className='h6 mt-4'>No requests yet</p>
          <span className='text-[#0000008F]'>Start a request to download your data</span>
          <button
            className="bg-[#FE2C55] text-white font-semibold mt-4 px-5 rounded-md "
        >
            <p className="text-[rgb(255, 59, 92)] font-normal">Request data</p>
        </button>
        </div>
       
      </TabPanel>
    </Box>
  );
};

export default ads;
