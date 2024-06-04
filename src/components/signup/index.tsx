import { useEffect } from 'react';

// import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';
// import { SideNavBar } from '../side-nav-bar/side-nav-bar';
// import { SuggestedActivity } from '../suggested-activity/suggested-activity';
// import { TopBar } from '../top-bar/top-bar';

// import IconButton from '@mui/material/IconButton/IconButton';
// import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';


import { Button, Typography, Box } from '@mui/material';
import { AccountCircle, Facebook, Google } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export interface SignupeProps {
    className?: string;
}

export const Signup = ({ className }: SignupeProps) => {
    // const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    // const token = useAuthStore((state) => state.token);
    // const navigate = useNavigate();

    // const handleGoBack = () => {
    //     navigate('/settings/account'); // Navigate back to the previous page
    //     setIndex(4);
    //     setSettingsDropdown(true);
    // };

    // useEffect(() => {
    //     setIndex(7);
    //     setSettingsDropdown(true);
    // }, []);

    return (
        <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.paper"
    >
      <img src="path/to/tiktok-logo.png" alt="TikTok Logo" style={{ marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>
        Sign up for TikTok
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Create a profile, follow other accounts, make your own videos, and more.
      </Typography>
      <Button
        variant="outlined"
        startIcon={<AccountCircle />}
        style={{ margin: '10px 0', width: '250px' }}
      >
        Use phone or email
      </Button>
      <Button
        variant="outlined"
        startIcon={<Facebook />}
        style={{ margin: '10px 0', width: '250px' }}
      >
        Continue with Facebook
      </Button>
      <Button
        variant="outlined"
        startIcon={<Google />}
        style={{ margin: '10px 0', width: '250px' }}
      >
        Continue with Google
      </Button>
      <Typography variant="caption" display="block" gutterBottom>
        By continuing with an account located in <strong>Pakistan</strong>, you agree to our{' '}
        <Link to="/terms">Terms of Service</Link> and acknowledge that you have read our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </Typography>
      <Typography variant="body2">
        Already have an account? <Link to="/login" style={{ color: 'red' }}>Log in</Link>
      </Typography>
    </Box>
    );
};

export default Signup;
