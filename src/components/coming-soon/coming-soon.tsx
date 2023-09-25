import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './coming-soon.module.scss';
import chatGraphic from './svg-components/chatGraphic.svg';
import discoverGraphic from './svg-components/discoverGraphic.svg';

export interface ComingSoonProps {
    className?: string;
}

const ComingSoon: React.FC = (className: ComingSoonProps) => {

    const { selectedIndex, setIndex } = useAuthStore();


    return (
        <div className={styles.root}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.suggestedContent}>
                        {selectedIndex === 1 ?
                            <>
                                <div className={styles.comingSoonLeft}>
                                    <h4 >Coming Soon</h4>
                                    <p>Soon you can chat with your friends & show your creative work 💬🎥</p>
                                </div>
                                <div>
                                    <img src={chatGraphic} alt='' width={'500px'} height={'750px'} />
                                </div>
                            </>
                            : selectedIndex === 2 ?
                                <>
                                    <div className={styles.comingSoonLeft}>
                                        <h4 >Coming Soon</h4>
                                        <p>Our team is working hard to bring magical discoveries to you ✨🔮</p>
                                    </div>
                                    <div>
                                        <img src={discoverGraphic} alt='' width={'500px'} height={'750px'} />
                                    </div>
                                </>
                                : ''}

                    </div>
                </div>
            </div>
        </div>

    );
};

export default ComingSoon;
