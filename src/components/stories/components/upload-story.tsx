import { useRef } from 'react';
import { uploadPrimaryIcon } from '../../../icons';
import CustomButton from '../../../shared/buttons/CustomButton';
 
function UploadStory({ selectFilesHandler }: any) {


    const inputElementRef =  useRef<any>(null);
        const upload = () => {
        inputElementRef?.current?.click();
    };
    return (
        <div className="w-[100%]  h-[100vh]  flex justify-center items-center pt-[5rem]">
            <div className="min-w-[30%] h-[95%] bg-custom-light xl:w-[31.5rem] rounded-[0.5rem] p-[1.5rem]">
                <div
                    style={{ border: '1px dashed #BABABA' }}
                    className="rounded-[0.5rem] px-[1rem] py-[4rem] h-[100%] flex justify-center  items-center"
                >
                    <div className="flex flex-col items-center gap-[0.5rem]">
                        <div className="w-[71px] h-[71px] rounded-[50%] bg-custom-gray-100 flex justify-center items-center cursor-pointer select-none">
                            <img className="w-[42px] h-[42px]" src={uploadPrimaryIcon} alt="" />
                        </div>
                        <p className="text-[20px] font-semibold leading-[24px] mt-[1rem]">
                            Select Media
                        </p>
                        <p className="font-mediun text-custom-color-999">Drag and drop files</p>
                       
                        <p className="font-mediun text-custom-color-999 mt-[1rem]">
                            Support mp4, avi, webm, mov, png, jpeg format
                        </p>
                        <p className="font-mediun text-custom-color-999">Up to 60 seconds</p>
                        <p className="font-mediun text-custom-color-999">Less than 20 MB</p>
                        {/* <p className="font-mediun text-custom-color-999 mb-[1rem]">
                            Less than 30 videos
                        </p> */}
                        <CustomButton
                            onClick={upload}
                            text="Select files"
                            width="453px !important"
                        />

                        <input
                            ref={inputElementRef}
                            onChange={selectFilesHandler}
                            type="file"
                            className="hidden"
                            accept="image/*,video/*"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadStory;
