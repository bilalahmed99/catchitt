import CustomButton from '../../../shared/buttons/CustomButton';
import CustomPlayer from '../../homePage/components/CustomPlayer';
import style from '../styles.module.scss';
import CustomPopup from '../../../shared/popups/CustomPopup';
import React from 'react';
import { useRef } from 'react';
import PopupForEditVideo from '../../profile/popups/popupForEditVideo';
import { Tabs, Tab, Box, Paper, Typography, IconButton, Grid, Avatar, BottomNavigation, BottomNavigationAction, } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SearchIcon from '@mui/icons-material/Search';
import { defaultAvatar, music, musicBlack, shareInHome } from '../../../icons';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


function FormLeftSide({ selectedVideoSrc, selectFilesHandler, darkTheme, videoInfo,state }: any) {
    const [replaceVideoPopup, setReplaceVideoPopup] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [value, setValue] = React.useState(1); // Default: Profile

     let isEditMode = false;
      const { id: postId } = useParams(); 
      if(postId) {
          isEditMode = true;
      }

    const profileImg = useSelector((state: any) => state?.reducers?.profile?.avatar);
    const name = useSelector((state: any) => state?.reducers?.profile?.name);
    const userName = useSelector((state: any) => state?.reducers?.profile?.username);
    const coverImg = useSelector((state: any) => state?.reducers?.profile?.cover);

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);


    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
      if (videoRef.current) {
          if (videoRef.current.paused) {
              videoRef.current.play();
              setIsPlaying(true);
          } else {
              videoRef.current.pause();
              setIsPlaying(false);
          }
      }
  };

  const enterFullscreen = () => {
    if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    }
};

const toggleMute = () => {
  if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
  }
};

const handleTimeUpdate = () => {
  const video = videoRef.current;
  if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
  }
};

const handleLoadedMetadata = () => {
  if (videoRef.current) {
      setDuration(videoRef.current.duration);
  }
};

const handleSeek = (e) => {
  if (!videoRef.current) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const seekTime = (clickX / rect.width) * videoRef.current.duration;

  videoRef.current.currentTime = seekTime;
  setProgress((seekTime / videoRef.current.duration) * 100);
};

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
    const MyIcon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56734 1.41797L9.91921 7.83105L14.2711 1.41797C14.734 1.74634 15.458 2.72353 14.6667 3.98953C14.6667 3.98953 12.2771 7.82314 11.1694 9.67466L12.6886 11.9099C14.1524 10.8141 16.178 11.4075 17.2699 12.8911C18.3777 14.3945 18.3856 16.6139 16.9139 17.7771C15.4382 18.9402 13.377 18.3507 12.2653 16.8473C11.4661 15.7633 11.2366 14.3074 11.7272 13.1443L9.91921 10.5173L8.11516 13.1443C8.60178 14.3074 8.37627 15.7594 7.57315 16.8434C6.46145 18.3507 4.39233 18.9402 2.91665 17.7771C1.43701 16.6139 1.44492 14.3984 2.56059 12.8951C3.65251 11.4115 5.67811 10.8141 7.14984 11.9099L8.66904 9.67466C7.51594 7.77185 6.35014 5.87676 5.17171 3.98953C4.38046 2.72353 5.10445 1.74634 5.56734 1.41797ZM13.559 13.2353C12.9576 13.71 12.7677 14.8574 13.5075 15.8662C14.2473 16.8711 15.367 16.9819 15.9723 16.5032C16.5776 16.0284 16.7714 14.8811 16.0277 13.8722C15.2878 12.8674 14.1682 12.7566 13.5629 13.2353H13.559ZM6.2755 13.2353C5.66624 12.7526 4.54267 12.8674 3.79889 13.8722C3.05907 14.8771 3.24502 16.0244 3.85428 16.5032C4.46354 16.9858 5.58712 16.8711 6.33089 15.8662C7.07467 14.8613 6.88477 13.714 6.2755 13.2353Z" fill="black"/>
        </svg>

      );
    return (
        // <div className="flex-[0.6] p-[2.5rem] flex flex-col gap-[1rem]">
           <div className="flex-[0.6] pt-[2.85rem] flex flex-col gap-[1rem]">
            {/* <p className="text-start text-[1.25rem] font-semibold leading-[1.5rem] text-custom-dark-222">
                Upload video
            </p>
            <p className="text-start text-[1rem] font-medium leading-[1.25rem] text-custom-color-999">
                Post a video to your account
            </p> */}

        <Paper
        elevation={0}
        sx={{
          display: "flex",
          backgroundColor: "#0000000D",
          borderRadius: "8px",
          overflow: "hidden",
          width: "fit-content",
           height: '2.21rem',
          mx: "auto", // center horizontally
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1,
              minHeight: "unset",
              borderRadius: "8px",
              color: "#333",
            },
            "& .Mui-selected": {
              backgroundColor: "#fff",
              color: "#333 !important",

            },
          }}
        >
          <Tab label="Feed" value={0} />
          <Tab label="Profile" value={1} />
          <Tab label="Web/TV" value={2} />
        </Tabs>
        </Paper>




      {value === 0 && (
            // <div
            //     className={`mx-auto md:mx-0 w-[17.5rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}
            // >
            //     <CustomPlayer src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} />
            // </div>

             <div className={`mx-auto relative md:mx-0 h-[36rem] w-[18rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}>
                <Box sx={{ color: 'white', width: '100%', px: 1, pt: 0, pb: 0.5, position: 'absolute', top: '0', zIndex: '1' }}>
                    {/* Top status bar */}
                    <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-black/75 to-transparent z-[-1]" />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>8:00</Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <SignalCellularAltIcon sx={{ fontSize: '0.85rem' }} />
                        <WifiIcon sx={{ fontSize: '0.85rem' }} />
                        <BatteryFullIcon sx={{ fontSize: '0.85rem' }} />
                      </Box>
                    </Box>

                    {/* Navigation row */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      {/* LIVE badge */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid white',
                          borderRadius: '4px',
                          px: 0.8,
                          py: 0.2,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                        }}
                      >
                        LIVE
                      </Box>

                      {/* Centered tabs */}
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: '0.85rem',
                            color: '#888',
                            fontWeight: 500,
                          }}
                        >
                          Following
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography
                            sx={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: 'white',
                            }}
                          >
                            For You
                          </Typography>
                          <Box
                            sx={{
                              height: 2,
                              width: '100%',
                              backgroundColor: 'white',
                              borderRadius: 1,
                              mt: '2px',
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Search icon */}
                      <SearchIcon sx={{ fontSize: '1.2rem' }} />
                    </Box>
                  </Box>
                <video
                    className=" w-full rounded-t-md object-cover"
                    loop={true}
                    controls={false}
                    autoPlay={true}
                    preload="auto"
                    playsInline
                    ref={videoRef}
                    onClick={handleVideoClick}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}    
                    src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl}
                />

                <div className='absolute bottom-1 px-3 w-full left-0 z-10'>
                  {/* Fading overlay: black at bottom → transparent upward */}
                  <div className="absolute bottom-0 left-0 w-full h-[200%] bg-gradient-to-t from-black/75 to-transparent z-[-1]" />

                  {/* Controls */}
                  <div
                    className="w-full h-[2px] bg-gray-400 cursor-pointer"
                    onClick={handleSeek}
                    onMouseDown={() => setIsSeeking(true)}
                    onMouseUp={() => setIsSeeking(false)}
                  >
                    <div
                      className="h-full bg-white"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="z-10 flex justify-between my-1">
                    <div className='flex'>
                      <button
                        onClick={togglePlayPause}
                        className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                      >
                        {isPlaying ? <PauseIcon sx={{ color: '#fff' }} fontSize="small" /> : <PlayArrowIcon sx={{ color: '#fff' }} fontSize="small" />}
                      </button>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={toggleMute}
                        className="btn p-0.5 rounded flex items-center gap-1 hover:bg-gray-500"
                      >
                        {isMuted ? <VolumeOffIcon sx={{ color: '#fff' }} fontSize="small" /> : <VolumeUpIcon sx={{ color: '#fff' }} fontSize="small" />}
                      </button>
                      <button
                        onClick={enterFullscreen}
                        className="btn p-0.5 rounded flex items-center hover:bg-gray-500"
                      >
                        <FullscreenIcon sx={{ color: '#fff' }} fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute z-10 left-1 bottom-12 text-left px-1 py-2">
                    <p className="font-medium text-[0.8rem] text-white">@{name}</p>
                    <p className="font-medium text-[0.6rem] text-white mt-[0.2rem]">
                        {state.category.name?.length > 50
                            ? `${state.category.name?.slice(0, 60)}... See more`
                            : state.category.name}
                    </p>
                    <div className="mt-[0.1rem] flex gap-1 leading-3" >
                        {/* <img
                            className={`w-2.5 h-2.5 object-contain inline-block mr-1 invert-1`}
                            src={musicBlack}
                            alt="music-icon"
                        /> */}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.9258 1.27234V7.48067C8.9258 7.76911 8.84027 8.05106 8.68003 8.29088C8.51978 8.5307 8.29202 8.71762 8.02555 8.828C7.75907 8.93838 7.46585 8.96726 7.18296 8.91099C6.90007 8.85472 6.64022 8.71582 6.43627 8.51187C6.23232 8.30792 6.09343 8.04807 6.03716 7.76518C5.98089 7.48229 6.00977 7.18907 6.12014 6.9226C6.23052 6.65612 6.41744 6.42836 6.65726 6.26812C6.89708 6.10787 7.17904 6.02234 7.46747 6.02234H8.21747V2.36401L4.13414 2.89526V8.10567C4.13414 8.39411 4.04861 8.67606 3.88836 8.91588C3.72812 9.1557 3.50036 9.34262 3.23388 9.453C2.96741 9.56338 2.67418 9.59226 2.3913 9.53599C2.10841 9.47972 1.84856 9.34082 1.6446 9.13687C1.44065 8.93292 1.30176 8.67307 1.24549 8.39018C1.18922 8.10729 1.2181 7.81407 1.32848 7.5476C1.43886 7.28112 1.62577 7.05336 1.8656 6.89312C2.10542 6.73287 2.38737 6.64734 2.6758 6.64734H3.4258V1.93901C3.42537 1.88814 3.44356 1.83888 3.47695 1.8005C3.51034 1.76212 3.55662 1.73729 3.60705 1.73068L8.69039 1.06818C8.71993 1.0643 8.74996 1.06681 8.77845 1.07553C8.80694 1.08425 8.83323 1.09898 8.85554 1.11872C8.87786 1.13847 8.89567 1.16277 8.90779 1.18999C8.91991 1.21721 8.92605 1.24671 8.9258 1.27651V1.27234Z" fill="white"/>
                          </svg>

                        <span className="font-normal text-white text-[0.6rem]">
                            {userName}
                        </span>
                    </div>
                </div>
                <div className="absolute z-20 flex flex-col justify-between items-center gap-2.5 bottom-24 right-2 w-10 text-white">
                    {/* Video next and previous */}
                    <div className="text-center flex flex-col justify-between items-center gap-3 rounded-full px-2">
                        {/* <img
                            className="h-5 w-5 object-contain cursor-pointer"
                            src={chevronUpIconVideo}
                        /> */}
                        <div className={style.DivAvatarActionItemContainer}>
                            <a
                                className="e1g2yhv83 css-1w9wqra-StyledLink-AvatarLink er1vbsz0"
                                href="#"
                            >
                                <div
                                    className={style.AvatarDivContainer}
                                    style={{ width: '35px', height: '35px'}}
                                >
                                    <span
                                        className={style.SpanAvatarContainer}
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%' 
                                        }}
                                    >
                                        <img
                                            loading="lazy"
                                            alt="sherjangkhan5"
                                            src={ profileImg ||
                                                defaultAvatar
                                            }
                                            style={{
                                              width: '35px',
                                              height: '35px',
                                              borderRadius: '50%' 
                                          }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                            }}
                                            className="css-1zpj2q-ImgAvatar e1e9er4e1"
                                        />
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.122131 5.87316V5.667C0.122131 3.18241 1.91786 1.06322 4.36619 0.655167C5.95505 0.385382 7.63632 0.913578 8.79508 2.07412L9.22162 2.49995L9.61617 2.07412C10.8069 0.913578 12.4562 0.385382 14.0771 0.655167C16.5261 1.06322 18.3211 3.18241 18.3211 5.667V5.87316C18.3211 7.34827 17.7097 8.7594 16.6292 9.76532L10.2062 15.7617C9.93963 16.0106 9.58774 16.1492 9.22162 16.1492C8.85551 16.1492 8.50362 16.0106 8.23703 15.7617L1.81371 9.76532C0.73457 8.7594 0.122142 7.34827 0.122142 5.87316H0.122131Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.36465 0.621094C4.33861 0.621094 0.297153 4.03134 0.297153 8.23847C0.297153 10.0557 1.05604 11.7168 2.32215 13.025C1.87783 14.8696 0.393125 16.5139 0.375352 16.5323C0.295376 16.6147 0.273161 16.7422 0.322035 16.8521C0.36643 16.962 0.464961 17.0267 0.580482 17.0267C2.93533 17.0267 4.6717 15.8635 5.57809 15.1447C6.73792 15.5933 8.0314 15.8548 9.39561 15.8548C14.4217 15.8548 18.4631 12.4441 18.4631 8.27033C18.4631 4.09652 14.3907 0.621094 9.36465 0.621094ZM4.78292 9.41038C4.152 9.41038 3.64548 8.88851 3.64548 8.27143C3.64548 7.65435 4.152 7.09953 4.78292 7.09953C5.41384 7.09953 5.92036 7.62139 5.92036 8.27143C5.92036 8.92147 5.44405 9.41038 4.78292 9.41038ZM9.36465 9.41038C8.73373 9.41038 8.25921 8.88851 8.25921 8.27143C8.25921 7.65435 8.76572 7.09953 9.36465 7.09953C9.96359 7.09953 10.4701 7.62139 10.4701 8.27143C10.4701 8.92147 9.99735 9.41038 9.36465 9.41038ZM13.8824 9.41038C13.2515 9.41038 12.745 8.88851 12.745 8.27143C12.745 7.65435 13.2515 7.09953 13.8824 7.09953C14.5133 7.09953 15.0198 7.62139 15.0198 8.27143C15.0198 8.92147 14.5435 9.41038 13.8824 9.41038Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.1169 0.601562C12.4502 0.601562 14.3358 1.52308 14.3616 3.86564V16.9392C14.3616 17.0856 14.3272 17.232 14.2583 17.3612C14.1464 17.5679 13.957 17.7229 13.7245 17.7918C13.5006 17.8607 13.2509 17.8263 13.0443 17.7057L7.46499 14.9153L1.87708 17.7057C1.74879 17.7737 1.60156 17.8176 1.45519 17.8176C0.973023 17.8176 0.585571 17.4215 0.585571 16.9392V3.86564C0.585571 1.52308 2.47978 0.601562 4.80449 0.601562H10.1169ZM10.7024 5.80342H4.21901C3.84878 5.80342 3.54743 6.10485 3.54743 6.4838C3.54743 6.86188 3.84878 7.16417 4.21901 7.16417H10.7024C11.0726 7.16417 11.374 6.86188 11.374 6.4838C11.374 6.10485 11.0726 5.80342 10.7024 5.80342Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                    <div className='text-center flex flex-col justify-center'>
                      <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.1693 7.54699L11.9134 12.9178C11.3667 13.3906 10.5026 13.0083 10.5026 12.2723V9.1785C4.98924 9.2567 2.61342 10.6252 4.22502 15.7792C4.40385 16.3511 3.71282 16.7944 3.22763 16.441C1.67254 15.31 0.26532 13.1489 0.26532 10.9629C0.26532 5.55292 4.79374 4.40838 10.5022 4.34084V1.49796C10.5022 0.76325 11.3653 0.37972 11.913 0.852467L18.1689 6.2233C18.5638 6.59439 18.5638 7.20576 18.1693 7.54699Z" fill="white"/>
                      </svg>
                      <span className='text-[11px]'>128k</span>
                    </div>
                </div>
                <div className='absolute left-0 bottom-0 w-100'>
                  <svg style={{width: '100%'}} height="50" viewBox="0 0 259 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.697998 0H258.87V49.4629H0.697998V0Z" fill="#0F0F0F"/>
                    <rect x="122.545" y="16.2891" width="14.4769" height="13.2705" fill="white"/>
                    <path d="M136.009 10.8594C140.11 10.8594 142.451 13.1757 142.451 17.2896V28.5574C142.451 32.6472 140.122 34.9876 136.021 34.9876H124.753C120.639 34.9876 118.323 32.6472 118.323 28.5574V17.2896C118.323 13.1757 120.639 10.8594 124.753 10.8594H136.009ZM130.375 17.5067C129.82 17.5067 129.373 17.9531 129.373 18.508V21.9101H125.959C125.694 21.9101 125.44 22.0187 125.247 22.1996C125.066 22.3927 124.958 22.6448 124.958 22.9114C124.958 23.4664 125.404 23.9128 125.959 23.9248H129.373V27.339C129.373 27.8939 129.82 28.3403 130.375 28.3403C130.93 28.3403 131.376 27.8939 131.376 27.339V23.9248H134.802C135.357 23.9128 135.803 23.4664 135.803 22.9114C135.803 22.3565 135.357 21.9101 134.802 21.9101H131.376V18.508C131.376 17.9531 130.93 17.5067 130.375 17.5067Z" fill="white"/>
                    <path d="M135.405 10.8594C139.507 10.8594 141.848 13.1757 141.848 17.2896V28.5574C141.848 32.6472 139.519 34.9876 135.417 34.9876H124.15C120.036 34.9876 117.719 32.6472 117.719 28.5574V17.2896C117.719 13.1757 120.036 10.8594 124.15 10.8594H135.405ZM129.771 17.5067C129.216 17.5067 128.77 17.9531 128.77 18.508V21.9101H125.356C125.091 21.9101 124.837 22.0187 124.644 22.1996C124.463 22.3927 124.355 22.6448 124.355 22.9114C124.355 23.4664 124.801 23.9128 125.356 23.9248H128.77V27.339C128.77 27.8939 129.216 28.3403 129.771 28.3403C130.326 28.3403 130.773 27.8939 130.773 27.339V23.9248H134.199C134.754 23.9128 135.2 23.4664 135.2 22.9114C135.2 22.3565 134.754 21.9101 134.199 21.9101H130.773V18.508C130.773 17.9531 130.326 17.5067 129.771 17.5067Z" fill="#FF2C55"/>
                    <path d="M31.8978 10.4238C32.7745 9.66955 34.0439 9.6005 34.9935 10.2295L35.179 10.3643L35.18 10.3652L41.0472 15.0176C41.5105 15.4034 41.7785 15.9725 41.7786 16.5723V24.2354C41.7786 24.8997 41.5455 25.5406 41.1243 26.0498L40.9319 26.2598C40.39 26.7964 39.6549 27.0967 38.889 27.0947H37.1634C36.9158 27.0946 36.6783 26.9964 36.5042 26.8223C36.352 26.6698 36.2592 26.4703 36.2396 26.2588L36.2357 26.168V23.4766C36.2355 23.1068 36.0874 22.7524 35.8245 22.4912C35.5613 22.2299 35.2041 22.083 34.8323 22.083H32.304C31.5303 22.083 30.9009 22.7058 30.9007 23.4766V26.0576L30.8782 26.0654L30.8773 26.1738C30.8734 26.6827 30.456 27.0947 29.9407 27.0947H28.2552C26.6584 27.0946 25.3655 25.81 25.3655 24.2275V16.5762C25.3781 16.0418 25.6026 15.5368 25.9847 15.168L26.1575 15.0186L26.1605 15.0166L31.8929 10.4268L31.8939 10.4277L31.8978 10.4238Z" fill="white" fill-opacity="0.5" stroke="white" stroke-width="0.301603"/>
                    <path d="M31.8978 10.4238C32.7745 9.66955 34.0439 9.6005 34.9935 10.2295L35.179 10.3643L35.18 10.3652L41.0472 15.0176C41.5105 15.4034 41.7785 15.9725 41.7786 16.5723V24.2354C41.7786 24.8997 41.5455 25.5406 41.1243 26.0498L40.9319 26.2598C40.39 26.7964 39.6549 27.0967 38.889 27.0947H37.1634C36.9158 27.0946 36.6783 26.9964 36.5042 26.8223C36.352 26.6698 36.2592 26.4703 36.2396 26.2588L36.2357 26.168V23.4766C36.2355 23.1068 36.0874 22.7524 35.8245 22.4912C35.5613 22.2299 35.2041 22.083 34.8323 22.083H32.304C31.5303 22.083 30.9009 22.7058 30.9007 23.4766V26.0576L30.8782 26.0654L30.8773 26.1738C30.8734 26.6827 30.456 27.0947 29.9407 27.0947H28.2552C26.6584 27.0946 25.3655 25.81 25.3655 24.2275V16.5762C25.3781 16.0418 25.6026 15.5368 25.9847 15.168L26.1575 15.0186L26.1605 15.0166L31.8929 10.4268L31.8939 10.4277L31.8978 10.4238Z" fill="white" stroke="white" stroke-width="0.301603"/>
                    <g opacity="0.6">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M80.6291 10.1055C85.5111 10.1055 89.483 13.9606 89.483 18.699C89.483 23.4374 85.5111 27.2925 80.6291 27.2925C75.7471 27.2925 71.7752 23.4374 71.7752 18.699C71.7752 13.9606 75.7471 10.1055 80.6291 10.1055ZM80.6291 11.3496C76.4538 11.3496 73.057 14.6473 73.057 18.699C73.057 22.7515 76.4538 26.0484 80.6291 26.0484C84.8044 26.0484 88.2012 22.7515 88.2012 18.699C88.2012 14.6473 84.8044 11.3496 80.6291 11.3496ZM83.9376 15.4882C84.1059 15.6525 84.1674 15.8938 84.0957 16.1136L82.7352 20.3345C82.6728 20.5294 82.5148 20.682 82.3148 20.7425L77.966 22.0638C77.9028 22.0829 77.8378 22.092 77.7746 22.092C77.6071 22.092 77.443 22.0281 77.3208 21.9104C77.1525 21.7461 77.091 21.5048 77.1628 21.285L78.524 17.0641C78.5864 16.8684 78.7437 16.7166 78.9436 16.6561L83.2924 15.3348C83.5205 15.2643 83.7684 15.3249 83.9376 15.4882ZM82.5071 16.8767L79.6469 17.7459L78.7522 20.5219L81.6115 19.6527L82.5071 16.8767Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M80.6291 10.1055C85.5111 10.1055 89.483 13.9606 89.483 18.699C89.483 23.4374 85.5111 27.2925 80.6291 27.2925C75.7471 27.2925 71.7752 23.4374 71.7752 18.699C71.7752 13.9606 75.7471 10.1055 80.6291 10.1055ZM80.6291 11.3496C76.4538 11.3496 73.057 14.6473 73.057 18.699C73.057 22.7515 76.4538 26.0484 80.6291 26.0484C84.8044 26.0484 88.2012 22.7515 88.2012 18.699C88.2012 14.6473 84.8044 11.3496 80.6291 11.3496ZM83.9376 15.4882C84.1059 15.6525 84.1674 15.8938 84.0957 16.1136L82.7352 20.3345C82.6728 20.5294 82.5148 20.682 82.3148 20.7425L77.966 22.0638C77.9028 22.0829 77.8378 22.092 77.7746 22.092C77.6071 22.092 77.443 22.0281 77.3208 21.9104C77.1525 21.7461 77.091 21.5048 77.1628 21.285L78.524 17.0641C78.5864 16.8684 78.7437 16.7166 78.9436 16.6561L83.2924 15.3348C83.5205 15.2643 83.7684 15.3249 83.9376 15.4882ZM82.5071 16.8767L79.6469 17.7459L78.7522 20.5219L81.6115 19.6527L82.5071 16.8767Z" fill="white" fill-opacity="0.5"/>
                    </g>
                    <g opacity="0.6">
                    <g clip-path="url(#clip0_1234_15156)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M178.737 9.84766C181.12 9.84766 183.359 10.746 185.041 12.3779C188.518 15.7494 188.518 21.2346 185.041 24.6061C183.337 26.2597 181.042 27.1347 178.717 27.1347C177.449 27.1347 176.174 26.875 174.98 26.3393C174.629 26.2026 174.299 26.0739 174.063 26.0739C173.791 26.0755 173.425 26.1978 173.072 26.316C172.347 26.5573 171.445 26.8581 170.777 26.213C170.112 25.5672 170.419 24.6946 170.666 23.9924C170.788 23.6466 170.913 23.2895 170.913 23.0193C170.913 22.7973 170.803 22.5142 170.633 22.1064C169.08 18.8531 169.798 14.9323 172.433 12.3787C174.115 10.7468 176.354 9.84766 178.737 9.84766ZM178.738 11.0541C176.686 11.0541 174.76 11.8278 173.312 13.232C171.045 15.4293 170.428 18.8033 171.776 21.6287C171.97 22.0943 172.157 22.548 172.157 23.0193C172.157 23.4898 171.99 23.9635 171.844 24.3817C171.722 24.7259 171.539 25.2455 171.657 25.3597C171.772 25.4755 172.311 25.293 172.667 25.1747C173.094 25.0332 173.579 24.8707 174.059 24.8675C174.54 24.8675 174.994 25.0444 175.474 25.2318C178.416 26.5508 181.895 25.9508 184.162 23.7536C187.153 20.8517 187.153 16.1315 184.162 13.2312C182.714 11.827 180.788 11.0541 178.738 11.0541ZM182.011 18.0213C182.469 18.0213 182.841 18.3808 182.841 18.8255C182.841 19.2703 182.469 19.6298 182.011 19.6298C181.553 19.6298 181.178 19.2703 181.178 18.8255C181.178 18.3808 181.546 18.0213 182.004 18.0213H182.011ZM178.686 18.0213C179.144 18.0213 179.516 18.3808 179.516 18.8255C179.516 19.2703 179.144 19.6298 178.686 19.6298C178.228 19.6298 177.854 19.2703 177.854 18.8255C177.854 18.3808 178.22 18.0213 178.679 18.0213H178.686ZM175.361 18.0213C175.819 18.0213 176.19 18.3808 176.19 18.8255C176.19 19.2703 175.819 19.6298 175.361 19.6298C174.903 19.6298 174.528 19.2703 174.528 18.8255C174.528 18.3808 174.896 18.0213 175.354 18.0213H175.361Z" fill="white"/>
                    </g>
                    <g clip-path="url(#clip1_1234_15156)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M184.601 9.85156C188.551 9.85156 192.264 11.3409 195.052 14.0462C200.816 19.6356 200.816 28.7289 195.052 34.3182C192.227 37.0596 188.422 38.5102 184.568 38.5102C182.467 38.5102 180.352 38.0796 178.373 37.1916C177.79 36.9649 177.245 36.7516 176.853 36.7516C176.402 36.7542 175.795 36.9569 175.21 37.1529C174.008 37.5529 172.512 38.0516 171.405 36.9822C170.302 35.9116 170.811 34.4649 171.221 33.3009C171.423 32.7276 171.63 32.1356 171.63 31.6876C171.63 31.3196 171.448 30.8502 171.167 30.1742C168.592 24.7809 169.782 18.2809 174.151 14.0476C176.939 11.3422 180.65 9.85156 184.601 9.85156ZM184.602 11.8516C181.202 11.8516 178.008 13.1342 175.608 15.4622C171.849 19.1049 170.826 24.6982 173.06 29.3822C173.382 30.1542 173.693 30.9062 173.693 31.6876C173.693 32.4676 173.417 33.2529 173.173 33.9462C172.972 34.5169 172.669 35.3782 172.864 35.5676C173.055 35.7596 173.949 35.4569 174.539 35.2609C175.247 35.0262 176.05 34.7569 176.846 34.7516C177.643 34.7516 178.395 35.0449 179.192 35.3556C184.069 37.5422 189.837 36.5476 193.595 32.9049C198.553 28.0942 198.553 20.2689 193.595 15.4609C191.194 13.1329 188.001 11.8516 184.602 11.8516ZM190.029 23.4018C190.788 23.4018 191.404 23.9978 191.404 24.7352C191.404 25.4725 190.788 26.0685 190.029 26.0685C189.27 26.0685 188.649 25.4725 188.649 24.7352C188.649 23.9978 189.258 23.4018 190.017 23.4018H190.029ZM184.517 23.4018C185.276 23.4018 185.892 23.9978 185.892 24.7352C185.892 25.4725 185.276 26.0685 184.517 26.0685C183.758 26.0685 183.137 25.4725 183.137 24.7352C183.137 23.9978 183.744 23.4018 184.505 23.4018H184.517ZM179.004 23.4018C179.763 23.4018 180.379 23.9978 180.379 24.7352C180.379 25.4725 179.763 26.0685 179.004 26.0685C178.245 26.0685 177.624 25.4725 177.624 24.7352C177.624 23.9978 178.233 23.4018 178.992 23.4018H179.004Z" fill="white" fill-opacity="0.5"/>
                    </g>
                    </g>
                    <g filter="url(#filter0_d_1234_15156)">
                    <path d="M23.5357 37.7617V32.4974H24.4894V34.726H26.9288V32.4974H27.885V37.7617H26.9288V35.5254H24.4894V37.7617H23.5357ZM30.6033 37.8388C30.2177 37.8388 29.8835 37.754 29.6008 37.5844C29.318 37.4147 29.0987 37.1774 28.9427 36.8723C28.7885 36.5673 28.7114 36.2109 28.7114 35.803C28.7114 35.3952 28.7885 35.0379 28.9427 34.7311C29.0987 34.4244 29.318 34.1862 29.6008 34.0165C29.8835 33.8469 30.2177 33.7621 30.6033 33.7621C30.9888 33.7621 31.323 33.8469 31.6057 34.0165C31.8885 34.1862 32.107 34.4244 32.2612 34.7311C32.4172 35.0379 32.4951 35.3952 32.4951 35.803C32.4951 36.2109 32.4172 36.5673 32.2612 36.8723C32.107 37.1774 31.8885 37.4147 31.6057 37.5844C31.323 37.754 30.9888 37.8388 30.6033 37.8388ZM30.6084 37.0934C30.8175 37.0934 30.9923 37.036 31.1328 36.9212C31.2733 36.8046 31.3778 36.6487 31.4464 36.4533C31.5166 36.258 31.5518 36.0404 31.5518 35.8004C31.5518 35.5588 31.5166 35.3403 31.4464 35.145C31.3778 34.9479 31.2733 34.7911 31.1328 34.6746C30.9923 34.558 30.8175 34.4998 30.6084 34.4998C30.3942 34.4998 30.216 34.558 30.0737 34.6746C29.9332 34.7911 29.8278 34.9479 29.7576 35.145C29.689 35.3403 29.6547 35.5588 29.6547 35.8004C29.6547 36.0404 29.689 36.258 29.7576 36.4533C29.8278 36.6487 29.9332 36.8046 30.0737 36.9212C30.216 37.036 30.3942 37.0934 30.6084 37.0934ZM33.2849 37.7617V33.8135H34.1743V34.4844H34.2206C34.3028 34.2582 34.4391 34.0816 34.6293 33.9548C34.8195 33.8263 35.0465 33.7621 35.3104 33.7621C35.5778 33.7621 35.8031 33.8272 35.9865 33.9574C36.1716 34.0859 36.3018 34.2616 36.3772 34.4844H36.4183C36.5057 34.265 36.6531 34.0902 36.8604 33.96C37.0695 33.828 37.3171 33.7621 37.6033 33.7621C37.9666 33.7621 38.2631 33.8769 38.4927 34.1065C38.7223 34.3361 38.8371 34.6711 38.8371 35.1116V37.7617H37.9041V35.2555C37.9041 35.0104 37.8389 34.8314 37.7087 34.7183C37.5785 34.6035 37.4191 34.546 37.2306 34.546C37.0061 34.546 36.8305 34.6163 36.7036 34.7568C36.5785 34.8956 36.516 35.0764 36.516 35.2992V37.7617H35.6035V35.2169C35.6035 35.013 35.5418 34.8502 35.4184 34.7286C35.2967 34.6069 35.1374 34.546 34.9403 34.546C34.8066 34.546 34.685 34.5803 34.5753 34.6489C34.4656 34.7157 34.3782 34.8108 34.3131 34.9342C34.248 35.0559 34.2154 35.1981 34.2154 35.3609V37.7617H33.2849ZM41.5291 37.8388C41.1332 37.8388 40.7913 37.7566 40.5035 37.5921C40.2173 37.4258 39.9971 37.1911 39.8428 36.8878C39.6886 36.5827 39.6115 36.2237 39.6115 35.8107C39.6115 35.4046 39.6886 35.0481 39.8428 34.7414C39.9988 34.4329 40.2164 34.193 40.4957 34.0217C40.7751 33.8486 41.1032 33.7621 41.4802 33.7621C41.7236 33.7621 41.9532 33.8015 42.1691 33.8803C42.3868 33.9574 42.5787 34.0774 42.7449 34.2402C42.9129 34.403 43.0448 34.6103 43.1408 34.8622C43.2367 35.1124 43.2847 35.4106 43.2847 35.7567V36.0421H40.0485V35.4149H42.3928C42.391 35.2367 42.3525 35.0781 42.2771 34.9393C42.2017 34.7988 42.0963 34.6883 41.9609 34.6077C41.8273 34.5272 41.6713 34.4869 41.4931 34.4869C41.3029 34.4869 41.1358 34.5332 40.9918 34.6257C40.8479 34.7166 40.7357 34.8365 40.6551 34.9856C40.5763 35.133 40.536 35.2949 40.5343 35.4714V36.0189C40.5343 36.2486 40.5763 36.4456 40.6603 36.6101C40.7442 36.7729 40.8616 36.898 41.0124 36.9854C41.1632 37.0711 41.3397 37.114 41.5419 37.114C41.6773 37.114 41.7998 37.0951 41.9095 37.0574C42.0192 37.018 42.1143 36.9606 42.1948 36.8852C42.2754 36.8098 42.3362 36.7164 42.3773 36.605L43.2462 36.7027C43.1913 36.9323 43.0868 37.1328 42.9326 37.3042C42.78 37.4738 42.5847 37.6058 42.3465 37.7C42.1083 37.7926 41.8358 37.8388 41.5291 37.8388Z" fill="white"/>
                    </g>
                    <g opacity="0.6" filter="url(#filter1_d_1234_15156)">
                    <path d="M68.1267 37.7617H66.4225V32.4974H68.1807C68.6965 32.4974 69.1395 32.6028 69.5096 32.8135C69.8798 33.0226 70.1634 33.3234 70.3604 33.7158C70.5592 34.1065 70.6586 34.5752 70.6586 35.1218C70.6586 35.6702 70.5584 36.1415 70.3579 36.5356C70.1591 36.9297 69.8712 37.2331 69.4942 37.4455C69.1172 37.6563 68.6614 37.7617 68.1267 37.7617ZM67.2168 37.0677H68.083C68.484 37.0677 68.8173 36.9923 69.0829 36.8415C69.3485 36.689 69.5473 36.4688 69.6793 36.1809C69.8112 35.8913 69.8772 35.5383 69.8772 35.1218C69.8772 34.7088 69.8112 34.3584 69.6793 34.0705C69.549 33.7826 69.3545 33.5641 69.0958 33.415C68.837 33.2659 68.5157 33.1914 68.1318 33.1914H67.2168V37.0677ZM71.5846 37.7617V33.8135H72.3532V37.7617H71.5846ZM71.9728 33.2043C71.8391 33.2043 71.7243 33.1597 71.6283 33.0706C71.5341 32.9798 71.487 32.8718 71.487 32.7467C71.487 32.6199 71.5341 32.5119 71.6283 32.4228C71.7243 32.332 71.8391 32.2866 71.9728 32.2866C72.1064 32.2866 72.2204 32.332 72.3147 32.4228C72.4106 32.5119 72.4586 32.6199 72.4586 32.7467C72.4586 32.8718 72.4106 32.9798 72.3147 33.0706C72.2204 33.1597 72.1064 33.2043 71.9728 33.2043ZM76.3458 34.7774L75.6492 34.9008C75.6201 34.8117 75.5738 34.7268 75.5104 34.6463C75.4487 34.5658 75.3647 34.4998 75.2585 34.4484C75.1523 34.397 75.0194 34.3713 74.8601 34.3713C74.6424 34.3713 74.4608 34.4201 74.3151 34.5178C74.1695 34.6137 74.0966 34.738 74.0966 34.8905C74.0966 35.0224 74.1455 35.1287 74.2432 35.2092C74.3408 35.2898 74.4985 35.3557 74.7161 35.4072L75.3433 35.5511C75.7066 35.6351 75.9774 35.7645 76.1556 35.9392C76.3338 36.114 76.4229 36.3411 76.4229 36.6204C76.4229 36.8569 76.3544 37.0677 76.2173 37.2528C76.0819 37.4361 75.8926 37.5801 75.6492 37.6846C75.4076 37.7891 75.1274 37.8414 74.8087 37.8414C74.3665 37.8414 74.0058 37.7472 73.7265 37.5587C73.4472 37.3684 73.2758 37.0985 73.2124 36.7489L73.9553 36.6358C74.0015 36.8295 74.0966 36.976 74.2406 37.0754C74.3845 37.1731 74.5722 37.2219 74.8035 37.2219C75.0554 37.2219 75.2568 37.1697 75.4076 37.0651C75.5584 36.9589 75.6338 36.8295 75.6338 36.677C75.6338 36.5536 75.5875 36.4499 75.495 36.3659C75.4042 36.282 75.2645 36.2186 75.076 36.1757L74.4077 36.0292C74.0392 35.9452 73.7668 35.8116 73.5903 35.6282C73.4155 35.4449 73.3281 35.2127 73.3281 34.9316C73.3281 34.6986 73.3932 34.4946 73.5234 34.3198C73.6537 34.1451 73.8336 34.0088 74.0632 33.9111C74.2929 33.8117 74.5559 33.7621 74.8524 33.7621C75.2791 33.7621 75.6149 33.8546 75.86 34.0397C76.105 34.223 76.267 34.4689 76.3458 34.7774ZM78.9311 37.8414C78.5489 37.8414 78.2199 37.7549 77.944 37.5818C77.6698 37.407 77.459 37.1662 77.3117 36.8595C77.1643 36.5527 77.0906 36.2014 77.0906 35.8056C77.0906 35.4046 77.166 35.0507 77.3168 34.744C77.4676 34.4355 77.6801 34.1947 77.9543 34.0217C78.2285 33.8486 78.5515 33.7621 78.9234 33.7621C79.2233 33.7621 79.4906 33.8177 79.7254 33.9291C79.9601 34.0388 80.1495 34.193 80.2934 34.3918C80.4391 34.5906 80.5256 34.8228 80.553 35.0884H79.805C79.7639 34.9033 79.6697 34.744 79.5223 34.6103C79.3766 34.4766 79.1813 34.4098 78.9362 34.4098C78.722 34.4098 78.5344 34.4664 78.3733 34.5795C78.2139 34.6909 78.0897 34.8502 78.0006 35.0576C77.9114 35.2632 77.8669 35.5066 77.8669 35.7876C77.8669 36.0755 77.9106 36.324 77.998 36.533C78.0854 36.7421 78.2088 36.904 78.3681 37.0188C78.5292 37.1337 78.7186 37.1911 78.9362 37.1911C79.0819 37.1911 79.2138 37.1645 79.3321 37.1114C79.452 37.0566 79.5523 36.9786 79.6328 36.8775C79.7151 36.7764 79.7725 36.6547 79.805 36.5125H80.553C80.5256 36.7678 80.4425 36.9957 80.3037 37.1962C80.1649 37.3967 79.979 37.5544 79.7459 37.6692C79.5146 37.784 79.243 37.8414 78.9311 37.8414ZM83.0381 37.8414C82.6679 37.8414 82.3449 37.7566 82.069 37.5869C81.7931 37.4173 81.5789 37.1799 81.4264 36.8749C81.2739 36.5699 81.1976 36.2134 81.1976 35.8056C81.1976 35.396 81.2739 35.0379 81.4264 34.7311C81.5789 34.4244 81.7931 34.1862 82.069 34.0165C82.3449 33.8469 82.6679 33.7621 83.0381 33.7621C83.4082 33.7621 83.7312 33.8469 84.0071 34.0165C84.283 34.1862 84.4972 34.4244 84.6497 34.7311C84.8023 35.0379 84.8785 35.396 84.8785 35.8056C84.8785 36.2134 84.8023 36.5699 84.6497 36.8749C84.4972 37.1799 84.283 37.4173 84.0071 37.5869C83.7312 37.7566 83.4082 37.8414 83.0381 37.8414ZM83.0406 37.1962C83.2805 37.1962 83.4793 37.1328 83.637 37.006C83.7946 36.8792 83.9112 36.7104 83.9866 36.4996C84.0637 36.2888 84.1022 36.0566 84.1022 35.803C84.1022 35.5511 84.0637 35.3198 83.9866 35.109C83.9112 34.8965 83.7946 34.726 83.637 34.5975C83.4793 34.4689 83.2805 34.4047 83.0406 34.4047C82.799 34.4047 82.5985 34.4689 82.4391 34.5975C82.2815 34.726 82.1641 34.8965 82.087 35.109C82.0116 35.3198 81.9739 35.5511 81.9739 35.803C81.9739 36.0566 82.0116 36.2888 82.087 36.4996C82.1641 36.7104 82.2815 36.8792 82.4391 37.006C82.5985 37.1328 82.799 37.1962 83.0406 37.1962ZM88.9797 33.8135L87.548 37.7617H86.7254L85.2911 33.8135H86.1162L87.1161 36.8518H87.1573L88.1546 33.8135H88.9797ZM91.2694 37.8414C90.8804 37.8414 90.5454 37.7583 90.2643 37.5921C89.985 37.4241 89.7691 37.1885 89.6166 36.8852C89.4658 36.5802 89.3904 36.2229 89.3904 35.8133C89.3904 35.4089 89.4658 35.0524 89.6166 34.744C89.7691 34.4355 89.9816 34.1947 90.254 34.0217C90.5282 33.8486 90.8487 33.7621 91.2154 33.7621C91.4382 33.7621 91.6541 33.7989 91.8632 33.8726C92.0722 33.9463 92.2599 34.0619 92.4261 34.2196C92.5923 34.3773 92.7234 34.582 92.8194 34.8339C92.9153 35.0841 92.9633 35.3883 92.9633 35.7465V36.0189H89.8248V35.4431H92.2102C92.2102 35.2409 92.169 35.0619 92.0868 34.9059C92.0045 34.7483 91.8889 34.624 91.7398 34.5332C91.5924 34.4424 91.4193 34.397 91.2205 34.397C91.0046 34.397 90.8161 34.4501 90.655 34.5563C90.4957 34.6609 90.3723 34.798 90.2849 34.9676C90.1992 35.1355 90.1564 35.318 90.1564 35.5151V35.965C90.1564 36.2289 90.2026 36.4533 90.2952 36.6384C90.3894 36.8235 90.5205 36.9649 90.6884 37.0625C90.8564 37.1585 91.0526 37.2065 91.2771 37.2065C91.4228 37.2065 91.5556 37.1859 91.6755 37.1448C91.7955 37.102 91.8991 37.0386 91.9865 36.9546C92.0739 36.8706 92.1408 36.7669 92.187 36.6436L92.9145 36.7747C92.8562 36.9889 92.7517 37.1765 92.6009 37.3376C92.4518 37.497 92.2642 37.6212 92.038 37.7103C91.8135 37.7977 91.5573 37.8414 91.2694 37.8414ZM93.8161 37.7617V33.8135H94.559V34.4407H94.6001C94.6721 34.2282 94.7989 34.0611 94.9805 33.9394C95.1639 33.816 95.3712 33.7543 95.6026 33.7543C95.6505 33.7543 95.7071 33.7561 95.7722 33.7595C95.839 33.7629 95.8913 33.7672 95.929 33.7723V34.5075C95.8982 34.4989 95.8433 34.4895 95.7645 34.4792C95.6857 34.4672 95.6068 34.4612 95.528 34.4612C95.3464 34.4612 95.1844 34.4998 95.0422 34.5769C94.9017 34.6523 94.7903 34.7577 94.708 34.8931C94.6258 35.0267 94.5847 35.1792 94.5847 35.3506V37.7617H93.8161Z" fill="white"/>
                    </g>
                    <g opacity="0.6" filter="url(#filter2_d_1234_15156)">
                    <path d="M175.149 34.2093H174.347C174.317 34.0379 174.259 33.8871 174.175 33.7569C174.091 33.6267 173.988 33.5161 173.867 33.4253C173.745 33.3345 173.609 33.2659 173.458 33.2197C173.309 33.1734 173.15 33.1503 172.983 33.1503C172.679 33.1503 172.408 33.2265 172.168 33.3791C171.93 33.5316 171.741 33.7552 171.602 34.0499C171.465 34.3447 171.397 34.7046 171.397 35.1295C171.397 35.558 171.465 35.9195 171.602 36.2143C171.741 36.509 171.93 36.7318 172.17 36.8826C172.41 37.0334 172.68 37.1088 172.98 37.1088C173.146 37.1088 173.304 37.0865 173.453 37.042C173.604 36.9957 173.74 36.928 173.862 36.8389C173.983 36.7498 174.086 36.641 174.17 36.5125C174.256 36.3822 174.315 36.2331 174.347 36.0652L175.149 36.0678C175.107 36.3265 175.024 36.5647 174.9 36.7824C174.778 36.9983 174.622 37.1851 174.43 37.3427C174.24 37.4987 174.022 37.6195 173.777 37.7052C173.532 37.7909 173.264 37.8337 172.975 37.8337C172.519 37.8337 172.113 37.7257 171.756 37.5098C171.4 37.2922 171.119 36.9811 170.913 36.5767C170.709 36.1723 170.607 35.6899 170.607 35.1295C170.607 34.5675 170.71 34.0851 170.916 33.6824C171.122 33.2779 171.403 32.9678 171.759 32.7519C172.115 32.5342 172.521 32.4254 172.975 32.4254C173.254 32.4254 173.515 32.4657 173.756 32.5462C174 32.625 174.218 32.7416 174.412 32.8958C174.605 33.0483 174.766 33.2351 174.892 33.4562C175.019 33.6755 175.105 33.9266 175.149 34.2093ZM176.807 35.4174V37.7617H176.038V32.4974H176.797V34.4561H176.845C176.938 34.2436 177.079 34.0748 177.269 33.9497C177.46 33.8246 177.708 33.7621 178.015 33.7621C178.286 33.7621 178.522 33.8177 178.724 33.9291C178.928 34.0405 179.086 34.2067 179.197 34.4278C179.31 34.6472 179.367 34.9213 179.367 35.2504V37.7617H178.598V35.3429C178.598 35.0533 178.524 34.8288 178.375 34.6694C178.226 34.5083 178.018 34.4278 177.753 34.4278C177.571 34.4278 177.408 34.4664 177.264 34.5435C177.122 34.6206 177.01 34.7337 176.928 34.8828C176.847 35.0302 176.807 35.2084 176.807 35.4174ZM181.542 37.8491C181.291 37.8491 181.065 37.8028 180.863 37.7103C180.661 37.6161 180.501 37.4798 180.382 37.3016C180.266 37.1234 180.208 36.9049 180.208 36.6461C180.208 36.4234 180.25 36.24 180.336 36.096C180.422 35.9521 180.537 35.8381 180.683 35.7542C180.829 35.6702 180.992 35.6068 181.171 35.564C181.351 35.5211 181.535 35.4886 181.722 35.4663C181.958 35.4389 182.15 35.4166 182.297 35.3994C182.445 35.3806 182.552 35.3506 182.619 35.3095C182.685 35.2684 182.719 35.2015 182.719 35.109V35.091C182.719 34.8665 182.655 34.6926 182.529 34.5692C182.404 34.4458 182.217 34.3841 181.968 34.3841C181.71 34.3841 181.506 34.4415 181.357 34.5563C181.209 34.6694 181.107 34.7954 181.051 34.9342L180.328 34.7697C180.414 34.5298 180.539 34.3361 180.704 34.1888C180.87 34.0397 181.061 33.9317 181.277 33.8649C181.493 33.7963 181.72 33.7621 181.958 33.7621C182.116 33.7621 182.283 33.7809 182.459 33.8186C182.637 33.8546 182.804 33.9214 182.958 34.0191C183.114 34.1168 183.242 34.2564 183.341 34.4381C183.44 34.618 183.49 34.8519 183.49 35.1398V37.7617H182.739V37.2219H182.709C182.659 37.3213 182.584 37.419 182.485 37.515C182.386 37.6109 182.258 37.6906 182.102 37.754C181.946 37.8174 181.759 37.8491 181.542 37.8491ZM181.709 37.2322C181.921 37.2322 182.103 37.1902 182.254 37.1062C182.406 37.0223 182.522 36.9126 182.601 36.7772C182.681 36.6401 182.721 36.4936 182.721 36.3377V35.8287C182.694 35.8561 182.641 35.8818 182.562 35.9058C182.485 35.9281 182.397 35.9478 182.297 35.965C182.198 35.9804 182.101 35.9949 182.007 36.0087C181.913 36.0206 181.834 36.0309 181.77 36.0395C181.621 36.0583 181.485 36.09 181.362 36.1346C181.24 36.1792 181.142 36.2434 181.069 36.3274C180.997 36.4096 180.961 36.5193 180.961 36.6564C180.961 36.8466 181.031 36.9906 181.171 37.0883C181.312 37.1842 181.491 37.2322 181.709 37.2322ZM186.357 33.8135V34.4304H184.2V33.8135H186.357ZM184.778 32.8675H185.547V36.6024C185.547 36.7515 185.569 36.8638 185.614 36.9392C185.658 37.0129 185.716 37.0634 185.786 37.0908C185.858 37.1165 185.936 37.1294 186.02 37.1294C186.082 37.1294 186.136 37.1251 186.182 37.1165C186.228 37.108 186.264 37.1011 186.29 37.096L186.429 37.7309C186.384 37.748 186.321 37.7651 186.239 37.7823C186.156 37.8011 186.053 37.8114 185.93 37.8131C185.728 37.8166 185.539 37.7806 185.365 37.7052C185.19 37.6298 185.048 37.5132 184.94 37.3556C184.832 37.1979 184.778 37 184.778 36.7618V32.8675Z" fill="white"/>
                    </g>
                    <g opacity="0.6">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M232.996 23.9942C232.996 26.8108 229.134 27.1363 226.229 27.1363L226.021 27.1362C224.171 27.1317 219.46 27.0148 219.46 23.9771C219.46 21.218 223.168 20.8493 226.05 20.8354L226.437 20.8351C228.287 20.8396 232.996 20.9565 232.996 23.9942ZM226.229 22.1168C222.588 22.1168 220.742 22.7423 220.742 23.9771C220.742 25.223 222.588 25.8545 226.229 25.8545C229.869 25.8545 231.714 25.229 231.714 23.9942C231.714 22.7483 229.869 22.1168 226.229 22.1168ZM226.229 10.1562C228.731 10.1562 230.766 12.1918 230.766 14.6939C230.766 17.196 228.731 19.2306 226.229 19.2306H226.202C223.705 19.2229 221.682 17.1866 221.691 14.6913C221.691 12.1918 223.726 10.1562 226.229 10.1562ZM226.229 11.3765C224.4 11.3765 222.911 12.8643 222.911 14.6939C222.905 16.5175 224.382 18.0044 226.204 18.0112L226.229 18.6213V18.0112C228.058 18.0112 229.546 16.5226 229.546 14.6939C229.546 12.8643 228.058 11.3765 226.229 11.3765Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M232.996 23.9942C232.996 26.8108 229.134 27.1363 226.229 27.1363L226.021 27.1362C224.171 27.1317 219.46 27.0148 219.46 23.9771C219.46 21.218 223.168 20.8493 226.05 20.8354L226.437 20.8351C228.287 20.8396 232.996 20.9565 232.996 23.9942ZM226.229 22.1168C222.588 22.1168 220.742 22.7423 220.742 23.9771C220.742 25.223 222.588 25.8545 226.229 25.8545C229.869 25.8545 231.714 25.229 231.714 23.9942C231.714 22.7483 229.869 22.1168 226.229 22.1168ZM226.229 10.1562C228.731 10.1562 230.766 12.1918 230.766 14.6939C230.766 17.196 228.731 19.2306 226.229 19.2306H226.202C223.705 19.2229 221.682 17.1866 221.691 14.6913C221.691 12.1918 223.726 10.1562 226.229 10.1562ZM226.229 11.3765C224.4 11.3765 222.911 12.8643 222.911 14.6939C222.905 16.5175 224.382 18.0044 226.204 18.0112L226.229 18.6213V18.0112C228.058 18.0112 229.546 16.5226 229.546 14.6939C229.546 12.8643 228.058 11.3765 226.229 11.3765Z" fill="white" fill-opacity="0.5"/>
                    <g filter="url(#filter3_d_1234_15156)">
                    <path d="M216.018 37.7656V32.5013H217.894C218.304 32.5013 218.643 32.5758 218.912 32.7249C219.181 32.874 219.382 33.0779 219.516 33.3367C219.65 33.5937 219.716 33.8833 219.716 34.2055C219.716 34.5294 219.649 34.8207 219.513 35.0795C219.38 35.3365 219.177 35.5404 218.907 35.6912C218.638 35.8403 218.299 35.9149 217.891 35.9149H216.601V35.2414H217.819C218.078 35.2414 218.288 35.1969 218.449 35.1077C218.61 35.0169 218.729 34.8935 218.804 34.7376C218.879 34.5817 218.917 34.4043 218.917 34.2055C218.917 34.0067 218.879 33.8302 218.804 33.676C218.729 33.5218 218.609 33.4009 218.447 33.3136C218.286 33.2262 218.073 33.1825 217.809 33.1825H216.812V37.7656H216.018ZM220.586 37.7656V33.8174H221.329V34.4446H221.37C221.442 34.2321 221.569 34.065 221.75 33.9433C221.934 33.8199 222.141 33.7582 222.372 33.7582C222.42 33.7582 222.477 33.76 222.542 33.7634C222.609 33.7668 222.661 33.7711 222.699 33.7762V34.5114C222.668 34.5028 222.613 34.4934 222.534 34.4831C222.455 34.4711 222.377 34.4651 222.298 34.4651C222.116 34.4651 221.954 34.5037 221.812 34.5808C221.671 34.6562 221.56 34.7616 221.478 34.897C221.396 35.0306 221.354 35.1831 221.354 35.3545V37.7656H220.586ZM224.886 37.8453C224.516 37.8453 224.192 37.7605 223.917 37.5908C223.641 37.4212 223.426 37.1838 223.274 36.8788C223.121 36.5738 223.045 36.2173 223.045 35.8095C223.045 35.3999 223.121 35.0418 223.274 34.735C223.426 34.4283 223.641 34.1901 223.917 34.0204C224.192 33.8508 224.516 33.766 224.886 33.766C225.256 33.766 225.579 33.8508 225.855 34.0204C226.131 34.1901 226.345 34.4283 226.497 34.735C226.65 35.0418 226.726 35.3999 226.726 35.8095C226.726 36.2173 226.65 36.5738 226.497 36.8788C226.345 37.1838 226.131 37.4212 225.855 37.5908C225.579 37.7605 225.256 37.8453 224.886 37.8453ZM224.888 37.2001C225.128 37.2001 225.327 37.1367 225.485 37.0099C225.642 36.8831 225.759 36.7143 225.834 36.5035C225.911 36.2927 225.95 36.0605 225.95 35.8069C225.95 35.555 225.911 35.3237 225.834 35.1129C225.759 34.9004 225.642 34.7299 225.485 34.6014C225.327 34.4728 225.128 34.4086 224.888 34.4086C224.647 34.4086 224.446 34.4728 224.287 34.6014C224.129 34.7299 224.012 34.9004 223.935 35.1129C223.859 35.3237 223.821 35.555 223.821 35.8069C223.821 36.0605 223.859 36.2927 223.935 36.5035C224.012 36.7143 224.129 36.8831 224.287 37.0099C224.446 37.1367 224.647 37.2001 224.888 37.2001ZM229.463 33.8174V34.4343H227.232V33.8174H229.463ZM227.844 37.7656V33.3598C227.844 33.1131 227.898 32.9083 228.006 32.7455C228.114 32.581 228.257 32.4584 228.435 32.3779C228.613 32.2956 228.807 32.2545 229.016 32.2545C229.17 32.2545 229.302 32.2674 229.412 32.2931C229.521 32.3171 229.603 32.3393 229.656 32.3599L229.476 32.982C229.44 32.9717 229.394 32.9597 229.337 32.946C229.281 32.9306 229.212 32.9228 229.131 32.9228C228.945 32.9228 228.811 32.9691 228.73 33.0616C228.652 33.1542 228.612 33.2878 228.612 33.4626V37.7656H227.844ZM230.256 37.7656V33.8174H231.025V37.7656H230.256ZM230.644 33.2082C230.511 33.2082 230.396 33.1636 230.3 33.0745C230.205 32.9837 230.158 32.8757 230.158 32.7506C230.158 32.6238 230.205 32.5158 230.3 32.4267C230.396 32.3359 230.511 32.2905 230.644 32.2905C230.778 32.2905 230.892 32.3359 230.986 32.4267C231.082 32.5158 231.13 32.6238 231.13 32.7506C231.13 32.8757 231.082 32.9837 230.986 33.0745C230.892 33.1636 230.778 33.2082 230.644 33.2082ZM232.827 32.5013V37.7656H232.059V32.5013H232.827ZM235.563 37.8453C235.174 37.8453 234.839 37.7622 234.558 37.596C234.278 37.428 234.062 37.1924 233.91 36.8891C233.759 36.5841 233.684 36.2268 233.684 35.8172C233.684 35.4128 233.759 35.0563 233.91 34.7479C234.062 34.4394 234.275 34.1987 234.547 34.0256C234.822 33.8525 235.142 33.766 235.509 33.766C235.732 33.766 235.948 33.8028 236.157 33.8765C236.366 33.9502 236.553 34.0658 236.72 34.2235C236.886 34.3812 237.017 34.5859 237.113 34.8378C237.209 35.088 237.257 35.3922 237.257 35.7504V36.0228H234.118V35.4471H236.504C236.504 35.2448 236.462 35.0658 236.38 34.9098C236.298 34.7522 236.182 34.6279 236.033 34.5371C235.886 34.4463 235.713 34.4009 235.514 34.4009C235.298 34.4009 235.11 34.454 234.948 34.5602C234.789 34.6648 234.666 34.8019 234.578 34.9715C234.493 35.1395 234.45 35.322 234.45 35.519V35.9689C234.45 36.2328 234.496 36.4573 234.589 36.6423C234.683 36.8274 234.814 36.9688 234.982 37.0665C235.15 37.1624 235.346 37.2104 235.571 37.2104C235.716 37.2104 235.849 37.1898 235.969 37.1487C236.089 37.1059 236.193 37.0425 236.28 36.9585C236.367 36.8745 236.434 36.7708 236.48 36.6475L237.208 36.7786C237.15 36.9928 237.045 37.1804 236.894 37.3415C236.745 37.5009 236.558 37.6251 236.331 37.7142C236.107 37.8016 235.851 37.8453 235.563 37.8453Z" fill="white"/>
                    </g>
                    </g>
                    <defs>
                    <filter id="filter0_d_1234_15156" x="21.1229" y="32.4961" width="24.5747" height="10.1694" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2.41282"/>
                    <feGaussianBlur stdDeviation="1.20641"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1234_15156"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1234_15156" result="shape"/>
                    </filter>
                    <filter id="filter1_d_1234_15156" x="64.0097" y="32.2852" width="34.3322" height="10.3803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2.41282"/>
                    <feGaussianBlur stdDeviation="1.20641"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1234_15156"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1234_15156" result="shape"/>
                    </filter>
                    <filter id="filter2_d_1234_15156" x="168.195" y="32.4258" width="20.647" height="10.2475" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2.41282"/>
                    <feGaussianBlur stdDeviation="1.20641"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1234_15156"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1234_15156" result="shape"/>
                    </filter>
                    <filter id="filter3_d_1234_15156" x="213.605" y="32.2539" width="26.0648" height="10.4155" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="2.41282"/>
                    <feGaussianBlur stdDeviation="1.20641"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1234_15156"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1234_15156" result="shape"/>
                    </filter>
                    <clipPath id="clip0_1234_15156">
                    <rect width="19.9058" height="19.3026" fill="white" transform="translate(168.992 9.04688)"/>
                    </clipPath>
                    <clipPath id="clip1_1234_15156">
                    <rect width="19.9058" height="19.3026" fill="white" transform="translate(168.992 9.04688)"/>
                    </clipPath>
                    </defs>
                  </svg>
   
                </div>
            </div>

            )}
            {value === 1 && (
            <div
                className={`mx-auto md:mx-0 w-[17.5rem] mt-[1.25rem] mb-[1rem] ${style.emulator}`}
            >

          <Box
            sx={{
              width: '100%',
              maxWidth: 375,
              mx: 'auto',
              bgcolor: '#fff',
              border: '1px solid #ddd',
              borderRadius: 3,
              overflow: 'hidden',
              paddingTop: '0.25rem'
            }}
          >
            {/* Top status bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                pt: 1,
              }}
            >
              <Typography variant="body2">8:00</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <SignalCellularAltIcon sx={{ fontSize: 16 }} />
                <WifiIcon sx={{ fontSize: 16 }} />
                <BatteryFullIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>

            {/* Navigation Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
                py: 1,
              }}
            >
                <ArrowBackIosNewIcon fontSize="small" />
            
              <Box width={24} /> {/* spacer */}
              {/* 3-dot icon */}
              <Box sx={{ mt: 1 }}>
                  <MoreVertIcon />
              </Box>
            </Box>

            {/* Profile Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 1,
              }}
            >
              <Avatar
                src={profileImg}
                sx={{ width: 80, height: 80 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: 1, fontWeight: 'bold', color: '#000' }}
              >
                {name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Box
                  sx={{ width: 60, height: 20, bgcolor: '#eee', borderRadius: 1 }}
                />
                <Box
                  sx={{ width: 60, height: 20, bgcolor: '#eee', borderRadius: 1 }}
                />
              </Box>

              
            </Box>

            {/* Grid Posts */}
            <Grid container spacing={0.5} sx={{ mt: 2, px: 1 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      bgcolor: index === 0 ? '#ccc' : '#f0f0f0',
                      position: 'relative',
                    }}
                  >
                    {index === 0 && (
                      <>
                        <Box
                          component="img"
                          src={state.thumbnailUrl}
                          alt="Post"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 4,
                            left: 4,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: '#fff',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            px: 0.5,
                            borderRadius: 1,
                            fontSize: 12,
                          }}
                        >
                          <PlayArrowIcon fontSize="inherit" />
                          <span>1000</span>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>


            </div>
            )}
             {value === 2 && (
            <div
                className={`mx-auto md:mx-0 w-[17.5rem] h-[15rem] mt-[1.25rem] mb-[1rem] bg-[#2C2C2C] ${style.emulator}`}>
                <CustomPlayer src={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} />
            </div>
            )}
            {!isEditMode && 
            <span className='px-4'>
            <CustomButton
                onClick={() => setOpenEditModal(true)}
                textSize="14px"
                islight
                text="Edit video"
                backgroundColor="#0000000D"
                color="black"
                icon={MyIcon}

            />
            </span>
            }
            {/* <CustomButton
                onClick={() => setReplaceVideoPopup(true)}
                textSize="14px"
                islight
                text="Change video"
            /> */}
            <CustomPopup
                open={replaceVideoPopup}
                title="Replace this video?"
                description="Caption and video settings will still be saved."
                btnText="Continue editing"
                primaryBtnText="Replace"
                onBtnClick={() => setReplaceVideoPopup(false)}
                onPrimaryBtnClick={selectFilesHandler}
                onClose={() => setReplaceVideoPopup(false)}
            />
            <PopupForEditVideo open={openEditModal} handleClose={()=>setOpenEditModal(false)} targetVideo={selectedVideoSrc ? selectedVideoSrc : videoInfo?.originalUrl} isDarkTheme={darkTheme} />
        </div>
    );
}

export default FormLeftSide;
