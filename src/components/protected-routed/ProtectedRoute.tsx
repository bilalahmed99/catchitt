import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openLoginPopup } from '../../redux/reducers';

const ProtectedRoute = ({ element: Element  }: {element: any}) => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            dispatch(openLoginPopup());
        }
    }, [token, dispatch]);

    if (!token) {
        return navigate(-1);
    }

    return <Element />;
};

export default ProtectedRoute;
