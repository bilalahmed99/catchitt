import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './coming-soon.module.scss';
import { Switch } from 'antd';
import useLongPress from '../../utils/useLongPress';

// Assets
import arrowRight from './svg-components/arrow-right.svg';
import attachment from './svg-components/attachment.svg';
import userAvatar from './svg-components/avatar.svg';
import menuBox from './svg-components/menuBox.svg';
import microphone from './svg-components/microphone.svg';
import newChat from './svg-components/newChat.svg';
import pinnedChat from './svg-components/pinnedChat.svg';
import searchChat from './svg-components/search.svg';
import seen from './svg-components/seen.svg';
import emojie from './svg-components/emojie.svg';
import share from './svg-components/reply.svg';
import moreoptions from './svg-components/more-options.svg';
import Layout from '../../shared/layout';

export interface ComingSoonProps {
    className?: string;
}

const ComingSoon: React.FC = (className: ComingSoonProps) => {
    const { selectedIndex, setIndex } = useAuthStore();
    const [allChats, setAllChats] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]);
    const [receivedMessages, setReceivedMessages] = useState<any>([]);
    const [muteNotifications, setMuteNotifications] = useState(false);
    const [pinToTop, setPinToTop] = useState(false);
    const [showMenuBox, setShowMenuBox] = useState(false);
    const [message, setMessage] = useState('');
    const div: any = useRef(null);
    const [blockUserPopup, setBlockUserPopup] = useState(false);
    const [onLongPressed, setOnLongPressed] = useState(false);
    const onLongPress = () => {
        setOnLongPressed(!onLongPressed);
        console.log('longpress is triggered');
    };

    const onClick = () => {
        console.log('click is triggered');
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 800,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
    const scrollToBottom = () => {
        if (div.current) {
            div.current.scrollTop = div.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [receivedMessages]);
    const sendMessageHandler = () => {
        if (message.length > 0) {
            console.log('Message Text : ', message);
            setMessage('');
            setReceivedMessages((current: any) => [
                ...current,
                { message, timestamp: '11:14 AM', user_avatar: userAvatar },
            ]);
        }

        // div.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const blockUserHandler = () => {
        setBlockUserPopup(true);
    };

    const blockUserFinallyHandler = () => {};

    return (
        <Layout>
            {/* <div className={styles.topBarDiv}>
                    <TopBar />
                </div> */}
            <div
                className={styles.container}
                onClick={() => {
                    if (showMenuBox) {
                        setShowMenuBox(false);
                    }
                }}
            >
                {/* <div className={styles.leftSide}>
                        <div className={styles.sideNavDiv}>
                            <SideNavBar selectedIndex={selectedIndex} />
                        </div>
                        <div className={styles.suggestedActivityDiv}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div> */}
                <div className={styles.middleSectionDiv}>
                    <div className={styles.suggestedContent}>
                        <div className={styles.chatlist}>
                            <div className={styles.chatHeader}>
                                <p>Chat</p>
                                <img src={newChat} alt="" />
                            </div>
                            <div className={styles.searchChats}>
                                <img src={searchChat} alt="" />
                                <input type="search" name="" id="" placeholder="Search" />
                            </div>
                            <div className={styles.chatListContainer}>
                                {allChats.map((singleChat, index) => (
                                    <div className={styles.allChats}>
                                        <img
                                            className={styles.userAvatar}
                                            src={userAvatar}
                                            alt=""
                                        />
                                        <div className={styles.userNameNChat}>
                                            <p>Eromaisa</p>
                                            <p>Babe look at our ....</p>
                                        </div>
                                        <div className={styles.timeNCount}>
                                            <p>4:01 PM</p>
                                            {index === 0 && <img src={pinnedChat} alt="" />}
                                            {index === 1 && (
                                                <div className={styles.messageCount}>
                                                    <p>1</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.chatmessage}>
                            <div
                                onClick={() => showMenuBox && setShowMenuBox(false)}
                                className={styles.messageHeader}
                            >
                                <div className={styles.messageHeaderLeft}>
                                    <img className={styles.userAvatar} src={userAvatar} alt="" />
                                    <p>Mohammad</p>
                                </div>
                                <div className={styles.dropdownMenuContainer}>
                                    <img
                                        onClick={() => setShowMenuBox(!showMenuBox)}
                                        className={styles.dropdownMenuBoxImg}
                                        src={menuBox}
                                        alt=""
                                    />
                                    {showMenuBox && (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className={styles.dropdownMenu}
                                        >
                                            <div className={styles.dropdownRow}>
                                                <p>Mute notificaions</p>
                                                <Switch
                                                    onChange={(event) =>
                                                        setMuteNotifications(event)
                                                    }
                                                    value={muteNotifications}
                                                    size="small"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className={styles.dropdownRow}>
                                                <p>Pin to top</p>
                                                <Switch
                                                    onChange={(event) => setPinToTop(event)}
                                                    value={pinToTop}
                                                    size="small"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className={styles.dropdownRow}>
                                                <p>Starred Messages</p>
                                                <div className={styles.starredMessagesRow}>
                                                    <p>None</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                onClick={blockUserHandler}
                                                className={styles.dropdownRow}
                                            >
                                                <p className={styles.warningMenuItem}>Block</p>
                                                <div
                                                    style={{ visibility: 'hidden' }}
                                                    className={styles.starredMessagesRow}
                                                >
                                                    <p>A</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.dropdownRow}>
                                                <p className={styles.warningMenuItem}>Report</p>
                                                <div
                                                    style={{ visibility: 'hidden' }}
                                                    className={styles.starredMessagesRow}
                                                >
                                                    <p className={styles.warningMenuItem}>None</p>
                                                    <img
                                                        className={styles.arrowRight}
                                                        src={arrowRight}
                                                        alt="arrow right"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className={styles.messageBody}>
                                <img src={emptyMessageBox} alt="" />
                                <p className={styles.userName}>
                                    Say hi to Mohamad <br />
                                    <span>Tap to send Hi!</span>
                                </p>
                            </div> */}
                            <div className={styles.messageBodyAvailable}>
                                <div className={styles.markMessageContainer}>
                                    <div className={styles.markSafeMessageTextContainer}>
                                        <p>Mark this message safe?</p>
                                        <p>
                                            We really care about your safety. We will stop showing{' '}
                                            <br />
                                            this message once you mark it safe.
                                        </p>
                                    </div>
                                    <div className={styles.markSafeButtonsContainer}>
                                        <div className={styles.reportButton}>
                                            <p>Report</p>
                                        </div>
                                        <div className={styles.markSafeButton}>
                                            <p>Mark safe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    onLongPressed && e.detail === 2 && setOnLongPressed(false);
                                }}
                                className={styles.userChatMessages}
                                ref={div}
                            >
                                {/* Message Sent */}
                                <div className={styles.receiveMessageContainer}>
                                    <div className={styles.receiveMessage}>
                                        <p className={styles.receiveMessage}>Hello</p>
                                        <div
                                            className={styles.receiveMessageNoTimeStampContainer}
                                        />
                                    </div>
                                </div>
                                <div className={styles.receiveMessageContainer}>
                                    <div className={styles.receiveMessage}>
                                        <p className={styles.receiveMessage}>
                                            It’s Mohamed from Ogoul
                                        </p>
                                        <div className={styles.receiveMessageTimeStampContainer}>
                                            <p className={styles.receiveMessageTimeStamp}>
                                                11:14 AM
                                            </p>
                                            <img className={styles.seenImage} src={seen} alt="" />
                                        </div>
                                    </div>
                                </div>

                                {receivedMessages.map((item, index) => (
                                    <>
                                        {/* Message Receive */}

                                        <div className={styles.sentMessageRowContainer}>
                                            <img
                                                className={styles.userAvatarChatMessage}
                                                src={item.user_avatar}
                                                alt=""
                                            />
                                            <div
                                                {...longPressEvent}
                                                className={styles.sentMessageContainer}
                                            >
                                                <p className={styles.sentMessage}>{item.message}</p>
                                                <p className={styles.sentMessageTimeStamp}>
                                                    {item.timestamp}
                                                </p>
                                            </div>
                                            {onLongPressed && (
                                                <div className={styles.optionsContainer}>
                                                    <img
                                                        className={styles.longPressOptionImages}
                                                        src={emojie}
                                                        alt=""
                                                    />
                                                    <img
                                                        className={styles.longPressOptionImages}
                                                        src={share}
                                                        alt=""
                                                    />
                                                    <img
                                                        className={styles.longPressOptionImages}
                                                        src={moreoptions}
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {/* <div className={styles.sentMessageContainerOnwards}>
                                            <div className={styles.sentMessageContainer}>
                                                <p className={styles.sentMessage}>
                                                    It’s Mohamed from Ogoul
                                                </p>
                                                <p className={styles.sentMessageTimeStamp}>
                                                    11:14 AM
                                                </p>
                                            </div>
                                        </div> */}
                                    </>
                                ))}
                            </div>
                            <form
                                action=""
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessageHandler();
                                }}
                            >
                                <div className={styles.messageBox}>
                                    <div className={styles.messageInput}>
                                        <input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Write a message..."
                                        />
                                        <p
                                            style={{
                                                color: message.length > 0 ? '#5448b2' : null,
                                            }}
                                            onClick={sendMessageHandler}
                                            children="Send"
                                        />
                                    </div>
                                    <div className={styles.controlsMessageBox}>
                                        <img src={attachment} alt="" />
                                        <img src={microphone} alt="" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {blockUserPopup && (
                <div className={styles.blockUserPopup}>
                    <div className={styles.popupMessageBlock}>
                        <p>Are you sure you want to block Mohamed ?</p>
                        <button
                            className={styles.blockButton}
                            onClick={blockUserFinallyHandler}
                            type="button"
                        >
                            Block
                        </button>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setBlockUserPopup(false)}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ComingSoon;
