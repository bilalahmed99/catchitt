import { mic, paperClip } from '../../../icons';
import style from './DoMsg.module.scss';
const DoMsg = ({ onSubmit, onChange, msg }: any) => {
    return (
        <div className={style.doMsgContainer}>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Write a message..."
                    value={msg}
                />
                <p style={{ color: msg.length > 0 ? 'rgb(255, 59, 92)' : '#a9a9a9' }} onClick={onSubmit}>
                    Send
                </p>
            </form>
            <div>
                <div className={style.actions}>
                    <img src={paperClip} alt="" />
                </div>
                <div className={style.actions}>
                    <img src={mic} alt="" />
                </div>
            </div>
        </div>
    );
};

export default DoMsg;
