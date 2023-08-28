import React, { useState, ChangeEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Gift } from '../post/svg-components/Gift'
import { SendComment } from '../post/svg-components/SendComment'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';

interface InputFieldProps {
    e?: any;
    type: string;
    className?: string;
    placeholder: string;
    value?: any;
    onChange?: any;
    showcommentsIcons?: boolean;
    iconClick?: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, className, iconClick, placeholder, showcommentsIcons, ...restProps }) => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [showCommentIcons, setShowCommentIcons] = useState(showcommentsIcons);
    let showCommentIcons = showcommentsIcons;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
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
                            {showCommentIcons && (
                                <Gift />
                            )}
                            {showPassword ? (
                                <VisibilityOff onClick={handleTogglePasswordVisibility} />
                            ) : (
                                <Visibility onClick={handleTogglePasswordVisibility} />
                            )}
                        </InputAdornment>
                    ) :
                        <InputAdornment position="start">
                            {showCommentIcons && (
                                <div style={{ display: "flex", gap: '16px' }}>
                                    <Gift />
                                    <Button sx={{ margin: '0px', padding: '0px', minWidth: '0px' }}
                                        onClick={iconClick}>
                                        <SendComment />
                                    </Button>
                                </div>
                            )}

                        </InputAdornment>
                ,
            }}
            {...restProps}
        />
    );
};

export default InputField;
