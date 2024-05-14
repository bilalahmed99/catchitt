// CreateStoryPopup.tsx
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import React from 'react';
import AddIcon from '../svg-components/AddIcon';
import style from './create-story-popup.module.scss';
interface CreateStoryPopupProps {
  open: boolean;
  onCancel: () => void;
  onSelect: () => void;
}

const CreateStoryPopup: React.FC<CreateStoryPopupProps> = ({ open, onCancel, onSelect }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={popupStyle}>
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
                        <button onClick={onSelect} className={style.createStoryButton}>
                            <AddIcon />
                            Create New Story
                        </button>
                        <button onClick={onCancel} style={{ ...secondaryBtn, textTransform: 'none' }}>Cancel</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateStoryPopup

const popupStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    
    borderRadius: '8px',
    width: '459px',
    height: '282px',
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}



var filledButton = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '100% !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '50% !important',
    background: 'var(--foundation-primary-primary-500, #5448B2) !important',
    textTransform: 'none !important'
};

var secondaryBtn = {
    ...filledButton, 
    color: 'var(--foundation-primary-primary-500, #5448B2) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, #5448B2)'

}