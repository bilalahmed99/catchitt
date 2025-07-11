import React, { useEffect, useState } from 'react';
import style from './select-profile-img.scss';
import { Box, Modal, Button } from '@mui/material';
import { defaultAvatar } from '../../../icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import CoverCropbox from './cover-cropbox';
import settingsIcon from '../svg-components/cross-light-icon.svg';

const CoverImagePopup = ({ open, onCancel, onSelect }: any) => {

    const [darkTheme, setdarkTheme] = useState(false);
        useEffect(() => {
            var themeColor = window.localStorage.getItem('theme');
    
            if(themeColor == "dark"){ 
                setdarkTheme(true);
            }else{
                setdarkTheme(false);
            }
        });
    const [imgBase64, setImgBase64] = useState('');
    const onImageCropped = (img: string) => {
        onSelect(img);
    };

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
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={popupStyle}>
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
                    <CoverCropbox onChangeImage={onImageCropped} />
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <Button variant="contained" sx={secondaryBtn} onClick={onCancel}>
                            {t('Cancel')}
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default CoverImagePopup;

const popupStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    width: '359px',
    minHeight: '342px',
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
