import React, { useState, ChangeEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface InputFieldProps {
    e?: any;
    type: string;
    className?: string;
    placeholder: string;
    value?: any;
    onChange?: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, className, placeholder, ...restProps }) => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            value={value}
            onChange={handleChange}
            fullWidth
            placeholder={placeholder}
            className={className}
            InputProps={{
                style: {
                    borderRadius: '8px',
                },
                endAdornment:
                    type === 'password' ? (
                        <InputAdornment position="end">
                            {showPassword ? (
                                <VisibilityOff onClick={handleTogglePasswordVisibility} />
                            ) : (
                                <Visibility onClick={handleTogglePasswordVisibility} />
                            )}
                        </InputAdornment>
                    ) : null,
            }}
            {...restProps}
        />
    );
};

export default InputField;
