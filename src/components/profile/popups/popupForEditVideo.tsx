import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS } from '../../../utils/constants';
import ReactPlayer from 'react-player';
import SoundGallery from '../components/soundGallery';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const audioCollection = [
  {
    title: 'Cool Vibes',
    url: 'https://example.com/audio/cool-vibes.mp3',
    duration: '00:15',
  },
  {
    title: 'Uplifting Tune',
    url: 'https://example.com/audio/uplifting-tune.mp3',
    duration: '00:20',
  },
  {
    title: 'Chill Background',
    url: 'https://example.com/audio/chill-background.mp3',
    duration: '00:18',
  },
];

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

  const [selectedActionIndex, setSelectedActionIndex] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioTabSelected, setAudioTabSelected] = useState('Recommended');

  const lightThemePalette = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkThemePalette = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const switchAudioTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    setAudioTabSelected((e.target as HTMLHeadingElement).id)
  }

  useEffect(() => {
    console.log('PopupForEditVideo mounted', targetVideo)
  }, [targetVideo])


  return (
    <ThemeProvider theme={isDarkTheme ? darkThemePalette : lightThemePalette}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            width: '900px',
            maxWidth: '90%',
            borderRadius: '10px',
          },
        }}
      >
        <div className={style.EditModal}>
          <div className={`${style.modalHeader} border-b border-gray-200`} >
            <span className={style.modalTitle}>Edit Video</span>
            <button className={style.closeIcon} onClick={handleClose}>X</button>
          </div>
          <div className={style.modalBody}>
            <div className={`${style.content} border-b border-gray-200`}>
              {/* LEFT ACTION BAR */}
              <div className={`${style.actions} border-r border-gray-200`}>
                {EDIT_VIDEO_ACTIONS.map((action, index) => (
                  <div className='p-2 text-center'>
                    <img className='m-auto' src={action.icon} alt="music" />
                    <span className='text-sm'>{action.title}</span>
                  </div>
                ))}

              </div>
                {/* RECOMENDETION CONTAINER */}
              <div className={`${style.recommendedContainer} border-r border-gray-200 overflow-y-auto`}>
                <div className={style.audioTabs}>
                  <h3 onClick={switchAudioTab} id='Recommended' className={`${style.audioTab} ${audioTabSelected === 'Recommended'?style.audioTabSelected:''}`}>Recommended</h3>
                  <h3 onClick={switchAudioTab} id='Favorites' className={`${style.audioTab} ${audioTabSelected === 'Favorites'?style.audioTabSelected:''}`}>Favorites</h3>
                </div>
                <SoundGallery />
              </div>
              {/* RIGHT VIDEO CONTAINER */}
              <div className={style.videoContainer}>
                <video controls src={targetVideo} style={{ width: '200px', height: '355px' }} />
              </div>

            </div>
              <div className={style.bottomActionBar}>
                  <div className={style.actionBtn}>
                    <img src='/icons/plus.svg' alt="add" />
                    <span>Add</span>
                  </div>
              </div>
          </div>
        </div>

      </BootstrapDialog>
    </ThemeProvider>
  )
}

export default PopupForEditVideo