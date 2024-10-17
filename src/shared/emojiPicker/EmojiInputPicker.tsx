import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiInputPicker = ({ isPickerVisible, onEmojiSelect, inputRef }: any) => {
  const [pickerPosition, setPickerPosition] = useState('bottom');

  useEffect(() => {
    const handlePickerPosition = () => {
      if (inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if there is enough space below the input to open the emoji picker
        if (windowHeight - inputRect.bottom < 350) {
          setPickerPosition('top'); // Open picker above
        } else {
          setPickerPosition('bottom'); // Open picker below
        }
      }
    };

    if (isPickerVisible) {
      handlePickerPosition();
    }

    window.addEventListener('resize', handlePickerPosition);
    return () => {
      window.removeEventListener('resize', handlePickerPosition);
    };
  }, [isPickerVisible]);

  return (
    <>
      {isPickerVisible && (
        <div className="emoji-picker-container"
          style={{
            top: pickerPosition === 'bottom' ? '50px' : '-400px',
          }}
        >
          <EmojiPicker height={400} width={400} onEmojiClick={onEmojiSelect} />
        </div>
      )}
    </>
  );
};

export default EmojiInputPicker;


 {/* {isPickerVisible && <EmojiPicker style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            top: pickerPosition === 'bottom' ? '50px' : '-450px',
          }} height={400} width={400} onEmojiClick={onEmojiSelect} />} */}