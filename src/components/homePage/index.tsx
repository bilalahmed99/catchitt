import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Forwardusers from '../../shared/popups/shareTo/Forwardusers';
import Gifts from '../discover/popups/gifts';
import PopupForReport from '../profile/popups/PopupForReport';
import PopupForBlock from '../profile/popups/popupForBlock';
import PopupForVideoPlayer from '../profile/popups/popupForVideoPlayer';
import ForDesktop from './ForDesktop';
import ForMobile from './ForMobile';
import useHome from './hooks/useHome';
import { APP_TEXTS, LOGIN_OPTIONS } from '../../utils/constants';
import ItemLogin from '../item-login';
import { closeIcon } from '../../icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeLoginPopup } from '../../redux/reducers';

function HomePage() {
    const isMobile = useMediaQuery('(max-width:700px)');
    const { loading, videos, activeTab, setActiveTab, isFollowing } = useHome();
    const [videoModalInfo, setVideoModalInfo] = useState<any>({});
    const [giftsPopup, setGiftsPopup] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [videoModal, setVideoModal] = useState(false);
    const [blockPopup, setBlockPopup] = useState(false);
    const [sendPopup, setSendPopup] = useState(false);
    const dispatch = useDispatch();
    const isLoginPopup = useSelector((store:any) => store?.reducers?.popupSlice?.isLoginPopup);

    console.log(isLoginPopup);

    const toggleLoginPopup = (value: boolean) => {};

    const loginItemClickHandler = (name: string) => {
        switch (name) {
            case APP_TEXTS.QR_CODE:
                // Handle QR code login
                console.log('QR Code login');
                break;
            case APP_TEXTS.EMAIL_OR_PHONE:
                // Handle phone / email / username login
                // navigate('/login/phone-or-email');
                break;
            case APP_TEXTS.FACEBOOK:
                console.log('Facebook login');
                break;
            case APP_TEXTS.GOOGLE:
                // Handle Google login
                console.log('Google login');
                break;
            case APP_TEXTS.TWITTER:
                // Handle Twitter login
                console.log('Twitter login');
                break;
            case APP_TEXTS.APPLE:
                // Handle Apple login
                console.log('Apple login');
                break;
            default:
                console.log('Default case');
        }
    };
    return (
        <div>
            {isMobile ? (
                <ForMobile
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    videoModal={videoModal}
                />
            ) : (
                <ForDesktop
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    videoes={videos}
                    loading={loading}
                    showVideoModal={(e: any) => {
                        setVideoModalInfo(e);
                        setVideoModal(true);
                    }}
                    isFollowing={isFollowing}
                    videoModal={videoModal}
                    sendPopup={sendPopup}
                    setSendPopup={setSendPopup}
                />
            )}
            {isLoginPopup && (
                <div className="w-full z-50 h-screen bg-black/50 fixed top-0">
                    <div className="w-[30.688rem] mx-auto mt-3 bg-white py-4 rounded-lg relative">
                        <div
                            onClick={() => dispatch(closeLoginPopup())}
                            className="bg-gray-100/50 rounded-full h-10 w-10 flex flex-row justify-center items-center absolute right-5 p-1 cursor-pointer"
                        >
                            <img className="h-4 w-4 object-contain" src={closeIcon} />
                        </div>
                        <div className="overflow-auto w-[21.888rem] mx-auto ">
                            <h2 className="font-bold text-3xl mt-5 mb-4">Log in to Seezitt</h2>
                            {LOGIN_OPTIONS.map((option, index) => (
                                <ItemLogin
                                    loginItemClickHandler={loginItemClickHandler}
                                    key={index}
                                    name={option.name}
                                    image={option.image}
                                    styles={option.styles}
                                />
                            ))}
                        </div>
                        <div className="mt-14  w-[21.888rem] mx-auto">
                            <p className="font-normal text-[0.688rem] text-policy">
                                By continuing with an account located in{' '}
                                <span className="text-black cursor-pointer">Pakistan</span>, you
                                agree to our{' '}
                                <span className="text-black cursor-pointer hover:underline">
                                    Terms of Service
                                </span>{' '}
                                and acknowledge that you have read our{' '}
                                <span className="text-black cursor-pointer hover:underline">
                                    Privacy Policy.
                                </span>
                            </p>
                        </div>
                        <div className="mt-3">
                            <div className="border-t-[0.3px] border-gray-200 text-center pt-3.5">
                                <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                                    {APP_TEXTS.NO_ACCOUNT}{' '}
                                    <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                                        {APP_TEXTS.SIGN_UP}
                                    </span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <PopupForVideoPlayer
                gifts={() => setGiftsPopup(true)}
                onBlockPopup={() => setBlockPopup(true)}
                onReportPopup={() => setReportPopup(true)}
                videoModal={videoModal}
                onclose={() => setVideoModal(false)}
                info={videoModalInfo}
                sendPopupHandler={() => setSendPopup(true)}
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
                userId={{ id: videoModalInfo?.user?._id, name: videoModalInfo?.user?.name }}
            />
            <Gifts
                mediaId={videoModalInfo?.mediaId}
                openGifts={giftsPopup}
                onGiftsClose={() => setGiftsPopup(false)}
            />
            <Forwardusers onOpen={sendPopup} onClose={() => setSendPopup(false)} />
        </div>
    );
}

export default HomePage;
