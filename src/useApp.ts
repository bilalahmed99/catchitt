import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, followingsMethod } from "./redux/AsyncFuncs";
import { useAuthStore } from "./store/authStore";

function useApp() {
    const dispatch = useDispatch();
    const authStore = useAuthStore((store: any) => store)
    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(followingsMethod());
    }, [authStore]);
    console.log(useSelector((store: any) => store.reducers));
    return {}
}

export default useApp
