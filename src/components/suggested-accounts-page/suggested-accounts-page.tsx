import { CircularProgress, IconButton } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import useDebounce from '../reusables/useDebounce';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import styles from './suggested-accounts-page.module.scss';
import { LeftArrow } from './svg-components/LeftArrow';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUpdateEffect } from 'react-use';

export interface SuggestedAccountsPageProps {
    className?: string;
}

export const SuggestedAccountsPage = ({ className }: SuggestedAccountsPageProps) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const token = localStorage.getItem('token');
    const navigator = useNavigate();
    const { selectedTab, setTab } = useAuthStore();

    const [errorMessage, setErrorMessage] = useState('');

    const [accountsData, setAccountsData] = useState<any>({ items: [], page: 1, totalItems: null });
    const API_KEY = process.env.VITE_API_URL;
    const suggestedEndPoint = '/profile/suggested-users';
    const publicSuggestedEndPoint = '/profile/public/suggested-users';

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/home'); // Navigate back to the previous page
    };

    const handleFetchSuggestedAccounts = async (signal: AbortSignal) => {
        const link = isLoggedIn
            ? `${API_KEY}${suggestedEndPoint}?page=${accountsData.page}`
            : `${API_KEY}${publicSuggestedEndPoint}?page=${accountsData.page}`;
        try {
            const response = await fetch(link, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
                signal
            });

            if (response.ok) {
                const responseData = await response.json();
                setAccountsData((prev: any) => {
                    let all = [...prev.items, ...responseData.data.data];
                    let onlyids = all.map((e) => e._id);
                    let unique = Array.from(new Set(onlyids));
                    let sanitized = unique.map((e) => all.find((c) => e == c._id));
                    return { ...prev, items: sanitized, totalItems: responseData.data.total };
                });
            } else {
                const errorResponseData = await response.json();
                const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
                setErrorMessage(errorMessageFromServer);
            }
        } catch (error) {
            // console.error(error);
            console.log(errorMessage);
            setAccountsData((prev: any) => ({ ...prev, totalItems: undefined }));
        }
    };


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        handleFetchSuggestedAccounts(signal);
        return () => {
            controller.abort();
        };
    }, []);

    useUpdateEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        handleFetchSuggestedAccounts(signal);
        return () => {
            controller.abort();
        }
    }, [accountsData.page]);

    // if (!isLoggedIn) {
    // 	return <Navigate to="/auth" />;
    // }

    const SuggestedAccount = memo(
        ({ account }: { account: any }) => {
            const [isFollowed, setIsFollowed] = useState(false);
            const [followLoading, setFollowLoading] = useState(false);

            const handleFollowClick = async (account: any) => {
                if (!isLoggedIn) {
                    navigator('/auth');
                }
                try {
                    setFollowLoading(true); // Set loading state before API call
                    const res = await fetch(`${API_KEY}/profile/follow/${account._id}/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res.ok) {
                        setIsFollowed(!isFollowed);
                    }
                } catch (error) {
                    // Handle error as needed
                } finally {
                    // await handleFetchSuggestedAccounts();
                    setFollowLoading(false); // Set loading state back to false after API call
                }
            };

            const handleFollowBtnClicked = async (
                event: React.MouseEvent<HTMLElement>,
                account: any
            ) => {
                await handleFollowClick(account);
            };

            return (
                <div key={account._id} className={styles.accountCardDiv}>
                    <div
                        className={styles.userInfoFrame}
                        onClick={() => navigate(`/profile/${account._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {account.avatar === '' ? (
                            <img
                                src={defaultProfileIcon}
                                alt={account.name}
                                className={styles.avatarImgCircle}
                            />
                        ) : (
                            <img
                                src={account.avatar}
                                alt={account.name}
                                className={styles.avatarImgCircle}
                            />
                        )}
                        <p>
                            <h4 className={styles.userNameText}>{account.name}</h4>
                        </p>
                    </div>
                    <div className={styles.followBtnDiv}>
                        <button
                            className={isFollowed ? styles.followBtn : styles.followingBtn}
                            onClick={(event) => handleFollowBtnClicked(event, account)}
                        >
                            {followLoading ? '...' : isFollowed ? 'Followed' : 'Follow'}
                        </button>
                    </div>
                </div>
            );
        },
        (prev, next) => prev.account._id == next.account._id
    );

    return (
        <Layout>
            <div className={styles.container}>
                {!isLoggedIn ? (
                    <div className={styles.middleSectionDiv}>
                        {/* <div className={styles.viewSwitchersDiv}>
                            <ViewSwitchers
                                selectedIndex={selectedTab}
                                onTabChange={async (selectedTab) => {
                                    page.current = 1;
                                    tab.current = selectedTab;
                                    setTab(selectedTab);
                                    if (selectedTab === 1) {
                                        navigator({ pathname: '/home' }, { replace: true });
                                    }
                                }}
                            />
                        </div> */}
                        <div className="overflow-y-auto no-scrollbar" id="scrollableDiv">
                            <InfiniteScroll
                                dataLength={accountsData.items?.length}
                                next={() => setAccountsData((prev: any) => ({ ...prev, page: prev.page + 1 }))}
                                hasMore={accountsData.items.length < accountsData?.totalItems || accountsData?.totalItems === null}
                                loader={<div
                                    style={{
                                        gridColumn: "span 3",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '1rem',
                                        width: 'inherit',
                                    }}
                                >
                                    <CircularProgress />
                                </div>}
                                className={styles.gridContainer}
                                // scrollThreshold={0.6}
                                scrollableTarget="scrollableDiv"
                                endMessage={
                                    <div className={`flex justify-center items-center mt-8 ${accountsData.totalItems === 0 ? ' h-[70vh]' : ''} `}>
                                        <p className="text-white font-normal text-sm">
                                            {(() => {
                                                if (accountsData?.totalItems === 0) return 'No videos available in this category.';
                                                if (accountsData.totalItems) return 'No more videos';
                                                return 'Something went wrong. Please refresh the page.';
                                            })()}
                                        </p>
                                    </div>
                                }
                            >
                                {accountsData.items.map((account: any, i: number) => (
                                    <SuggestedAccount key={i} account={account} />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                    // <></>
                ) : (
                    <div
                        className={styles.middleSectionDiv}
                        style={{
                            paddingTop: 0,
                            gap: 0,
                        }}
                    >
                        <div className={styles.pageHeader} style={{ width: '700px' }}>
                            <IconButton
                                sx={{ margin: '0px', padding: '0px', display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}
                                onClick={handleGoBack}
                            >
                                <LeftArrow />
                                <h4>Suggested accounts</h4>
                            </IconButton>
                        </div>
                        <div className="overflow-y-auto no-scrollbar" id="scrollableDiv">
                            <InfiniteScroll
                                dataLength={accountsData.items?.length}
                                next={() => setAccountsData((prev: any) => ({ ...prev, page: prev.page + 1 }))}
                                hasMore={accountsData.items.length < accountsData?.totalItems || accountsData?.totalItems === null}
                                loader={<div
                                    style={{
                                        gridColumn: "span 3",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '1rem',
                                        width: 'inherit',
                                    }}
                                >
                                    <CircularProgress />
                                </div>}
                                className={styles.gridContainer}
                                // scrollThreshold={0.6}
                                scrollableTarget="scrollableDiv"
                                endMessage={
                                    <div className={`flex justify-center items-center mt-8 ${accountsData.totalItems === 0 ? ' h-[70vh]' : ''} `}>
                                        <p className="text-white font-normal text-sm">
                                            {(() => {
                                                if (accountsData?.totalItems === 0) return 'No videos available in this category.';
                                                if (accountsData.totalItems) return 'No more videos';
                                                return 'Something went wrong. Please refresh the page.';
                                            })()}
                                        </p>
                                    </div>
                                }
                            >
                                {accountsData.items.map((account: any, i: number) => (
                                    <SuggestedAccount key={i} account={account} />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
