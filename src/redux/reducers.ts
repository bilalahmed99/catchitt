import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { commentMethod, fetchProfile, followingsMethod, getHomeVideos, videoLikehandle } from "./AsyncFuncs";

const profile: any = createSlice({
    name: "profile",
    initialState: {},
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(fetchProfile.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
    }
});
const followings: any = createSlice({
    name: "followings",
    initialState: {},
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(followingsMethod.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
    }
});
const homeVideos: any = createSlice({
    name: "homeVideos",
    initialState: [],
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getHomeVideos.fulfilled, (_state: any, action: any) => {
            return action.payload
        })
        builder.addCase(videoLikehandle.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let filteredData = state.map((element: any) => {
                if (element.mediaId === action.payload) {
                    return { ...element, isLiked: !element.isLiked, likes: !element.isLiked ? element.likes + 1 : element.likes - 1 }
                } else {
                    return element
                }
            });
            return filteredData
        })
        builder.addCase(commentMethod.fulfilled, (state: any, action: any) => {
            // @ts-ignore
            let comments = []
            // @ts-ignore
            const { info, res, replyId }: any = action.payload
            if (!replyId) {

                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = [...element.comments, res]
                        return { ...element, comments }
                    } else {
                        return element
                    }
                });
                return filteredData
            } else {
                let filteredData = state.map((element: any) => {
                    if (element.mediaId === info.mediaId) {
                        comments = element?.comments?.map((comment: any) => {
                            if (comment.id === replyId) {
                                return res
                            } else {
                                return element
                            }
                        })
                        return { ...element, comments }
                    } else {
                        return element
                    }
                });
                return filteredData
                
            }
        })
    }
});

export default combineReducers({
    profile: profile.reducer,
    followings: followings.reducer,
    homeVideos: homeVideos.reducer,
});