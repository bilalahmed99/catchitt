import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHomeVideos } from '../../../redux/AsyncFuncs';
import { useAuthStore } from '../../../store/authStore';

function useHome() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(2);
    // @ts-ignore
    const videos = useSelector((store) => store.reducers.homeVideos)
    const dispatch = useDispatch()

    const getHomeVideoes = async () => {
        setLoading(true);
        dispatch(getHomeVideos(activeTab)).then(() => setLoading(false))
    };

    useEffect(() => {
        getHomeVideoes()
    }, []);

    useEffect(() => {
        if (!isLoggedIn && activeTab === 1) {
            navigate('/auth');
        } else  {
            setLoading(true);
            dispatch(getHomeVideos(activeTab)).then(() => setLoading(false))
        }
    }, [activeTab]);

    return {
        loading,
        activeTab,
        setActiveTab,
        videos
    };
}

export default useHome;
