import { Button, CircularProgress, styled } from '@mui/material';

function CustomButton(props: any) {
    const {
        width = '100%',
        height = '40px !important',
        text,
        color,
        islight,
        fontSize = 14,
        fontWeight = 600,
        backgroundColor,
        loading,
        preference,
        ...restProps
    } = props;
    const BasicButton = styled(Button)(({ theme }) => ({
        width,
        height,
        color: color ? color : !islight ? '#FFF !important' : 'rgb(255, 59, 92) !important',
        backgroundColor: backgroundColor
            ? backgroundColor
            : !islight
            ? 'rgb(255, 59, 92) !important'
            : '#FFF !important',
        border: '1px solid rgb(255, 59, 92)',
        fontSize,
        fontWeight,
        [theme.breakpoints.down(600)]: {
            width: '169px  !important',
        },
        [theme.breakpoints.down(500)]: {
            width: '100%  !important',
        },
        textTransform: 'none',
    }));
    return (
        <BasicButton {...restProps} autoCapitalize="none">
            {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.56752 0.417969L8.91939 6.83105L13.2713 0.417969C13.7342 0.746338 14.4581 1.72353 13.6669 2.98953C13.6669 2.98953 11.2773 6.82314 10.1696 8.67466L11.6888 10.9099C13.1526 9.81406 15.1782 10.4075 16.2701 11.8911C17.3779 13.3945 17.3858 15.6139 15.914 16.7771C14.4384 17.9402 12.3772 17.3507 11.2655 15.8473C10.4663 14.7633 10.2368 13.3074 10.7274 12.1443L8.91939 9.51734L7.11534 12.1443C7.60196 13.3074 7.37646 14.7594 6.57334 15.8434C5.46163 17.3507 3.39251 17.9402 1.91683 16.7771C0.437193 15.6139 0.445106 13.3984 1.56077 11.8951C2.65269 10.4115 4.67829 9.81406 6.15002 10.9099L7.66922 8.67466C6.51613 6.77185 5.35033 4.87676 4.17189 2.98953C3.38064 1.72353 4.10464 0.746338 4.56752 0.417969ZM12.5591 12.2353C11.9578 12.71 11.7679 13.8574 12.5077 14.8662C13.2475 15.8711 14.3672 15.9819 14.9725 15.5032C15.5778 15.0284 15.7716 13.8811 15.0278 12.8722C14.288 11.8674 13.1684 11.7566 12.5631 12.2353H12.5591ZM5.27569 12.2353C4.66642 11.7526 3.54285 11.8674 2.79907 12.8722C2.05926 13.8771 2.2452 15.0244 2.85446 15.5032C3.46372 15.9858 4.5873 15.8711 5.33108 14.8662C6.07485 13.8613 5.88495 12.714 5.27569 12.2353Z" fill="black"/>
            </svg> */}

            {loading ? (
                <div style={{ width: 20, height: 20 }}>
                    <CircularProgress />
                </div>
            ) : (
                text
            )}
        </BasicButton>
    );
}

export default CustomButton;
