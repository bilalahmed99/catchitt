import { t } from 'i18next';
import Input from './Input';
import style from './request-otp.module.scss';

function RequestOtp(props: any) {
    let { errorMessage, email, onChange , onsubmit } = props || {};
    return (
        <div className={style.parent}>
            <p className={style.forgotPassword}> {t('requestotp.title')}</p>
            <p className={style.dontWorry}>{t('requestotp.instruction')}</p>
            <p style={{fontSize:14,color:'red'}}>{errorMessage}</p>
            <Input placeholder={t('email.input')} type="email" value={email} onChange={onChange} />
            <button style={{width:'100%'}} onClick={onsubmit} className={style.submitBtn}>{t('emailmeinstructions.btn')}</button>
        </div>
    );
}

export default RequestOtp;
