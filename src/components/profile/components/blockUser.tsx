import React, { useState } from 'react'
import style from './blockUser.module.scss'
import { ClickAwayListener, Modal } from '@mui/material'
import BlockMsgOnError from './blockMsgOnError'
interface TYpes {
    onclose2: any,
}
function BlockUser({ onclose2 }: TYpes) {
    const API_KEY = process.env.VITE_API_URL;

    const [msg, setmsg] = useState(false)
    const ondone = () => {
        setmsg(false)
        // onclose2()
    }

    const blockAUser = async () => {
        try {
            const response = await fetch(`${API_KEY}/profile/${'6547d83ac1ce250c2594a7b9'}/block`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Success:', responseData);
                // Handle non-successful responses here
            } else {
                alert('somrthing went wrong')
            }
            // Handle success response here
        } catch (error: any) {
            console.error('Error:', error.message);
            // Handle error here
        }
    }
    return (
        <div className={style.parent}>
            <Modal open={msg} className={style.modal}>
                <ClickAwayListener onClickAway={() => setmsg(false)}>
                    <BlockMsgOnError onclose={ondone} />
                </ClickAwayListener>
            </Modal>
            <p className={style.title}>Block Sara Said ?</p>
            <p className={style.desc}>They will not be able to send you messages, see your posts, or find your profile. This doesn't include extended scenarios like multi-host livestreams, duets posted by others, or group chats you both participate in. They will not be notified that you blocked them.</p>
            <button onClick={blockAUser} className={style.block}>Block</button>
            <button onClick={onclose2} className={style.cancel}>Cancel</button>
        </div>
    )
}

export default BlockUser
