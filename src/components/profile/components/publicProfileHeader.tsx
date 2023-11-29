import { FunctionComponent, useState } from 'react';
import styles from './profileHeader.module.scss';
import ShareIcon from '../svg-components/ShareIcon';
import LinkIcon from '../svg-components/LinkIcon';
import MailIcon from '../svg-components/MailIcon';

interface Props {
    setProfileModal: (value: boolean) => void;
    setLikesModal: (value: boolean) => void;
    onFollowModalActive: (value: string) => void;
}

const PublicProfileHeader: FunctionComponent<Props> = ({ setProfileModal, onFollowModalActive, setLikesModal }) => {
    const [dropdown, setDropdown] = useState(false)
    return (
        <div className={styles.profileHeader}>
            <div className={styles.banner}>
                <img
                    className={styles.bannerImg}
                    src="https://thumbs.dreamstime.com/b/pink-dahlia-flower-details-macro-photo-border-frame-wide-banner-background-message-wedding-background-pink-dahlia-flower-117406512.jpg"
                    alt="Banner Img"
                />
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.avatarBox}>
                    <img
                        className={styles.avatarImg}
                        src="https://i.pravatar.cc/300"
                        alt="Avatar"
                    />
                </div>
                <button style={{ width: 98 }} className={styles.button}>
                    <ShareIcon />
                    Share
                </button>
            </div>
            <div className={styles.pfContent}>
                <div className={styles.userInfo}>
                    <p className={styles.boldText}>radwaaly79</p>
                    <p className={styles.text}>Radwa Aly</p>
                </div>
                <div className={styles.userStats}>
                    <div
                        onClick={() => onFollowModalActive('followers')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>55</p>
                        <p className={styles.text}>Followers</p>
                    </div>
                    <div onClick={() => setLikesModal(true)} className={styles.statContainer}>
                        <p className={styles.boldText}> 32</p>
                        <p className={styles.text}>Likes</p>
                    </div>
                    <div
                        onClick={() => onFollowModalActive('following')}
                        className={styles.statContainer}
                    >
                        <p className={styles.boldText}>44</p>
                        <p className={styles.text}>Following</p>
                    </div>
                </div>
                <div className={styles.links}>
                    <div className={styles.linkContainer}>
                        <LinkIcon />
                        <p className={styles.link}>www.my-website.com</p>
                    </div>
                    /
                    <div className={styles.linkContainer}>
                        <MailIcon />
                        <p className={styles.link}>radwaaly@gmail.com</p>
                    </div>
                </div>
                <p className={styles.about}>Passionate about art, life and nature.</p>
                <div className={styles.actions}>
                    <button style={{ width: 112 }} className={styles.button}>
                        Messages
                    </button>
                    <button style={{ width: 116 }} className={styles.button2}>
                        Unfollow
                    </button>
                    <button onClick={() => {
                        setDropdown(!dropdown)
                    }} style={{ width: 40 }} className={styles['button3']}>
                        <img src="../../../../public/images/icons/more-btn-publicprofile.svg" alt="" />
                        {
                            dropdown ?
                                <div className={styles['dropdown']}>
                                    <div >
                                        <img src="../../../../public/images/icons/report.svg" alt="" />
                                        <p className={styles['text5']}>Report</p>
                                    </div>
                                    <div>
                                        <img src="../../../../public/images/icons/block.svg" alt="" />
                                        <p className={styles['text5']}>Block</p>
                                    </div>
                                </div> : null
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicProfileHeader;
