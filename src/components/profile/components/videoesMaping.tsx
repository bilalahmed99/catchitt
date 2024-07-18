import { useState } from 'react';
import styles from './videoesMapin.module.scss';
import muteIcon from '../svg-components/volume-mute.svg';
import unmuteIcon from '../svg-components/volume-unmute.svg';

interface Type {
    videos: any;
    openVideoModal: any;
}

export default function VideoesMaping({ videos, openVideoModal }: Type) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    const unmuteHandler = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className={styles.posts}>
            {videos &&
                videos.map((item: any, i: number) => (
                    <div
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={i}
                        onClick={() => openVideoModal(item)}
                        className={`${styles.post} cursor-pointer`}
                    >
                        <video
                            className={`${styles.thumbnail} ${
                                hoveredIndex === i ? 'block' : 'hidden'
                            }`}
                            src={
                                item?.reducedVideoUrl.length > 0
                                    ? item?.reducedVideoUrl
                                    : item?.originalUrl
                            }
                            muted={isMuted}
                            loop
                            autoPlay={true}
                            preload="auto"
                            playsInline
                        />
                        <img
                            className={`${styles.thumbnail} ${
                                hoveredIndex === i ? 'hidden' : 'block'
                            }`}
                            src={item?.thumbnailUrl}
                            alt=""
                        />
                        <div className={styles.views}>
                            <img src="../../../../public/images/icons/views.svg" alt="" />
                            <p className={styles.viewsText}>{item.views}</p>
                        </div>
                        {/* Commented until given advise */}
                        {/* <img
                            onClick={unmuteHandler}
                            className="object-contain h-6 w-6 absolute bottom-3 right-3"
                            src={isMuted ? muteIcon : unmuteIcon}
                            alt=""
                        /> */}
                    </div>
                ))}
        </div>
    );
}
