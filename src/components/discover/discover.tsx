import { CircularProgress } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Layout from '../../shared/layout';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import StoriesOnPublicProfile from '../profile/popups/storiesOnPublicProfile';
import VideoPanel from './components/videoPanel';
import styles from './discover.module.scss';
import Gifts from './popups/gifts';
import { DISCOVER_CATEGORIES } from '../../utils/constants';

export default function Discover() {
    const API_KEY = process.env.VITE_API_URL;
    const [hashtagVideos, setHashtagVideos] = useState([]);
    const [hashtagVideosToShow, setHashtagVideosToShow] = useState([]);
    const [videoModal, setVideoModal] = useState(false);
    const [videoModalInfo, setVideoModalInfo] = useState({});
    const token = localStorage.getItem('token');
    const [reportPopup, setReportPopup] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [giftPopup, setGiftPopup] = useState(false);
    const [storyPopup, setStoryPopup] = useState(false);
    const [videosToShow, setVideosToShow] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        const apisIntegration = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_KEY}/discover/trending/hashtags`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data } = await response.json();
                const allVideos = data?.data[4]?.relatedVideos;
                setIsLoading(false);
                setHashtagVideos(allVideos?.slice(10));
                setHashtagVideosToShow(allVideos?.slice(0, 10));
                console.log('🚀 ~ apisIntegration ~ res:', data?.data);
            } catch (error) {
                setIsLoading(false);
                console.log('Error fetching trending videos : ', error);
            }
        };
        apisIntegration();
    }, []);

    const handleScroll = useCallback(() => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const totalHeight = document.documentElement.offsetHeight;

        if (scrollPosition >= totalHeight) {
            setHashtagVideosToShow((prev) => [
                ...prev,
                ...hashtagVideos.slice(videosToShow, videosToShow + 10),
            ]);
            setVideosToShow((prev) => prev + 10);
        }
    }, [hashtagVideos, videosToShow]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const openVideoModal = (video: any) => {
        setVideoModalInfo(video);
        setVideoModal(true);
    };

    const categoryHandler =(index:number)=>{
        setSelectedCategory(index);
    }

    return (
        <Layout>
            <div className={styles.root}>
                {isLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '1rem',
                            width: '100%',
                            height: '90vh',
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-row mt-8 gap-4 overflow-auto">
                            {DISCOVER_CATEGORIES?.map((category, index) => (
                                <button
                                onClick={() =>categoryHandler(index)}
                                    className={`flex items-center px-3 h-[2.625rem] ${
                                        selectedCategory === index 
                                            ? 'text-white bg-black'
                                            : 'text-[#222] bg-unselected-category'
                                    }  rounded-lg cursor-pointer text-base border-none whitespace-nowrap w-auto`}
                                    key={index}
                                >
                                    {category?.category}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-flow-row grid-cols-4 gap-2.5 mr-4">
                            {hashtagVideosToShow &&
                                hashtagVideosToShow.map((video: any, i) => (
                                    <div key={i}>
                                        <VideoPanel
                                            videomodal={() => openVideoModal(video)}
                                            video={video}
                                        />
                                    </div>
                                ))}
                        </div>
                    </>
                )}

                <PopupForVideoPlayer
                    onBlockPopup={() => setBlockPopup(true)}
                    onReportPopup={() => setReportPopup(true)}
                    videoModal={videoModal}
                    onclose={() => setVideoModal(false)}
                    info={videoModalInfo}
                    gifts={() => setGiftPopup(true)}
                />
                <PopupForReport
                    openReport={reportPopup}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                />
                <PopupForBlock
                    openBlock={blockPopup}
                    onBlockClose={() => setBlockPopup(false)}
                    onReportClose={() => setReportPopup(false)}
                    info={videoModalInfo}
                    // @ts-ignore
                    userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
                />
                <Gifts openGifts={giftPopup} onGiftsClose={() => setGiftPopup(false)} />
                <div>
                    <StoriesOnPublicProfile
                        story={storyPopup}
                        onclose={() => setStoryPopup(false)}
                        openReport={() => setReportPopup(true)}
                    />
                </div>
            </div>
        </Layout>
    );
}
