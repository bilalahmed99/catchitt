import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followingsMethod, getRandomUsers } from "./redux/AsyncFuncs";
import { updateProfile } from "./redux/reducers/auth";
import { db } from "./utils/db";
import { getVideoCategories } from "./redux/reducers/videoCategories";

function useApp() {
    const dispatch = useDispatch();
    const token: any = localStorage.getItem('token')
    const _id: any = localStorage.getItem('userId')
    useMemo(() => {
        if (token) {
            db.profile.get({ _id }).then((result: any) => {
                dispatch(updateProfile(result))
                dispatch(followingsMethod());
                dispatch(getVideoCategories());
            })
        } else {
            dispatch(getRandomUsers());
        }
    }, [])
    console.log(useSelector((store: any) => store.reducers));
    return {}
}

export default useApp
