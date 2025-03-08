import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './customPlayer.module.scss';
import {setVideoUrl} from '../../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume, toggleMute } from '../../../redux/reducers/volumeSlice';
import ReactSlider from "react-slider";




import {
    music,
    play,
    pause,
    volumeMute,
    volumeUnmute,
} from '../../../icons';
import HashtagText from '../../../shared/hashTag/HashtagText';
import { isUserLoggedIn } from '../../../utils/common';
import { useNavigate } from 'react-router-dom';
import MORE_MENU_HOME from '../../../shared/Menu/more';
import { Slider } from 'antd';

function CustomPlayer({ isMuted, onMuteToggle, src, videoModal, post, thumbnailImage, controls, number, onMediaPlay, visibleReportPopup, onEnded  }: any) {
    const [duration, setDuration] = useState<number>();
    const [playingTime, setPlayingTime] = useState<number>();
    const dispatch = useDispatch();
    const { ref, inView, entry } = useInView({
        rootMargin: '-400px 0px -200px 0px',
    });

  const { level, isMutedVolume } = useSelector((state: any) => state?.reducers?.volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);


    const navigate = useNavigate();

    var video = document.createElement('video');
    let videoRef: any = useRef();
    const seekbarRef = useRef<any>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [muted, setMuted] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [isDragging, setIsDragging] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const { isEnabled } = useSelector((store: any) => store?.reducers?.autoScrollUserSettings);
    // const [videoSize, setVideoSize] = useState({ width: '100vw', height: '100vh' });

    // const progress = (currentTime / post?.duration) * 100;
    video.onloadedmetadata = function () {
        setDuration(video?.duration);
        setPlayingTime(video?.currentTime);
    };
    // console.log("number", number);
    video.src = src; // Replace with the URL of your video
    video.load(); // Start loading the video metadata
    
    if (videoRef.current && isMuted) {
        videoRef.current.muted = isMuted;
    }
    
    useEffect(() => {
        if (inView && !videoModal && isPlaying) {
            videoRef?.current?.play();
            if (post?.mediaId && onMediaPlay) {
                onMediaPlay(post.mediaId);  // Capture media ID when video starts playing
                let videoUrl = post?.reducedVideoUrl
                ? post?.reducedVideoUrl
                : post?.reducedVideoHlsUrl
                ? post?.reducedVideoHlsUrl
                : post?.originalUrl;
                dispatch(setVideoUrl(videoUrl));
            }
        } else {
            if (post?.mediaId && onMediaPlay) {
                // onMediaPlay(post.mediaId);  // Capture media ID when video starts playing
            }
            videoRef?.current?.pause();
        }
    }, [inView, videoModal]);


    useEffect(() => {
        if (videoRef.current) {
            // videoRef.current.muted = isMuted;
            console.log('Updated volume level:', level);
            videoRef.current.volume = level;
            videoRef.current.muted = isMutedVolume;

        }
    }, [level, isMutedVolume]);

    // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     // console.log('volume change...', e.target.value); // Log the volume change event value
    //     // const newVolume = parseFloat(e.target.value);
    //     // dispatch(setVolume(newVolume)); // Update the volume in Redux
    // };

    const handleVolumeChange = (newLevel:any) => {
        // console.log('volume change...', e.target.value); // Log the volume change event value
        // const newVolume = parseFloat(e.target.value);
        dispatch(setVolume(newLevel)); // Update the volume in Redux
    };

    const handleMuteToggle = () => {
        dispatch(toggleMute());
    };

    // useEffect(() => {
    //     if (videoRef.current) {
    //         if(isPlaying){
    //             videoRef?.current?.play();
    //         }else{
    //             videoRef?.current?.pause();
    //         }
    //     }
    // }, [isPlaying]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            if (onMediaPlay && post?.mediaId) {
            }
            video.pause();
        } else {
            video.play();
            if (onMediaPlay && post?.mediaId) {
                onMediaPlay(post?.mediaId);
                let videoUrl = post?.reducedVideoUrl
                ? post?.reducedVideoUrl
                : post?.reducedVideoHlsUrl
                ? post?.reducedVideoHlsUrl
                : post?.originalUrl;
                dispatch(setVideoUrl(videoUrl));
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleMuteAndUnmute = () => {
        onMuteToggle();
    };

    const handleEnded = () => {
        // console.log('Herer ended....'+post.mediaId);
        onEnded(post.mediaId); // Pass mediaId when video ends
    };

    // Add mouse interaction handlers
    const handleSliderMouseDown = () => {
        console.log('setIsDragging...')
        setIsDragging(true);
    };

    const handleSliderMouseUp = () => {
        console.log('setIsDragging handleSliderMouseUp...')
        setIsDragging(false);
    };

    // Add keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    dispatch(setVolume(Math.min(1, level + 0.1)));
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    dispatch(setVolume(Math.max(0, level - 0.1)));
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [level, dispatch]);

    

    return (
        <>
        <div style={{ padding: '20px', width: '120px', position:'absolute', zIndex:'2323' }}>
          <div>
            <div className={style.volumeContainer}>
              <button  onClick={() => dispatch(toggleMute())} className={style.volumeButton}>
                {isMuted ? (
                  <MutedIcon />
                ) : level === 0 ? (
                  <MutedIcon />
                ) : level <= 0.5 ? (
                  <LowVolumeIcon />
                ) : (
                  <HighVolumeIcon />
                )}
              </button>
            </div>
            
          </div>
                <Slider
                    value={level}
                    onChange={handleVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    aria-labelledby="volume-slider"
                />
            {/* <ReactSlider
                min={0}
                max={1}
                step={0.01}
                value={level}
                onChange={handleVolumeChange}
                renderThumb={(props) => (
                <div {...props} style={{ display: 'none' }} /> // Completely hide thumb
                )}
                renderTrack={(props, state) => (
                <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '4px',
                    background: `linear-gradient(to right,rgba(124, 243, 19, 0) ${level * 100}%, #ddd ${level * 100}%)`,
                    borderRadius: '2px',
                    cursor: 'pointer'
                    }}
                />
                )}
            /> */}
        </div>
   


            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}
                ref={ref}
                className={`${style.mainContainer} video-container`}
            >
                

                {/* {post.mediaId} */}
                <div className={`${style.videoContainer} ${inView ? 'true' : 'false'}`}
                    style={inView?{}:{
                        backgroundImage:`url(${thumbnailImage})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: 'var(--media-post-height, 85vh )',
                        backgroundSize: 'cover',
                        width: 'var(--media-post-width, 48vh)',
                    }}
                    onClick={togglePlayPause}>
                    {inView && <>
                   
                    <video
                        poster={thumbnailImage}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate"
                        loop={isEnabled ? false : true}
                        autoPlay={videoModal ? false : inView}
                        controls={false} //{controls}
                        style={{ height: 'var(--media-post-height, 85vh )', position: 'relative', zIndex: 1, }}
                        src={src}
                        ref={videoRef}
                        className={style.video}
                        preload='none' //{number == 0 ? 'auto' : 'none'}
                        playsInline
                        onEnded={isEnabled ? handleEnded : undefined}  
                    />
                    
                    </>}

                </div>

                <div className={style.DivMediaCardBottom}>
                    <div className={style.textBox}>
                        <p
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textShadow:'2px 2px 2px rgb(0 0 0 / 50%)'
                            }}
                        >
                            {' '}
                            {post?.user?.username}
                        </p>
                        <p
                            style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                // whiteSpace: 'nowrap',
                                textShadow:'2px 2px 2px rgb(0 0 0 / 50%)'
                            }}
                        >
                            {' '}
                        {Boolean(post?.description.length) && <HashtagText text={post?.description} maxLength={30} />}
                        </p>
                        {post?.sound && (
                            <p 
                                onClick={() =>navigate(`/sounds/${post?.sound?._id}`)}
                                className="flex cursor-pointer"
                                style={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textShadow:'2px 2px 2px rgb(0 0 0 / 50%)'
                                }}
                            >
                                <img src={music} alt="" />
                                {isUserLoggedIn() ?
                                    (post?.sound?.category) : (post?.sound?.category.name)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


// Add these SVG components
const MutedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  );
  
  const LowVolumeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
  
  const HighVolumeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
export default React.memo(CustomPlayer);
