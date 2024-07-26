import { ClickAwayListener, Modal } from '@mui/material'
import style from './getApp.module.scss'
import { useState } from 'react'
export default function PopupForGetApp({ openAppPopup, closeAppPopup, info }: any) {
    const [popupH, setPopupH] = useState<any>()

    return (
        <div className={style.parent}>
            <Modal open={openAppPopup} >
                <ClickAwayListener onClickAway={() => {
                    closeAppPopup()
                }}>
                    <div onClick={(e) => e.stopPropagation()} className={style.child}>
                        <p className={style.text}>{ 'asdasdasdasd'}</p>
                        <div>
                            <button  className={style.redBtn}>
                                {'Block'}
                            </button>
                            <button className={style.btn}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </ClickAwayListener>
            </Modal>
        </div>
    )
}
