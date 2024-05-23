import style from '../styles/event.module.scss';
import CustomPlayer from './CustomPlayer';

function EventVideoPlayer() {
    return (
        <div className={style.livePlayer}>
            <CustomPlayer
                controls
                src="https://seezitt-videos-source-bucket.s3.amazonaws.com/input/videos/6446034ba245892fc8473c80.mp4"
            />
        </div>
    );
}

export default EventVideoPlayer;
