import classNames from 'classnames';
import styles from './activity-page.module.scss';
import { useEffect, useState } from 'react';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import { Follow } from './svg-components/Follow'

export interface ActivityPageProps { }

interface Activity {
    className?: string;
    _id?: string;
    createdTime: number;
    user: {
        id?: string,
        avatar?: string,
        username?: string,
        name: string
        isVerified: boolean,
    },
    triggeredUser: {
        _id: string,
        avatar: string,
        isVerified: boolean,
        username: string,
        name: string
    };
    message: string;
    type: string;
    isRead: boolean,
}

export const ActivityPage: React.FC<Activity> = ({ className, createdTime }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = useAuthStore((state) => state.token);
    const [currentPage] = useState(1);
    const itemsPerPage = 9;
    const [errorMessage, setErrorMessage] = useState('');
    const [activityData, setActivityData] = useState<Activity[]>([]);
    const API_KEY = process.env.VITE_API_URL;
    const activityEndPoint = '/notification';

    const handleFetchActivity = async () => {
        try {
            const response = await fetch(`${API_KEY}${activityEndPoint}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const responseData = await response.json();
                setActivityData(responseData.data.data);
                // console.log(responseData);
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleFetchActivity();
    }, [token]);

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    // Calculate the pagination boundaries
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // Convert createdTime to a Date object
    const createdDate = new Date(createdTime);

    // Get the current date as a Date object
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = currentDate.getTime() - createdDate.getTime();

    // Calculate the time difference in minutes and hours
    const minutesAgo = Math.floor(timeDifferenceMs / (1000 * 60));
    const hoursAgo = Math.floor(timeDifferenceMs / (1000 * 60 * 60));

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={3} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.suggestedContent}>
                        {activityData.slice(firstIndex, lastIndex).map((activity) => (
                            <div key={activity._id} className={styles.suggestedItem}>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <img
                                            src={
                                                activity.user.avatar || 'https://via.placeholder.com/128'
                                            }
                                            alt=""
                                            className={styles.plusIconStyle}
                                        />
                                        <div className={styles.accountName}>
                                            <h6>
                                                <span className={styles.messageText}>
                                                    {activity.message}
                                                </span>{' '}
                                                <span className={styles.timeText}>
                                                    {/* {activity.createdTime}
                                                {hoursAgo}
                                                {hoursAgo > 59
                                                    ? `${hoursAgo}hr`
                                                    : `${minutesAgo}m`} */}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        {activity.type === 'Follow' ? (
                                            <button
                                                className={styles.svgButton}
                                            // onClick={(event) =>
                                            //     handleFollowBtnClicked(event, activity.triggeredUser._id)
                                            // }
                                            >
                                                <Follow />
                                            </button>
                                        ) : (
                                            <img
                                                className={styles.squareIconStyle}
                                                src={activity.triggeredUser.avatar || 'https://via.placeholder.com/128'} // Use the appropriate property from the activity object
                                                alt=""
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
