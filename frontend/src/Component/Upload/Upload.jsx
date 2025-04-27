/* eslint-disable no-unused-vars */
import React from 'react'
import upload from "./Upload.module.css";

import UploadRight from '../UploadRight/UploadRight';
import UploadLeft from '../UploadLeft/UploadLeft';
const Upload = () => {

    return (
        <div className={upload.mainContainer}>
            <UploadLeft/>
            <UploadRight />
        </div>
    )
}

export default Upload;