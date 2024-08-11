import { ClickAwayListener, Modal } from '@mui/material'
import style from './getApp.module.scss'
import { useState, useEffect } from 'react'
import {seezitt_qr} from '../../icons'
export default function PopupForGetApp({ openAppPopup, closeAppPopup, info }: any) {
    const [popupH, setPopupH] = useState<any>()
    const [darkTheme, setdarkTheme] = useState('');
    const [lightDarkTheme, setlightDarkTheme] = useState('');

    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');

        if (themeColor == 'dark') {
            setdarkTheme(style.darkTheme);
            setlightDarkTheme(style.lightdarkTheme);
        }
    });

    return (
      
        <Modal open={openAppPopup}>
            <ClickAwayListener onClickAway={() => {
                    closeAppPopup()
                }}>
                <div onClick={(e) => e.stopPropagation()} className={`${style.parent}  ${lightDarkTheme}`}>
                    <p className={style.text}>{"Get the Seezitt app"}</p>
                    <hr/>
                    <div>
                     <center>
                        <img style={{width: "50%"}} src={seezitt_qr} />
                    </center>
                    </div>
                </div>
            </ClickAwayListener>
        </Modal>
    )
}
