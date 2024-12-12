interface TYpes {
    entity: string;
    onclose: any;
    darkTheme: boolean;
}

function VideoDeleteSuccess({ entity, darkTheme, onclose }: TYpes) {
    return (
        <div className={`h-fit w-[27rem] p-8 ${darkTheme? 'bg-[#181818]':'bg-white'} rounded-lg`}>
            <p className={`font-semibold text-lg text-center ${darkTheme?'text-white':'text-custom-dark-222'}`}>{entity?entity.charAt(0).toUpperCase()+entity.slice(1):'Video'} Deleted Successfully</p>
            <button
                className="w-full bg-[#ff3b5c] outline-none border-none mt-2 text-white text-md rounded-lg flex justify-center items-start text-center"
                onClick={onclose}
            >
                Done
            </button>
        </div>
    );
}

export default VideoDeleteSuccess;
