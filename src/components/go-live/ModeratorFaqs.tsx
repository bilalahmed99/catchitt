    import React from 'react';
    import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Container,
    } from '@mui/material';
    import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

    export default function FAQs({ onBack }: { onBack: () => void }) {
    return (
        <Box
        sx={{
            maxWidth: 360,
            mx: 'auto',
            height: '100vh',
            bgcolor: '#fff',
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 2,
        }}
        >
        <AppBar position="static" color="inherit"   elevation={0}>
            <Toolbar sx={{justifyContent: 'center', borderBottom: '1px solid #EFEFEF'}}>
            <IconButton edge="start" sx={{position: 'absolute', left: '1rem', top: '0.75rem'}} onClick={onBack}>
                <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
                FAQs
            </Typography>
            </Toolbar>
        </AppBar>

        <Container  sx={{ py: 2, textAlign: 'left'     }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            What can moderators do during my LIVE?
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
            Moderators can manage your comment settings, your muted and blocked account lists, and more.
            </Typography>

            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            How do I add moderators?
            </Typography>
            <Typography variant="body2" color="text.secondary">
            • Before LIVE: GO to Settings {'>'} Moderators {'>'} Add moderators
            <br />
            • During LIVE: Go to Admin settings {'>'} Moderators {'>'} Add moderators
            <br />
            • During LIVE: Tap a viewer&apos;s username {'>'} Manage {'>'} Add moderators
            </Typography>

            <Box mt={3}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Can I manage access for each moderator?
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Yes, you can either add or remove access for each moderator. Each moderator needs to have at least one fundamental or advanced access.
            </Typography>
            </Box>
        </Container>
        </Box>
    );
    }
