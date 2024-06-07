import { toast } from 'react-toastify';
import {
    qrCodeAuth,
    emailOrPhone,
    facebookAuth,
    googleAuth,
    twitterAuth,
    appleAuth,
} from '../icons';

export const API_KEY = process.env.VITE_API_URL;

export const uploadCategories = [
    '📷 People and Blogs',
    '✈ Travel and Events',
    '🎬 Film and Animation',
    '⚽ Sports',
    '🎵 Music',
    '💻 Science and Technology',
    '🎮 Gaming',
    '🚘 Autos and Vehicles',
    '😂 Comedy',
];

export const UPLOAD_VIDEO_DETAILS = `${API_KEY}/media-content/directly-from-s3`;
export const getVideoCategoriesEndPoind = '/media-content/categories';

export const showToast = (toastMessage: string) => {
    toast.success(`🎉${toastMessage}`, {
        position: 'bottom-right', // Set the position (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left)
        autoClose: 2000, // Set the auto-close duration in milliseconds (e.g., 2000ms = 2 seconds)
    });
};

export const LOGIN_OPTIONS = [
    {
        styles: '',
        name: 'Use QR Code',
        image: qrCodeAuth,
    },
    {
        styles: 'mt-3',
        name: 'Use phone / email / username',
        image: emailOrPhone,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Facebook',
        image: facebookAuth,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Google',
        image: googleAuth,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Twitter',
        image: twitterAuth,
    },
    {
        styles: 'mt-3',
        name: 'Continue with Apple',
        image: appleAuth,
    },
];

export const APP_TEXTS = {
    FEEDBACK: 'Feedback and help',
    LOGIN_SUBTEXT: 'Manage your account, check notifications, comment on videos, and more.',
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP: 'Sign up',
};
