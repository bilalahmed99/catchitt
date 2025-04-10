import FormLeftSide from './formLeftSide';
import FormRightSide from './formRightSide';
import { useState, useEffect } from 'react';
import style from '../index.module.scss';

function UploadForm(props: any) {
    const {
        selectedVideoSrc,
        selectFilesHandler,
        thumbnails,
        updateState,
        state,
        SubmitHandler,
        // updateMediaHandler,
        isPosting,
        // videoInfo,
        uploadState,
        onCancelUpload,
    } = props;
    const [darkTheme, setdarkTheme] = useState('');
    const [lightTheme, setlightTheme] = useState('bg-custom-light');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setlightTheme('');
        } else {
            setlightTheme('bg-custom-light');
        }
    });

    return (
        <div
            className={`w-[calc(100%-14rem)]  flex-col mt-[5.5rem] pl-5 ml-auto mb-[2rem] rounded-[0.5rem] flex md:flex-row `}
        >
            <FormRightSide
                // videoInfo={videoInfo}
                updateState={updateState}
                thumbnails={thumbnails}
                state={state}
                SubmitHandler={SubmitHandler}
                // updateMediaHandler={updateMediaHandler}
                isPosting={isPosting}
                uploadState={uploadState}
                onCancelUpload={onCancelUpload}
                onReplaceFile={selectFilesHandler}
            />
            <FormLeftSide
                // videoInfo={videoInfo}
                darkTheme={darkTheme}
                selectedVideoSrc={selectedVideoSrc}
                selectFilesHandler={selectFilesHandler}
                updateState={updateState}
            />
            
        </div>
    );
}

export default UploadForm;
