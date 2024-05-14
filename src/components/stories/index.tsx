 
import { useState } from 'react';
import Navbar from '../../shared/navbar';
import StoryEditor from './components/story-editor';
import UploadStory from './components/upload-story';
 
const CreateStoryPage = () => {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [videoUrl, setVideoUrl] = useState<any>("");
    const [fileType, setFileType] = useState<any>("");


    const selectFilesHandler = (e: any) => {
         console.log("change in video file")
        const file = e.target.files[0];
        setSelectedFile(file)

        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);
        console.log("videoUrl")
        console.log(videoUrl)
        console.log("videoRef")

        setSelectedFile(file);

        // Check file type
        setFileType(file.type);

      

        // console.log(videoRef)
        //  console.log("hiddenCanvas")
        // console.log(hiddenCanvas)
        
        // hiddenVdeoRef.current.src = videoUrl;
        // hiddenVdeoRef.src = videoUrl;
        
        // videoRef.current.src = videoUrl;
        // videoRef.src = videoUrl;
    };
    return (
        <div className="flex flex-col">
            <Navbar />
        
            {
                selectedFile == null ? (
                    <UploadStory selectFilesHandler={selectFilesHandler} />
                ) : (
                    <StoryEditor  file={selectedFile} />
                )
            }
           
        </div>
    );
}

export default CreateStoryPage