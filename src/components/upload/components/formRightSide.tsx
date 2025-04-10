import { CircularProgress, SvgIcon } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAvatar, downArrow, search } from '../../../icons';
import CustomButton from '../../../shared/buttons/CustomButton';
import BasicCheckBox from '../../../shared/checkbox/BasicCheckBox';
import Text from '../../../shared/components/Text';
import BasicInput from '../../../shared/input/BasicInput';
import CustomChip from '../../../shared/input/CustomChip';
import TagsInput from '../../../shared/input/TagsInput';
import CustomModel from '../../../shared/popups/CustomModel';
import CustomPopup from '../../../shared/popups/CustomPopup';
import BasicSwitch from '../../../shared/switch/BasicSwitch';
import { API_KEY } from '../../../utils/constants';
import { loadFollowers } from '../../../redux/AsyncFuncs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tab } from 'react-tabs';
import styles from './index.module.scss';
import DndContainer from './DndContainer';
import CloseIcon from '@mui/icons-material/Close';
import { message } from 'antd';
import { useUpdateEffect } from 'react-use';
import { setSelectedFile } from '../../../redux/reducers/upload';

function FormRightSide(props: any) {
    const {
        uploadState,
        onCancelUpload,
        onReplaceFile,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        isPosting,
        // videoInfo,
        // updateMediaHandler,
    } = props;
    const [dropDown, setdropDown] = useState(false);
    const [videoThumbnails, setVideoThumbnails] = useState<any[]>([]);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [discardPostPopup, setDiscardPostPopup] = useState(false);
    const [tagUsersPopup, setTagUsersPopup] = useState(false);
    const [postLocationsPopup, setPostLocationsPopup] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [taggedUsers, setTaggedUser] = useState<any[]>([]);
    const [customCover, setCustomCover] = useState<string | null>(null);

    // const fileName = "855289-hd_1920_1080_25fps.mp4";
    // const uploaded = 351.98; // in KB
    // const total = 8.79; // in MB
    // const duration = "0m16s";
    // const timeLeft = "25 seconds left";
    // const percentage = 3.91;

    const dispatch = useDispatch();

    const loadMoreFollowers = () => {
        dispatch(loadFollowers(followersPage));
        // Fetch more data for the next page
    };

    useMemo(() => {
        setVideoThumbnails(thumbnails);
        setSelectedThumb(0);
    }, [thumbnails]);
    const categories = useSelector((store: any) => store?.reducers?.videoCategories) || [];
    const followers = useSelector((state: any) => state.reducers?.followers.data);
    const followersPage = useSelector((state: any) => state?.reducers?.followers?.page);
    const totalFollowers = useSelector((state: any) => state.reducers?.followers.total);

    const [postCategories, setPostCategories] = useState(categories);
    const [countries, setCountries] = useState<any>([]);
    const [filteredCountries, setFilteredCountries] = useState<any>([]);
    const [filteredFollowers, setFilteredFollowers] = useState<any>(followers);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const [coverTab, setCoverTab] = useState<string>('suggestion');

    const loadCountries = () => {
        setLoading(true);
        try {
            fetch(`${API_KEY}/util/countries`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    let response = data?.data;
                    const countriesList = response?.countries?.map(
                        (country: { name: string; code: string }) => {
                            const name = country?.name;
                            const code = country?.code;
                            return {
                                name,
                                code,
                            };
                        }
                    );
                    setCountries(countriesList);
                    setFilteredCountries(countriesList);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCountries();
        if (totalFollowers === null) dispatch(loadFollowers(1));
    }, []);

    useEffect(() => {
        setFilteredFollowers(followers)
    }, [followers])
    

    useEffect(() => {
        const taggedFollowers = taggedUsers.map((user: any) => user?._id);
        updateState('taggedUsers', taggedFollowers);
    }, [taggedUsers]);

    const dropDownH = (e: any) => {
        const filteredCategories = categories.filter((item: any) => {
            if (item?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return item;
            }
        });
        setPostCategories(filteredCategories);
    };

    const handleDescriptionChange = (e: any) => {
        if (e.target.value.length <= 2200) {
            updateState('description', e.target.value);
        }
    }

    const filterCountries = (e: any) => {
        const filteredCountriesArr = countries.filter((country: any) => {
            if (country?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return country;
            }
        });
        setFilteredCountries(filteredCountriesArr);
    }

    const filterFollowers = (e: any) => {
        const filteredFollowersArr = followers.filter((follower: any) => {
            if (follower?.follower_userID?.name?.toLowerCase().includes(e.target.value.toLowerCase())) {
                return follower;
            }
        });
        setFilteredFollowers(filteredFollowersArr);
    }
    var themeColor = window.localStorage.getItem('theme');


    useUpdateEffect(() => {
        setFilteredCountries(countries);
    }, [postLocationsPopup]);

    useUpdateEffect(()=>{
        setFilteredFollowers(followers)
    },[tagUsersPopup]);

    console.log('uploadState');
    console.log(uploadState);


    const renderUploadStatus = () => {
        const isUploadComplete = uploadState.percentage === 100;
    
        return (
            <div className="w-full bg-white shadow-sm rounded-md pt-4 pb-[0]">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* File name and quality */}
                    <div className="flex items-start flex-col gap-2 text-sm font-medium pl-4">
                        <div className='flex'>
                            <span>{uploadState.fileName || "No file selected"}</span>
                            {uploadState.fileName && (
                                <span className="text-xs ml-2 border border-gray-300 rounded px-1 py-0.5 text-gray-700">
                                    1080P
                                </span>
                            )}
                        </div>
                        {uploadState.fileName && (
                            <div className="flex items-center gap-3 text-sm">
                                <span
                                    className={`${
                                        isUploadComplete ? 'text-green-600' : 'text-blue-600'
                                    } hover:underline flex`}
                                >
                                    <svg className='pr-1' width="14" height="14" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.31834 0.0703205C5.20904 0.0681081 5.05314 0.523125 3.99199 1.36148C3.85399 1.47192 3.76551 1.63265 3.74602 1.80832C3.72653 1.98399 3.77762 2.16021 3.88806 2.2982C3.99849 2.4362 4.15923 2.52468 4.3349 2.54417C4.51057 2.56366 4.68678 2.51257 4.82478 2.40214C5.64877 1.75141 6.66896 1.39914 7.7189 1.40279C8.95577 1.40279 10.142 1.89413 11.0166 2.76873C11.8912 3.64333 12.3825 4.82955 12.3825 6.06642H11.7163C11.6544 6.06642 11.5938 6.08365 11.5412 6.11617C11.4885 6.1487 11.446 6.19523 11.4184 6.25056C11.3907 6.3059 11.379 6.36784 11.3845 6.42945C11.3901 6.49107 11.4127 6.54992 11.4498 6.59941L12.7823 8.37625C12.8133 8.41762 12.8535 8.4512 12.8998 8.47433C12.946 8.49746 12.9971 8.5095 13.0488 8.5095C13.1005 8.5095 13.1515 8.49746 13.1977 8.47433C13.244 8.4512 13.2842 8.41762 13.3153 8.37625L14.6477 6.59941C14.6848 6.54992 14.7074 6.49107 14.713 6.42945C14.7186 6.36784 14.7068 6.3059 14.6792 6.25056C14.6515 6.19523 14.609 6.1487 14.5564 6.11617C14.5037 6.08365 14.4431 6.06642 14.3812 6.06642H13.715C13.715 4.47616 13.0833 2.95102 11.9588 1.82654C10.8343 0.702051 9.30917 0.0703205 7.7189 0.0703205ZM2.65553 3.75659C2.6245 3.71522 2.58426 3.68164 2.53801 3.65851C2.49175 3.63538 2.44075 3.62334 2.38903 3.62334C2.33732 3.62334 2.28631 3.63538 2.24006 3.65851C2.1938 3.68164 2.15357 3.71522 2.12254 3.75659L0.790073 5.53343C0.752955 5.58293 0.730352 5.64177 0.724796 5.70339C0.71924 5.765 0.730952 5.82695 0.758618 5.88228C0.786284 5.93761 0.828812 5.98415 0.881437 6.01667C0.934061 6.04919 0.994703 6.06642 1.05657 6.06642H1.7228C1.7228 7.65669 2.35453 9.18182 3.47902 10.3063C4.6035 11.4308 6.12864 12.0625 7.7189 12.0625C9.07126 12.0647 10.3847 11.6097 11.4458 10.7714C11.5141 10.7167 11.571 10.6491 11.6132 10.5724C11.6554 10.4957 11.6821 10.4115 11.6918 10.3245C11.7014 10.2375 11.6939 10.1495 11.6695 10.0655C11.6451 9.9814 11.6044 9.90297 11.5497 9.83464C11.4951 9.76631 11.4275 9.70942 11.3508 9.66721C11.2741 9.62501 11.1899 9.59832 11.1029 9.58867C11.0159 9.57902 10.9279 9.58659 10.8438 9.61096C10.7598 9.63533 10.6813 9.67602 10.613 9.7307C9.78929 10.3819 8.76893 10.7342 7.7189 10.7301C6.48203 10.7301 5.29581 10.2387 4.42121 9.36411C3.54661 8.48951 3.05527 7.30329 3.05527 6.06642H3.7215C3.78336 6.06642 3.84401 6.04919 3.89663 6.01667C3.94925 5.98415 3.99178 5.93761 4.01945 5.88228C4.04711 5.82695 4.05883 5.765 4.05327 5.70339C4.04771 5.64177 4.02511 5.58293 3.98799 5.53343L2.65553 3.75659Z" fill={isUploadComplete ? "#28A745" : "#0075DB"} />
                                    </svg>
                                    <p>
                                        {uploadState.uploaded > 1024
                                            ? `${(uploadState.uploaded / 1024).toFixed(2)} MB`
                                            : `${uploadState.uploaded.toFixed(2)} KB`} 
                                        {isUploadComplete && ` (${uploadState.total.toFixed(2)} MB)`} / {uploadState.total.toFixed(2)} MB
                                    </p>
                                </span>
                                {!isUploadComplete && (
                                    <>
                                        <span className={`text-sm ${isUploadComplete ? 'text-green-600' : 'text-gray-600'}`}>
                                            Duration: {uploadState.duration}
                                        </span>
                                        <span className={`text-sm ${isUploadComplete ? 'text-green-600' : 'text-gray-600'}`}>
                                            {uploadState.timeLeft}
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
    
                    {/* Cancel + % */}
                    <div className="flex flex-col items-center gap-3 text-sm pr-4">
                        {uploadState.isUploading ? (
                            <button 
                                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                                onClick={onCancelUpload}
                            >
                                Cancel
                            </button>
                        ) : (
                            <button 
                                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                                onClick={onCancelUpload}
                            >
                                Replace
                            </button>
                        )}
                        {uploadState.fileName && (
                            <span className={`text-xl font-semibold ${isUploadComplete ? 'text-green-600' : 'text-blue-600'}`}>
                                {uploadState.percentage}% 
                            </span>
                        )}
                    </div>
                </div>
    
                {/* Progress bar */}
                <div className="w-full h-1 rounded mt-3 overflow-hidden">
                    <div
                        className={`h-full ${isUploadComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                        style={{ width: `${uploadState.percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    };
    

    return (
        <div className="flex-[1.7] flex flex-col mt-[8rem] items-start pl-[2.5rem] md:pl-0 pr-[2.5rem]">
             {uploadState.fileName && (
                <div className={`w-[calc(100%-14rem)] ml-auto mt-5 mb-3 pt-5 flex flex-col items-center gap-4 justify-center cursor-pointer rounded-2xl`}>
                    {renderUploadStatus()}
                </div>
            )}
            <div className="w-[100%]">
                <div className="w-[100%] flex flex-col gap-[2rem] pb-[2rem]">
                    <div className='bg-white p-3 rounded-sm shadow-sm'>
                        <div className="w-[100%] flex flex-col gap-[1rem] relative">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Description
                                </p>
                                
                            </div>
                            {/* <BasicInput
                                value={state?.description || ''}
                                endAdornment={
                                    <p className="text-custom-color-000 leading-[1.5rem] text-[1rem] font-normal">
                                        # @
                                    </p>
                                }
                                onChange={handleDescriptionChange}
                            /> */}
                            <textarea value={state?.description || ''} onChange={handleDescriptionChange} id="message" name="message" className="w-full  rounded bg-[#0000000D] focus:border-white focus:ring-1 focus:ring-white h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            <p className="text-gray-500 text-sm leading-[1.5rem] text-[1rem] font-normal absolute left-4 bottom-1">
                                #hashtag @Mention
                            </p>
                            <p className="text-[1rem] text-sm text-custom-color-999 leading-[1.1rem] absolute right-4 bottom-1">
                                {state?.description?.length || 0}/2200
                            </p>
                        </div>
                        <div className="w-[100%] flex flex-col gap-1.5">
                            <div className="w-full flex items-center justify-start gap-2.5 no-underline list-none h-[46px] cursor-pointer">
                                <Tab
                                    onClick={() => setCoverTab('suggestion')}
                                    className={`${styles.coverTab} 
                                        ${coverTab === 'suggestion'
                                            ? `${styles.coverTabSelected} text-[var(--primary-color)]`
                                            : ''
                                        } 
                                        leading-[1.7rem] text-[1.125rem] font-medium
                                    `}
                                >
                                    Suggestions
                                </Tab>
                                <Tab
                                    onClick={() => setCoverTab('custom')}
                                    className={`${styles.coverTab}
                                        ${coverTab === 'custom'
                                            ? `${styles.coverTabSelected} text-[var(--primary-color)]`
                                            : ''
                                        } 
                                        leading-[1.7rem] text-[1.125rem] font-medium
                                    `}
                                >
                                    Upload cover
                                </Tab>
                            </div>
                            {coverTab === 'suggestion' && (
                                <>
                                    {videoThumbnails?.length > 0 ? (
                                        <div className="flex  overflow-x-auto px-[10px] justify-start  rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                                            {videoThumbnails?.map((imageUrl: any, index: number) => (
                                                <img
                                                    key={index}
                                                    onClick={() => {
                                                        updateState('thumbnailUrl', imageUrl);
                                                        setSelectedThumb(index);
                                                    }}
                                                    className={`ease-in-out duration-200 block ${imageUrl === selectedThumb ||
                                                            index === selectedThumb
                                                            ? 'h-[254px] opacity-100'
                                                            : 'h-[224px] '
                                                        } w-[124px] pointer opacity-50 my-[auto] rounded-[5px]`}
                                                    src={imageUrl}
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex  overflow-x-scroll border px-[10px] justify-center  rounded-[5px] border-gray-500 mt-[16px] border-solid left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                                            <CircularProgress
                                                style={{ display: 'block', margin: 'auto' }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            {coverTab === 'custom' && !customCover && (
                                <div className="w-full h-[285px]">
                                    <DndContainer
                                        aspect={62 / 127}
                                        modalTitle="Crop cover"
                                        onChangeFile={(file: File) => {
                                            if (!/\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
                                                message.error('You can only upload supported file!');
                                                return;
                                            }
                                            const reader = new FileReader();
                                            reader.onload = (e: any) => {
                                                setCustomCover(e.target.result);
                                                updateState('thumbnailUrl', e.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                        crop
                                        subtitle="Suported formats: JPG, JPEG, PNG, WEBP"
                                    />
                                </div>
                            )}
                            {coverTab === 'custom' && customCover && (
                                <div className="flex px-[10px] justify-start  rounded-[5px] bg-[var(--secondaty-color)] left-0 gap-[1px] h-[285px] pt-[10px] slider-container">
                                    <div className="relative">
                                        <img
                                            className="ease-in-out duration-200 block h-[254px] w-[124px] pointer my-[auto] rounded-[5px]"
                                            src={customCover}
                                            alt=""
                                        />
                                        <button
                                            className="h-[20px] w-[20px] p-0 flex items-center justify-center absolute top-1.5 right-1.5 rounded-full border border-solid !border-[var(--primary-color)]"
                                            onClick={() => {
                                                setCustomCover(null);
                                                updateState('thumbnailUrl', videoThumbnails[0]);
                                            }}
                                        >
                                            <SvgIcon fontSize="small">
                                                <CloseIcon className="text-[10px] text-[var(--primary-color)]" />
                                            </SvgIcon>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-[100%] flex flex-col gap-[1rem]">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Category
                                </p>
                            </div>
                            <div className="relative flex flex-col">
                                <BasicInput
                                    editable={false}
                                    onClick={() => setdropDown(!dropDown)}
                                    value={state?.category?.name || ''}
                                    endAdornment={
                                        <img
                                            src={downArrow}
                                            alt=""
                                            className={`cursor-pointer transition-all duration-200 transform ${dropDown ? 'rotate-180' : 'rotate-0'
                                                }`}
                                        />
                                    }
                                />
                                {dropDown ? (
                                    <div className="p-[1rem]  rounded-[0.3rem] flex flex-col relative  border  border-custom-gray-300 ">
                                        <BasicInput
                                            type="search"
                                            onChange={dropDownH}
                                            placeholder="Choose category"
                                            width="100% !important"
                                        />
                                        <div
                                            className="flex max-h-[200px] overflow-y-scroll flex-col pt-[1rem] justify-start items-start"
                                            onClick={() => setdropDown(!dropDown)}
                                        >
                                            {postCategories?.map((category: any, i: number) => {
                                                return (
                                                    <p
                                                        className="h-[2.3rem] py-[1rem] gap-2 px-[0.63rem] w-[100%] flex items-center cursor-pointer text-custom-dark-222 text-[0.87rem] text-left font-normal hover:text-custom-primary hover:bg-custom-gray-300"
                                                        onClick={() => {
                                                            updateState('category', category);
                                                            setPostCategories(categories);
                                                        }}
                                                        key={i}
                                                    >
                                                        <img
                                                            className="max-w-[14px]  max-h-[14px]"
                                                            src={category?.icon}
                                                            alt=""
                                                        />
                                                        {category?.name}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="max-w-[100%] flex flex-col gap-[1rem]">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Tag people
                                </p>
                            </div>
                            <TagsInput
                                startAdornment={taggedUsers.map((user, index) => {
                                    return (
                                        <CustomChip
                                            key={index}
                                            onDelete={() => {
                                                const filteredUsers = taggedUsers.filter(
                                                    (user2: any) => user2?.id !== user?.id
                                                );
                                                setTaggedUser(filteredUsers);
                                            }}
                                            tabIndex={-1}
                                            className="w-[200px] h-[48px] bg-custom-gray-400"
                                            label={user?.name}
                                        />
                                    );
                                })}
                                onClick={() => setTagUsersPopup(true)}
                                placeholder="Tag people"
                            />
                        </div>
                        <div className="w-[100%] flex flex-col gap-[1rem]">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    {/* {videoInfo ? 'Edit' : 'Add'} location */} Add Location
                                </p>
                            </div>
                            <BasicInput
                                value={selectedLocation}
                                onClick={() => setPostLocationsPopup(true)}
                                placeholder="Search location"
                                endAdornment={
                                    <img
                                        src={downArrow}
                                        alt=""
                                        className={`cursor-pointer transition-all duration-200 transform -rotate-90`}
                                    />
                                }
                            />
                        </div>
                        
                    </div>
                    <div className='bg-white p-3 rounded-sm shadow-sm'>
                        <div className="w-[100%] flex flex-col gap-[1rem]">
                            <div className="flex justify-between w-[100%]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Allow users to:
                                </p>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('replyOnComment', e?.target?.checked)
                                        }
                                        checked={state?.replyOnComment || true}
                                    />
                                    <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Comment
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('allowDuet', e?.target?.checked)
                                        }
                                        checked={state?.allowDuet || true}
                                    />
                                    <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Duet
                                    </p>
                                </div>
                                {/* <div className="flex gap-2 items-center">
                                    <BasicCheckBox
                                        onChange={(e: any) =>
                                            updateState('allowStitch', e?.target?.checked)
                                        }
                                        checked={state?.allowStitch || false}
                                    />
                                    <p className="text-[1rem] font-medium text-custom-dark-222 leading-[1.1rem]">
                                        Stitch
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-[1rem]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Save video to device
                            </p>
                            <BasicSwitch
                                checked={state?.saveToPhone || false}
                                onChange={(e: any) => updateState('saveToPhone', e?.target?.checked)}
                            />
                        </div>
                        <div className="flex justify-start items-center gap-[1rem]">
                            <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                Private Video
                            </p>
                            <BasicSwitch
                                checked={state?.isOnlyMe || false}
                                onChange={(e: any) => updateState('isOnlyMe', e?.target?.checked)}
                            />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                            <div className="flex justify-start items-center gap-[1rem]">
                                <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                                    Video downloads
                                </p>
                                <BasicSwitch
                                    checked={state?.allowDownload || false}
                                    onChange={(e: any) =>
                                        updateState('allowDownload', e?.target?.checked)
                                    }
                                />
                            </div>
                            <p className="text-[1rem] font-medium text-custom-color-999 leading-[1.1rem] text-start">
                                Allow other people to download your videos and share to other platforms.
                                If this setting is off, a link to your video can still be shared.
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex justify-start items-center gap-[1rem]">
                        <p className="text-[1.125rem] font-medium text-custom-dark-222 leading-[1.7rem]">
                            Allow Others to Add to Story
                        </p>
                        <BasicSwitch
                            checked={state?.allowAddStory || false}
                            onChange={(e: any) => updateState('allowAddStory', e?.target?.checked)}
                        />
                    </div> */}
                    <div className="flex gap-[1rem]">
                        <CustomButton
                            width="169px !important"
                            textSize="16px "
                            islight
                            text="Discard"
                            height="48px !important"
                            onClick={() => setDiscardPostPopup(true)}
                        />
                        <CustomButton
                            textSize="16px "
                            width="169px !important"
                            height="48px !important"
                            text="Post" //{videoInfo ? 'Update' : 'Post'}
                            onClick={SubmitHandler}
                            loading={isPosting}
                        />
                    </div>
                </div>
            </div>
            <CustomPopup
                open={discardPostPopup}
                title="Discard this post?"
                description="The video and all edits will be discarded."
                primaryBtnText="Discard"
                btnText="Continue editing"
                onClose={() => setDiscardPostPopup(false)}
                onPrimaryBtnClick={() => { setDiscardPostPopup(false); dispatch(setSelectedFile({ file: null }))} }
                onBtnClick={() => setDiscardPostPopup(false)}
            />
            {/* Search Locations Popup*/}
            <CustomModel open={postLocationsPopup} onClose={() => setPostLocationsPopup(false)}>
                <div className="bg-custom-light p-[2rem] rounded-[8px] w-[570px]">
                    <div className="mb-[1rem]">
                        <BasicInput
                            autoFocus
                            onChange={filterCountries}
                            startAdornment={
                                <img className="w-[1.5rem] h-[1.5rem]" src={search} alt="" />
                            }
                            placeholder="Search"
                        />
                    </div>
                    <div className="flex flex-col h-[60vh] overflow-y-scroll gap-2">
                        {filteredCountries.map((country: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col justify-between gap-[0.5rem] hover:bg-custom-gray-400 cursor-pointer"
                                    onClick={() => {
                                        updateState('place', country?.name);
                                        setSelectedLocation(country?.name);
                                        setPostLocationsPopup(false);
                                    }}
                                >
                                    <Text fontWeight={400} lineHeight="24px" text={country?.name} />
                                    {/* <Text
                                        fontSize="12px"
                                        fontWeight={400}
                                        lineHeight="15px"
                                        color="#6B6B6B"
                                        text="Alexandria, Egypt"
                                    /> */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CustomModel>

            {/* Tag Users Popup */}
            <CustomModel open={tagUsersPopup} onClose={() => setTagUsersPopup(false)}>
                <div className="bg-custom-light p-[2rem] rounded-[8px] w-[570px]">
                    <div className="mb-[1rem]">
                        <BasicInput
                            autoFocus
                            onChange={filterFollowers}
                            startAdornment={
                                <img className="w-[1.5rem] h-[1.5rem]" src={search} alt="" />
                            }
                            placeholder="Search"
                        />
                    </div>
                    <div
                        className="flex flex-col h-[60vh] overflow-y-scroll no-scrollbar"
                        id="taggedUsersScrollableDiv"
                    >
                        <InfiniteScroll
                            dataLength={filteredFollowers?.length}
                            next={loadMoreFollowers}
                            hasMore={filteredFollowers.length < totalFollowers || totalFollowers === null}
                            loader={
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '1rem',
                                        width: 'inherit',
                                    }}
                                >
                                    <CircularProgress />
                                </div>
                            }
                            className="mb-20"
                            // scrollThreshold={0.6}
                            scrollableTarget="taggedUsersScrollableDiv"
                            endMessage={
                                <div className="flex flex-row justify-center items-center mt-3">
                                    <p className="font-bold text-xl">
                                        {totalFollowers === 0 && 'No followers available.'}
                                    </p>
                                </div>
                            }
                        >
                            {filteredFollowers.map((follower: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex py-[1rem] items-center gap-3 hover:bg-custom-gray-400 cursor-pointer"
                                        onClick={() => {
                                            const isAlreadyTagged = taggedUsers.some((user)=>user._id===follower?.follower_userID?._id);
                                           if(!isAlreadyTagged) setTaggedUser([
                                                ...taggedUsers,
                                                {
                                                    name: follower?.follower_userID?.name,
                                                    _id: follower?.follower_userID?._id,
                                                    id: taggedUsers?.length || 0,
                                                },
                                            ]);
                                            setTagUsersPopup(false);
                                        }}
                                    >
                                        <img
                                            className="w-[48px] h-[48px] rounded-[50%]"
                                            src={follower?.follower_userID?.avatar || defaultAvatar}
                                            alt=""
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;  // Prevent looping in case defaultAvatar fails
                                                (e.target as HTMLImageElement).src = defaultAvatar;  // Set default image if there's an error
                                            }}
                                        />
                                        <Text
                                            fontWeight={500}
                                            lineHeight="20px"
                                            text={follower?.follower_userID?.name}
                                        />
                                    </div>
                                );
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </CustomModel>
            {/* <CustomPopup
                open={leaveSitePopup}
                title="Leave site?"
                description="Changes you made may not be saved."
                primaryBtnText="Leave"
                btnText="Cancel"
                onClose={() => setLeaveSitePopup(false)}
                onBtnClick={() => setLeaveSitePopup(false)}
                onPrimaryBtnClick={() => setLeaveSitePopup(false)}
            />
            <CustomPopup
                open={cancelPostPopup}
                title="Are you sure you want to cancel?"
                primaryBtnText="Yes, start over"
                btnText="Continue uploading"
                onClose={() => setCancelPostPopup(false)}
                onBtnClick={() => setCancelPostPopup(false)}
                // onPrimaryBtnClick={}
            /> */}
        </div>
    );
}

export default FormRightSide;
