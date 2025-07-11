import React, { useState } from 'react';
import { addChat } from '../../../icons';
import Search from '../../../shared/navbar/components/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import UserChat from './chat';
import style from './chats.module.scss';
import ResponsiveDialog from './ResponsiveDialog';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

function UserChats({ data, OnChatClick, id, userPinH, onBlock, setstaredmodal, isDarkTheme, activeConversation, isMuted}: any) {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  interface Languages {
        code: string;
        name: string;
        country_code: string;
    }

  const languages: Languages[] = [
      {
          code: 'en',
          name: 'English',
          country_code: 'gb',
      },
      {
          code: 'ar',
          name: 'العربية',
          country_code: 'sa',
      },
  ];

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t, i18n } = useTranslation();

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  console.log("data response", data);
  return (
    <div className={style.chats}>
      <div className={style.chatHeader}>
        <p className={style.headingText}>{t('Messages')}</p>
        <ResponsiveDialog isDarkTheme={isDarkTheme} />
      </div>
      <div key={id} className={style.userChats}>
        {data?.map((chat: any, index: number) => {
          return <UserChat isActive={activeConversation===chat.conversationId} id={chat.conversationId}  key={chat.conversationId} {...chat} OnChatClick={OnChatClick} userPinH={userPinH} onBlock={onBlock}  setstaredmodal={setstaredmodal} isDarkTheme={isDarkTheme} isMuted={chat.mute} />;
        })}
      </div>
    </div>
  );
}

export default UserChats;