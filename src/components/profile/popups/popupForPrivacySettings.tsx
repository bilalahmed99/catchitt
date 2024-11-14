import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, styled, Switch, SwitchProps, Typography } from '@mui/material';
import styles from './popupPrivacySettings.module.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));

function PopupForPrivacySettings({ isPrivacyModalOpened, setIsPrivacyModalOpened }: any) {
    const handleClose = () => setIsPrivacyModalOpened(false);
    const [videoPrivilege, setVideoPrivilege] = React.useState('everyone');

    const handleChange = (event: SelectChangeEvent) => {
        setVideoPrivilege(event.target.value as string);
    };

    return (
        <Modal
            open={isPrivacyModalOpened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.darkTheme}
        >
            <Box sx={style}>
                <div className='p-4'>
                    <Typography className='text-center mb-2 ' id="modal-modal-title" variant="h6" component="h2">
                        Privacy settings
                    </Typography>
                    <span className='text-left'>Who can watch this video</span>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={videoPrivilege}
                            onChange={handleChange}
                        >
                            <MenuItem value='everyone' defaultChecked>everyone</MenuItem>
                            <MenuItem value='only me'>only me</MenuItem>
                            <MenuItem value='friends'>friends</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='flex justify-between items-center mb-1 mt-2'>
                        <span className=''>Allow comments</span>
                        <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>
                    <div className='flex justify-between items-center my-1'>
                        <span className=''>Allow Duet</span>
                        <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>
                    <div className='flex justify-between items-center mt-1'>
                        <span className=''>Allow Stitch</span>
                        <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>
                    <span className='text-xs opacity-50 '>Duet and Stitch aren't available on videos from private accounts</span>
                </div>
                <hr />
                <div className='text-center'><button onClick={()=>setIsPrivacyModalOpened(false)} className='border-none mb-1'>Done</button></div>
            </Box>
        </Modal>
    )
}

export default PopupForPrivacySettings