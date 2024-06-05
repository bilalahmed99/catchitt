import React from 'react';

const ItemLogin = ({ name, image, styles="" }: { name: string; image: any; styles?: any }) => {
    return (
        <div
            className={`rounded-[0.5rem] font-medium text-base flex flex-row items-center border border-loginItem h-11 px-3 cursor-pointer hover:bg-slate-100 ${styles}`}
        >
            <img className="object-contain h-4 w-4" src={image} />
            <p className="mx-auto text-[0.938rem]">{name}</p>
        </div>
    );
};

export default ItemLogin;
