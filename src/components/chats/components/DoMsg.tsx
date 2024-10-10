import React,{ useEffect, useRef, useState } from 'react';
import { mic, paperClip } from '../../../icons';
import InputEmoji from 'react-input-emoji'
import style from './DoMsg.module.scss';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const DoMsg = ({ onSubmit, msg, setMessage, setMessageType }: any) => {
    const API_KEY = process.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    const [upload, setUpload] = useState<string>('');
    // const inputRef = useRef(null);

    const uploadfile = async(e:any) => {
        
        const file = e.target.files[0];
        if (file == undefined) {
          return false;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);

        let formData = new FormData();
        formData.append("file", file);
    
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        };
        let messageURL = await axios
          .post(`${API_KEY}/util/file`, formData, config)
          .then((responce) => {
            console.log(responce, "responseresp");
            let msgUrl = responce.data.data;
            // let msgUrlType = e.target.type;
            return msgUrl;
            // setMessage(msgUrl); 
            // setMessageType(msgUrlType);
            // console.log("responseresp", responce.data.data, msg,"responseresp new", msgUrl, msgUrlType)
            // setUpload("upload");
            // console.log("responseresp", msg)
            // setTimeout(() => {
            //     onSubmit(e)
            //   }, 5000);
            
            // onSubmit(e);
            // onSubmit.click();
            // document.getElementById('btnSearch').click();
          })
          .catch((error) => {
            console.log(error);
          });
          
          setMessage(messageURL); 
          let msgUrlType = e.target.type;
          setMessageType(msgUrlType);
          console.log("responseresp",  msg,"responseresp new", messageURL, msgUrlType)
          console.log("end resp")
          onSubmit(e);
      };
    
    
    return (
        <div className={style.doMsgContainer}>
            <form onSubmit={onSubmit}  style={{ padding:'0px',background:'#fff',}}>
                    {/* <InputEmoji 
                    onChange={onChange}
                    // type="text"
                    placeholder="Write a message..."
                    value={msg} shouldReturn={false} shouldConvertEmojiToImage={false}                        //  style={ { width:'-webkit-fill-available',
                        //         Padding:'0px' }
                        //  }
                    /> */}
                {/* <p style={{ color: msg.length > 0 ? 'rgb(255, 59, 92)' : '#a9a9a9' }} onClick={onSubmit}>
                    Send
                </p> */}
                <input
                    onChange={(e: any) => {setMessage(e.target.value), setMessageType(e.target.type)} }
                    type="text"
                    placeholder="Write a message..."
                    value={msg}                   
                    style={{ width:'-webkit-fill-available',padding:'0px' }}
                    />
                <SendIcon className={style.sendIcon} onClick={onSubmit}  style={{ fontSize: '23px', }}/>
            </form>
            <div>
                <div className={style.actions}>
                <input type="file" onChange={(e)=>{uploadfile(e) }} className={style.filetype} />
                {/* <input type='hidden' value={upload} onInput={onSubmit}/> */}
                    <img src={paperClip} alt="" />
                </div>
                {/* <div className={style.actions}>
                    <img src={mic} alt="" />
                </div> */}
            </div>
        </div>
    );
};

export default DoMsg;