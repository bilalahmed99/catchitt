import React, { useEffect, useState } from 'react';
import styles from './likesModal.module.scss';
import settingsIcon from '../svg-components/cross-light-icon.svg';

interface LikesModalProps { 
    isPublic: boolean;
    name: string;
    totalLikes: number;
    closeLikes: () => void;
}

function LikesModal({ isPublic, name, totalLikes, closeLikes }: LikesModalProps) {
    const [darkTheme, setDarkTheme] = useState(false);
    
    useEffect(() => {
        const themeColor = localStorage.getItem('theme');
        setDarkTheme(themeColor === "dark");
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className={`${darkTheme ? 'dark' : ''} relative`}>
            <div className={`${styles['main-container']} ${darkTheme ? 'bg-[#212529]' : 'bg-white'}`}>
                {/* Close button */}
                <div 
                    onClick={closeLikes}>                    
                    <img className='h-8 w-8 object-contain cursor-pointer absolute top-2 right-2 rounded-full bg-[#54545480]'
                        src={settingsIcon} alt="" />  
                </div>

                {/* Header section */}
                <div className={styles.header}>
                    <span className={`${styles.name} ${darkTheme ? 'text-white' : ''}`}>
                        {name}
                    </span>
                    <span className={`${styles.separator} ${darkTheme ? 'text-white' : ''}`}>
                        {' '}
                    </span>
                    <span className={`${styles.likes} ${darkTheme ? 'text-white' : ''}`}>
                        received {totalLikes} likes across all videos.
                    </span>
                </div>

                {/* Image */}
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0c16193d-6c9b-4a3e-bc02-83ed59d6794f?apiKey=8f7324cf1f4747198abbea6be25c359c&"
                    className={styles["image-wrapper"]}
                    alt="Social Media Stats"
                />
            </div>
        </div>
    );
}

export default LikesModal;