import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back, chevronDown, logoAuth } from '../../icons';
import { APP_TEXTS } from '../../utils/constants';

const PhoneOrEmail = (props: any) => {
    const [loginWithPhone, setLoginWithPhone] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<any>(null);
    const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);
    const [countryModelOpened, setCountryModelOpened] = useState(false);

    // Input Values
    const [phoneNumber, setPhoneNumber] = useState<any>(null);

    const toggleLoginMethod = () => {
        setLoginWithPhone(!loginWithPhone);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: { target: { value: any } }) => {
        const inputValue = event.target.value;

        if (/^\d{0,6}$/.test(inputValue)) {
            setCode(inputValue);
            setError('');
        } else {
            setError('Enter 6-digit code');
        }
    };

    const loginOrForgetPasswordHandler = () => {
        if (loginWithPhone && !loginWithPassword) {
            loginWithPasswordToggler();
        } else {
            forgetPasswordHandler();
        }
    };

    const loginWithPasswordToggler = () => {
        setLoginWithPassword(!loginWithPassword);
    };

    const forgetPasswordHandler = () => {
        console.log('Forget password');
    };

    const countryCodeModelHandler = () => {
        setCountryModelOpened(!countryModelOpened);
    };

    const goBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className="h-screen">
            <div className="flex flex-row justify-between items-center p-3">
                <img className="object-contain h-12 w-24" src={logoAuth} />
                <div className="flex flex-row justify-center items-center gap-2">
                    <p className="border-[2px] rounded-full w-5 h-5 text-xs text-gray-400 font-semibold border-gray-400 text-center cursor-pointer">
                        ?
                    </p>
                    <p className="hover:underline cursor-pointer">{APP_TEXTS.FEEDBACK}</p>
                </div>
            </div>
            <div className="w-[22.688rem] mx-auto mt-14 h-auto">
                <div className="overflow-auto">
                    <h2 className="font-bold text-3xl">Log in</h2>
                    <div className="flex flex-row justify-between items-center mt-3.5">
                        <p className="font-medium text-[0.938rem]">
                            {loginWithPhone ? 'Phone' : 'Email or username'}
                        </p>
                        <p
                            onClick={toggleLoginMethod}
                            className="font-medium text-xs text-gray-600 cursor-pointer hover:underline"
                        >
                            {loginWithPhone ? 'Log in with email or username' : 'Log in with phone'}
                        </p>
                    </div>
                    {loginWithPhone ? (
                        <>
                            <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                                <div
                                    onClick={countryCodeModelHandler}
                                    className="flex flex-row items-center gap-2 flex-1 cursor-pointer"
                                >
                                    <p>AL +335</p>
                                    <img
                                        className={`object-contain h-2.5 w-2.5 chevron ${
                                            countryModelOpened ? 'rotate' : ''
                                        }`}
                                        src={chevronDown}
                                    />
                                    <p className="text-gray-400 "> | </p>
                                </div>
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type="tel"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            {!loginWithPassword ? (
                                <>
                                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                        <input
                                            className="w-2/3 bg-gray-100"
                                            type="number"
                                            maxLength={6}
                                            placeholder="Enter 6-digit code"
                                            value={code}
                                            onChange={handleChange}
                                        />
                                        <div
                                            className={`flex flex-row justify-center items-center gap-2 flex-1 ${
                                                phoneNumber?.length > 0
                                                    ? 'cursor-pointer'
                                                    : 'cursor-not-allowed'
                                            }`}
                                        >
                                            <p className="text-gray-400 "> | </p>
                                            <p>Send code</p>
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="text-red-500 font-normal text-xs text-left mt-2">
                                            {error}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row justify-between items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                        <input
                                            className="w-2/3 bg-gray-100"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                        />
                                        {!showPassword ? (
                                            <Visibility
                                                style={{ cursor: 'pointer' }}
                                                onClick={togglePassword}
                                            />
                                        ) : (
                                            <VisibilityOff
                                                style={{ cursor: 'pointer' }}
                                                onClick={togglePassword}
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-2 rounded-md p-2.5">
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type="text"
                                    placeholder="Email or username"
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center border border-gray-500 bg-gray-100 mt-2 rounded-md py-2.5 px-3">
                                <input
                                    className="w-2/3 bg-gray-100"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                />
                                {!showPassword ? (
                                    <Visibility
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePassword}
                                    />
                                ) : (
                                    <VisibilityOff
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePassword}
                                    />
                                )}
                            </div>
                        </>
                    )}

                    <p
                        onClick={loginOrForgetPasswordHandler}
                        className={`font-medium text-left text-xs text-gray-600 mt-2.5 ${
                            loginWithPhone && !loginWithPassword
                                ? 'hover:underline cursor-pointer'
                                : ''
                        } `}
                    >
                        {loginWithPhone && !loginWithPassword ? (
                            'Log in with password'
                        ) : loginWithPassword ? (
                            <div className="flex flex-row items-center gap-3 -mt-2.5">
                                <p
                                    onClick={forgetPasswordHandler}
                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                >
                                    Forgot password?
                                </p>
                                <p className="font-medium text-left text-xs text-gray-300 mt-2.5 hover:underline cursor-pointer">
                                    |
                                </p>
                                <p
                                    onClick={loginWithPasswordToggler}
                                    className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                                >
                                    Log in with code
                                </p>
                            </div>
                        ) : (
                            <p
                                onClick={forgetPasswordHandler}
                                className="font-medium text-left text-xs text-gray-600 mt-2.5 hover:underline cursor-pointer"
                            >
                                Forgot password?
                            </p>
                        )}
                    </p>
                    <div className="flex flex-row items-center border border-gray-500 bg-gray-100 mt-4 rounded-md py-2.5 px-3 cursor-pointer">
                        <div className="flex flex-row justify-center items-center gap-2 flex-1">
                            <p>Log in</p>
                        </div>
                    </div>
                    <div
                        onClick={goBackHandler}
                        className="flex flex-row justify-center items-center gap-2 mt-4 cursor-pointer"
                    >
                        <img src={back} className="h-2.5 w-2.5 object-contain" />
                        <p className="font-medium text-xs">Go Back</p>
                    </div>
                </div>
            </div>
            <div className="absolute w-full bottom-0">
                <div className="border-t border-custom-1 text-center p-4">
                    <h3 className="font-normal text-[0.938rem] flex flex-row items-center justify-center gap-1">
                        {APP_TEXTS.NO_ACCOUNT}{' '}
                        <span className="text-danger-1 font-semibold hover:underline cursor-pointer">
                            {APP_TEXTS.SIGN_UP}
                        </span>
                    </h3>
                </div>
                <div className="bg-black flex flex-row justify-between items-center py-6 px-32">
                    <div className="border border-custom-2 pl-2 rounded-sm w-[10rem] cursor-pointer">
                        <p className="text-white text-left p-2 font-normal text-sm">English</p>
                    </div>
                    <p className="font-normal text-sm text-white">© 2024 Seezitt</p>
                </div>
            </div>
        </div>
    );
};

export default PhoneOrEmail;
