
import { useMediaQuery } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIcon, defaultAvatar, logo, logoAuth, logoAuthWhite } from '../../../icons';
import { logoutUser } from '../../../redux/reducers/auth';
import style from './Navbar.module.scss';
import NavbarMunu from '../../../shared/navbar/components/Menu';
import { openLoginPopup, openLogoutPopup } from '../../../redux/reducers';
import MenuDropdownPopup from '../../../shared/Menu/dropdownPopup';



function Header() {
    const isLoggedIn: boolean = localStorage.getItem('token') ? true : false;
    // @ts-ignore
    const profile = useSelector((store) => store?.reducers?.profile);
    const unreadNotiCounts = useSelector((store:any) => store?.reducers?.notifications?.unreadNotiCounts)
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:700px)');
    const submitHandler = (searchValue: any) => {
        navigate(`/searchPage/${searchValue}/All`);
    };
    const [menuPopupStatus, setMenuPopupStatus] = useState('hidden');
    const [darkTheme, setdarkTheme] = useState('');
    const [logo, setLogo] = useState(logoAuth);
    const dispatch = useDispatch();
    const logoutAccount = () => {
        dispatch(logoutUser({ navigate }));
        // dispatch(openLogoutPopup())
    };
    const menuPopupStatusToggler = () => {
        let status = '';
        if (menuPopupStatus === 'hidden') {
            status = 'block';
        } else {
            status = 'hidden';
        }
        setMenuPopupStatus(status);
    };

    const menuItemClickHandler = (menuItem: { menuOption: string; imageUrl: string }) => {
        console.log('<Menu Item> : ', menuItem?.menuOption);
    };

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == "dark") {
            setdarkTheme(style.darkTheme);
            setLogo(logoAuthWhite);
        } else {
            setLogo(logoAuth);
        }
    });

    return (
        <div className={` ${style.parent}  ${darkTheme}`}>
            <div onClick={() => navigate('/')} className={style.sec1}>
                <img src={logo} alt="" />
            </div>
            {!isMobile ? (
                <div className={style.sec2}>
                    {isLoggedIn ? (

                        <div className={style.profile}>
                           
                            
                            <div className={style.user}>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
                                    <img
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            maxWidth: 'initial'
                                        }}
                                        src={profile?.avatar || defaultAvatar}
                                        alt=""
                                    />
                                    <NavbarMunu
                                        onViewProfile={() => navigate(`/profile`)}
                                        Onlogout={() => logoutAccount()}
                                        onSettings={() => navigate('/settings/account')}
                                    />
                                </div>
                                <p className={style.name} style={{ whiteSpace: 'nowrap' }}>{profile?.name?.split(" ")[0]}</p>

                            </div>
              
                        </div>
                    ) : (
                        <>
                            <div className={style.DivHeaderRightContainer}>
                                
                                <button type="button" className={style.StyledLoginButton} onClick={() => dispatch(openLoginPopup())} >Log in</button>
                            </div>
                            <MenuDropdownPopup
                                menuPopupStatusToggler={menuPopupStatusToggler}
                                menuPopupStatus={menuPopupStatus}
                                menuItemClickHandler={menuItemClickHandler}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                  <NavbarMunu
                        onViewProfile={() => navigate(`/profile`)}
                        Onlogout={() => logoutAccount()}
                        onSettings={() => navigate('/settings/account')}
                    />

                </div>
            )}
        </div>
    );
}

export default memo(Header);
