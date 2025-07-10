import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Button,
  Divider,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese (Mandarin)',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Bengali'
];

const LanguageModal = ({ open, onClose, selectedLang, setSelectedLang }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            px: 2,
            py: 1.75,
            justifyContent: 'center',
        }}
        >
            <span className='absolute left-3 cursor-pointer' onClick={onClose}>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 1L1.75 7L7.75 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        
        <Box component="span" sx={{ fontWeight: 600, fontSize: '16px', color: '#000' }}>
            App language
        </Box>
      </Box>

      <Divider />

      <DialogContent sx={{ p: 0 }}>
        <List disablePadding>
          {languages.map((lang) => (
            <ListItem
              key={lang}
              disableGutters
              secondaryAction={
                <Radio
                    edge="end"
                    checked={selectedLang === lang}
                    onChange={() => setSelectedLang(lang)}
                    value={lang}
                    sx={{
                        color: '#ff2e63',
                        maxWidth: '3rem',
                        width: '3rem',
                        minWidth: '3rem',
                        '&.Mui-checked': {
                        color: '#ff2e63',
                        },
                    }}
                />
              }
            >
              <ListItemButton onClick={() => setSelectedLang(lang)}>
                <ListItemText
                  primary={lang}
                  primaryTypographyProps={{ fontSize: '15px' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 2, pb: 2, pt: 1 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#ff2e63',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '15px',
              py: 1.2,
              '&:hover': {
                backgroundColor: '#e6004c',
              }
            }}
            onClick={onClose}
          >
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageModal;
