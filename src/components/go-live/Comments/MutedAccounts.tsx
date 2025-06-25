import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Box
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';

const mutedUsers = [
  {
    name: 'Giana Workman',
    username: 'Giann34',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

export default function MutedAccounts({ onBack }: { onBack: () => void }) {
  return (
    <Box sx={{ maxWidth: 360, mx: 'auto', bgcolor: '#fff', position: 'fixed', right: 0, top: 0, zIndex: 3 }}>
      <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mb: 2,
                p: 1,
                borderBottom: "1px solid #eee",
              }}
            >
              <IconButton
                onClick={onBack}
                sx={{ position: "absolute", left: 0 }}
              >
              <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.69141 1.25L1.69141 7.25L7.69141 13.25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>        </IconButton>
              <Typography fontWeight="bold" variant="body1">
                Muted Account
              </Typography>
      </Box>

      <Box sx={{ px: 2,  }}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#F2F2F2',
                borderRadius: '12px',
                px: 1,
                height: 44,
                mb: 1,
            }}
            >
            <SearchIcon sx={{ color: 'text.disabled', fontSize: 20, mr: 1 }} />
            <input
                type="text"
                placeholder="Search accounts"
                style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14px',
                flex: 1,
                color: '#000',
                }}
            />
            </Box>


        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          These accounts are muted for the rest of the LIVE
        </Typography>

        <List>
          {mutedUsers.map((user, index) => (
            <ListItem key={index} disableGutters secondaryAction={
              <Button
              onClick={}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  px: 2,
                  height: 32,
                  color: '#000',
                  borderColor: '#000'
                }}
              >
                Unmute
              </Button>
            }>
              <ListItemAvatar>
                <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight="bold">{user.name}</Typography>}
                secondary={<Typography variant="caption" color="text.secondary">{user.username}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {/*  */}
      <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                No mute accounts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 280, px: 2 }}>
                Edit this list by tapping "Manage" on a viewer's personal card
              </Typography>
            </Box>
      
    </Box>
  );
}
