// CreateStoryPopup.tsx
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import React from 'react';
import AddIcon from '../svg-components/AddIcon';
import style from './create-story-popup.module.scss';
import settingsIcon from '../svg-components/cross-light-icon.svg';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

interface CreateStoryPopupProps {
  open: boolean;
  onCancel: () => void;
  onSelect: () => void;
}

const CreateStoryPopup: React.FC<CreateStoryPopupProps> = ({ open, onCancel, onSelect }) => {
    const [darkTheme, setdarkTheme] = useState(false);
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if(themeColor == "dark"){ 
            setdarkTheme(true);
        }else{
            setdarkTheme(false);
        }
    });

    interface Languages {
            code: string;
            name: string;
            country_code: string;
    }
        
  const languages: Languages[] = [
      {
          code: 'en',
          name: 'English',
          country_code: 'gb',
      },
      {
          code: 'ar',
          name: 'العربية',
          country_code: 'sa',
      },
  ];

  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t, i18n } = useTranslation();

    return (
        <div>
            <Modal
                open={open}
                onClose={onCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={darkTheme ? popupDarkStyle : popupStyle}>
                    <div
                        onClick={onCancel}
                       
                        >                    
                        <img className='h-8 w-8 object-contain cursor-pointer absolute top-2 right-2 rounded-full bg-[#54545480]'
                                                src={settingsIcon} alt="" /> 
                                                                        
                        </div>
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
                            {t('Create New Story')}
                        </button>
                        <button onClick={onCancel} style={{ ...secondaryBtn, textTransform: 'none' }}>{t('Cancel')}</button>
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

const popupDarkStyle = {
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
    background: 'rgb(18, 18, 18)',
    color: 'white',
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
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none !important'
};

var secondaryBtn = {
    ...filledButton, 
    color: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    background: 'white',
    border: '1px solid var(--foundation-primary-primary-500, rgb(255, 59, 92))'

}