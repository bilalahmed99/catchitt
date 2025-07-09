import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

const getBase64FromFile = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

const getSrcFromFile = (file: any) => {
    console.log('getSrcFromFile');
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
            console.log('loaded');
            resolve(reader.result);
        };
    });
};

const Cropbox = ({ onChangeImage }: any) => {
    const [fileList, setFileList] = useState<any>([]);

    const onChange = ({ fileList: newFileList }: any) => {
        setFileList(fileList);
    };

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

    const onPreview = async (file: any) => {
        const src = file.url || (await getSrcFromFile(file));
        const imgWindow = window.open(src);

        if (imgWindow) {
            const image = new Image();
            image.src = src;
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src;
        }
    };

    const onCropped = (c: string) => {
        console.log(c);
    };

    const beforeUpload = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log("afff")
            // console.log(reader.result)

            onChangeImage(reader.result);
            setFileList((prev: any) => [...prev, { url: reader.result }]);
        };

        // then upload `file` from the argument manually
        return false;
    };

    return (
        <div style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}>
            <ImgCrop showGrid rotationSlider showReset cropShape="round">
                <Upload
                    action={onCropped as any}
                    listType="picture-circle"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length < 1 && '+ ' + t('Upload')}
                </Upload>
            </ImgCrop>
        </div>
    );
};

export default Cropbox;
