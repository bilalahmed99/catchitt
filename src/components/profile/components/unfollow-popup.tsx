import React, { useState } from 'react';
import styles from './unfollow-popup-module.scss';
import { Box, Modal, Button } from '@mui/material';
import { defaultAvatar } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { followingsMethod, refreshFollowing, loadFollowing, loadFollowers, getProfileData } from '../../../redux/AsyncFuncs';


const API_KEY = process.env.VITE_API_URL;
const UnfollowPopup = ({ openUnfollowPopup, onUnfollow, onCancel, user, description, heading, btnText,IsFollowerTab, removeCurrentUser }: any) => {
    console.log('UnfollowPopup');
    console.log('selectd user', user);
    console.log(user?.follower_userID);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state?.reducers?.profile);
    console.log('profile', profile);
    const loggedInUserId = localStorage.getItem('userId');
    console.log('loggedInUserId', loggedInUserId);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(btnText? btnText:'Unfollow');

    const BlockUser = async () => {
        if (loading) return; // Prevent further execution if already in loading state
        setLoading(true); // Set loading state to true to indicate progress
        try {
            const API_KEY = process.env.VITE_API_URL;
            const token = localStorage.getItem('token');
            let accountId = user?.follower_userID?._id;
            if(!accountId){
                 accountId = user?.followed_userID?._id;
            }
            const response = await fetch(`${API_KEY}/profile/${accountId}/block`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: accountId }),
            });
            const res = await response.json();
            setLoading(false);
            dispatch(refreshFollowing());
            dispatch(getProfileData());
            onCancel();
            //  dispatch(followingsMethod(accountId)).then(() => {
            //     dispatch(refreshFollowing());
            //     dispatch(loadFollowing(1));
            //     dispatch(loadFollowers(1));
            // });
            removeCurrentUser();
        } catch (error) {
            setLoading(false);
            console.error('Error during BlockUser action:', error);
        } finally {
            setLoading(false); // Reset loading state after the function completes
        }
    };
    

    const handleFollowClick = async () => {
        setLoading(true);

        const accountId = user?.followed_userID?._id;
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch(`${API_KEY}/profile/follow/${accountId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle success as needed
                    // Update the followedAccounts state
                    text == 'Unfollow' ? setText('Follow') : setText('Unfollow');
                    setLoading(false);
                    dispatch(refreshFollowing());
                    dispatch(getProfileData());
                    onCancel();
                    // dispatch(followingsMethod(accountId)).then(() => {
                    //     dispatch(refreshFollowing());
                    //     dispatch(loadFollowing(1));
                    //     dispatch(loadFollowers(1));
                    // });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                // Handle error as needed
                setLoading(false);
                console.log(error);
            }
        }
    };
    
    return (
        <Modal
            open={openUnfollowPopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={CustomSuccessPaymentModalStyle}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '342px',
                        padding: '10px',
                    }}
                >
                    <img
                        style={{
                            height: '100px',
                            width: '100px',
                            borderRadius: '50%',
                        }}
                        srcSet={IsFollowerTab  ? (user?.follower_userID?.avatar || defaultAvatar) : (user?.followed_userID?.avatar || defaultAvatar)}
                        alt=""
                    />
                    {heading && <h4 className='text-black pt-3'>{heading}</h4>}
                    <p
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        {description ? description : `If you changed your mind, you will have to request to follow ${user?.followed_userID?.name} again.`}
                        
                    </p>

                    {IsFollowerTab &&  <Button
                        variant="contained"
                        sx={filledButton}
                        onClick={BlockUser}
                        disabled={loading} // Disable button while loading to prevent multiple clicks
                    >
                        {loading ? '...' : text}
                    </Button>}


                    {!IsFollowerTab && <Button
                        variant="contained"
                        sx={filledButton}
                        onClick={handleFollowClick}
                        // disabled={notAcceptable}
                    >
                        {loading ? '...' : text}
                    </Button>
                    }


                    <Button
                        variant="contained"
                        sx={secondaryBtn}
                        onClick={onCancel}
                        // disabled={notAcceptable}
                    >
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

const CustomSuccessPaymentModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    width: 359,
    minHeight: 342,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

var filledButton = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '100% !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '6px !important',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none !important',
};

var secondaryBtn = {
    ...filledButton,
    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))',
};
export default UnfollowPopup;
