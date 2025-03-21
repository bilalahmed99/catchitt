import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";


const MuteAdvertisers: React.FC = () => {
 
 

 
  return (
      <div className=" w-100 p-3">
      <Typography className="border-top pt-3">
            <div className="d-flex justify-between">
                <div >
                    <div className='text-left'>
                        <p className='text-base'>Smart Valley</p>
                    </div>
                </div>
                <label className="toggle-switch !left-1">
                    <input 
                    style={{zIndex: '9999', height: '2.75rem', width: '4rem', position: 'relative', cursor:'pointer'}}
                        type="checkbox"
                        name="autoScrollCheckbox" 
                        id="autoScrollCheckbox" 
                    />
                    <b className="slider"></b>
                </label>
            </div>
        </Typography>
      </div>
  );
};

export default MuteAdvertisers;
