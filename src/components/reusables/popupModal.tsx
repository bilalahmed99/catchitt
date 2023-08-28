import { Send } from '@mui/icons-material';
import { Modal, Box } from '@mui/material';
import { Duet } from '../post/svg-components/Duet';
import styles from '../post/post.module.scss';

import shareIconinPopup from '../../assets/shareIconInPopUp.png';
import profileIcon from '../../assets/profileIcon.png';

export const PopupModal = ({ open, onClose }: any) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleٍShare}>
                    <div className={styles['searchBar-Div']}>
                        <input
                            className={styles.mySearchInput}
                            placeholder="Search accounts and videos"
                        />
                        <img
                            src={shareIconinPopup}
                            alt=""
                            style={{
                                width: '57.58px',
                                height: '57.58px',
                                marginLeft: '16px',
                            }}
                        />
                    </div>

                    <div className={styles.userDiv}>
                        <div className={styles.userInfoFrame}>
                            <img
                                src={profileIcon}
                                alt={'account.name'}
                                className={styles.avatarImgCircle}
                            />
                            <h4 className={styles.userNameText}>Basma Bahaa</h4>
                        </div>
                        <div className={styles.btnsDiv}>
                            <button className={styles.btnsDivShareOutlined}>
                                <Duet />
                                Duet
                            </button>
                            <button className={styles.btnsDivShareContained}>
                                <Send />
                                Send
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

var styleٍShare = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 588,
    height: 'auto',
    minHeight: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '24px 16px',
    borderRadius: '8px',
    display: 'inline-flex',
    padding: '32px',
    flexDirection: 'column',
    alignItems: 'center',
};
