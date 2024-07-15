import { useState } from 'react';
import styles from './VideoPanel.module.scss';
import defaultProfileIcon from '../../../assets/defaultProfileIcon.png';
import likes from '../svg-components/likes.svg';
import muteIcon from '../svg-components/volume-mute.svg';
import unmuteIcon from '../svg-components/volume-unmute.svg';

export default function VideoPanel({ video, videomodal }: any) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const unmuteHandler = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="col-span-1 cursor-pointer">
            <div
                className="relative w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <video
                    onClick={videomodal}
                    className={`rounded-lg w-full ${isHovered ? 'block' : 'hidden'}`}
                    src={video?.originalUrl}
                    muted={isMuted}
                    loop
                    autoPlay={true}
                    preload="auto"
                    playsInline
                />
                <img
                    onClick={videomodal}
                    className={`rounded-lg w-full cursor-pointer ${isHovered ? 'hidden' : 'block'}`}
                    src={video.thumbnailUrl}
                    alt=""
                />

                <p className={styles.views2}>4/9</p>
                <img
                    onClick={unmuteHandler}
                    className="object-contain h-6 w-6 absolute bottom-3 right-3"
                    src={
                        isMuted
                            ? muteIcon
                            : unmuteIcon
                    }
                    alt=""
                />
            </div>
            <p className="overflow-hidden text-[#222] text-sm font-normal text-left whitespace-nowrap text-ellipsis w-[11.875rem] mt-2">
                Video title
            </p>
            <p className="overflow-hidden text-[#2b5db9] font-semibold text-sm text-left whitespace-nowrap text-ellipsis w-[11.875rem]">
                {video?.description}
            </p>
            <div className={styles.postBottomSide}>
                <div>
                    <img src={video.user.avatar || defaultProfileIcon} alt="" />
                    <p className={styles.userName}>{video.user.username}</p>
                </div>
                <div>
                    <img className="h-4 w-4 object-contain" src={likes} alt="" />
                    <p style={{ margin: '0%' }} className={styles.views}>
                        {video.likes}
                    </p>
                </div>
            </div>
        </div>
    );
}
