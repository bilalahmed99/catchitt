import { createSlice } from '@reduxjs/toolkit';

type uploadStateTypes = {
    videos: number;
    isUploading: boolean;
    selectedFile: any;
    selectedVideoSrc: any;
}

export const isUploading: any = createSlice({
    name: 'videoUploadingStatus',
    initialState: {
        videos: 0,
        isUploading: false,
        selectedFile: null,
        selectedVideoSrc: '',
    } as uploadStateTypes,
    reducers: {
        updateUploadingStatus: (state, action) => {
            console.log('check update state payload in upload 🤖🤖🤖🤖', action.payload);
            const { videos, isUploading } = action.payload;
            state.videos = videos;
            state.isUploading = isUploading;
            return state;
        },

        setSelectedFile: (state, action) => {
            const { file } = action.payload;
            if (file) {
                console.log('cehck selected file payload in upload 🚀🚀🚀🚀🚀', action.payload);
                state.selectedFile = file;
                state.selectedVideoSrc = URL.createObjectURL(new Blob([file], { type: 'video/mp4' }));
                return state;
            }
            state.selectedFile = null;
            return state;
        }
    },
});

export const { updateUploadingStatus, setSelectedFile } = isUploading.actions;

export default isUploading.reducer;