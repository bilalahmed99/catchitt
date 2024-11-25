import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import style from './popupForEditVideo.module.scss';
import { EDIT_VIDEO_ACTIONS } from '../../../utils/constants';
import SoundGallery from '../components/soundGallery';
import { leftArrowCurved, leftArrowCurvedinWhite, pause, play, rightArrowCurved, rightArrowCurvedinWhite } from '../../../icons';
import ReactSlider from "react-slider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function PopupForEditVideo({ isDarkTheme, open, targetVideo, handleClose }: any) {

  const [selectedActionIndex, setSelectedActionIndex] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [volume, setVolume] = useState(50);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioTabSelected, setAudioTabSelected] = useState('Recommended');
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  }

  const switchAudioTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    setAudioTabSelected((e.target as HTMLHeadingElement).id)
  }

  const getMediaInfo = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setVideoDuration((event.target as HTMLVideoElement).duration || 0);
  }

  const getCurrentTime = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setVideoCurrentTime((event.target as HTMLVideoElement).currentTime || 0);
  }

  const togglePlayback = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!videoRef.current) return;
    if (videoRef.current?.paused) {
      (event.target as HTMLImageElement).src = pause;
      videoRef.current?.play();
    } else {
      (event.target as HTMLImageElement).src = play;
      videoRef.current?.pause();
    }
  }

  useEffect(() => {
    console.log('PopupForEditVideo mounted', targetVideo);
    // targetVideo is in blob format and needs to get duration and currentTime

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
                  <h3 onClick={switchAudioTab} id='Recommended' className={`${style.audioTab} ${audioTabSelected === 'Recommended' ? style.audioTabSelected : ''}`}>Recommended</h3>
                  <h3 onClick={switchAudioTab} id='Favorites' className={`${style.audioTab} ${audioTabSelected === 'Favorites' ? style.audioTabSelected : ''}`}>Favorites</h3>
                </div>
                <SoundGallery />
              </div>
              {/* RIGHT VIDEO CONTAINER */}
              <div className={style.videoContainer}>
                <video ref={videoRef} onLoadedMetadata={getMediaInfo} onTimeUpdate={getCurrentTime} controls src={targetVideo} style={{ width: '200px', height: '355px' }} />
              </div>

            </div>
            <div className={style.videoControlBar}>
              <div className={style.prevNextArrows}>
                <img src={isDarkTheme ? leftArrowCurvedinWhite : leftArrowCurved} alt="left-arrow-curved" />
                <img src={isDarkTheme ? rightArrowCurvedinWhite : rightArrowCurved} alt="left-arrow-curved" />
              </div>
              <div className="flex items-center justify-between">
                <img onClick={togglePlayback} src={play} alt="play" className='mx-2' />
                <span>{formatTime(videoCurrentTime)}</span> &nbsp; / &nbsp;<span>{formatTime(videoDuration)}</span>
              </div>
              <div className="flex items-center">
                {/* <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={50}
                  // onChange={handleVolumeChange}
                  className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                /> */}
                <div className="flex flex-col items-center justify-center">
                  {/* <label className="mb-4 text-lg font-medium text-gray-700">
                    Volume: <span className="font-bold">{volume}</span>%
                  </label> */}
                  <ReactSlider
                    className="w-64 h-2 bg-gray-200 rounded-lg"
                    thumbClassName="h-4 w-4 bg-blue-500 rounded-full cursor-pointer focus:outline-none"
                    trackClassName="bg-blue-200"
                    value={volume}
                    onChange={(value) => setVolume(value)}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </BootstrapDialog>
    </ThemeProvider>
  )
}

export default PopupForEditVideo