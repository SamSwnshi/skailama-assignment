import React, { useState } from 'react';
import cloudUpload from '../../assets/cloud_upload.png';
import feed from "../../assets/image 1.png";
import youtube from "../../assets/image 2.png";
import update from "../../assets/Vector.png";
import cross from "../../assets/close-large-line.png";
import logout from "../../assets/logout-box-r-line.png";
import home from "../../assets/home.png";
import notification from "../../assets/notification-line.png";
import uploadRight from "./UploadRight.module.css";
import api from '../../config/api';
import {  useNavigate } from 'react-router-dom';

const UploadRight = () => {
    const data = [
        {
            heading: "RSS Feed",
            subheading: "Lorem ipsum dolor sit amet.",
            image: feed,
        },
        {
            heading: "Youtube Video",
            subheading: "Lorem ipsum dolor sit amet.",
            image: youtube,
        },
        {
            heading: "Upload files",
            subheading: "Lorem ipsum dolor sit amet.",
            image: update,
        },
    ];

    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', transcript: '' });
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleModal = () => {
        setModal(!modal);
    };

    const handleUpload = async () => {
        try {
            const response = await api.post('/api/youtube/create', formData);
            console.log('Upload successful:', response.data);
            alert('Upload successful!');
            setUploadSuccess(true);
            handleModal();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogout = async () => {
        try {
            await api.post("/api/logout");
            localStorage.removeItem('token');
            navigate("/");
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <div>
            <div className={uploadRight.right}>
                <div className={uploadRight.mainBox}>
                    <div className={uploadRight.headingHome}>
                        <div className={uploadRight.arrow}>
                            <img src={home} alt="home" className={uploadRight.homeIcon} />
                            <p className={uploadRight.headingHomeSample}>Home Page / Sample Project / <span className={uploadRight.headingHomeSpan}>Add your podcast</span></p>
                        </div>
                        <div className={uploadRight.groupIcon}>
                            <img src={notification} alt="notification" className={uploadRight.notification} />
                            <img src={logout} alt="logout" className={uploadRight.notification} onClick={handleLogout} />
                        </div>
                    </div>
                    {!uploadSuccess ? (
                        <div>
                            <h1 className={uploadRight.addPodcast}>Add Podcast</h1>
                            <div className={uploadRight.dataMap}>
                                {data.map((items, idx) => (
                                    <div key={idx} className={uploadRight.divs}>
                                        <div className={uploadRight.details}>
                                            <h1 className={uploadRight.heading}>{items.heading}</h1>
                                            <p className={uploadRight.subheading}>{items.subheading}</p>
                                        </div>
                                        <img
                                            src={items.image}
                                            alt={items.heading}
                                            className={uploadRight.icons}
                                            onClick={handleModal}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={uploadRight.uploadingData}>
                                <img src={cloudUpload} alt="cloud upload" className={uploadRight.cloudPhoto} />
                                <p className={uploadRight.para1}>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
                                <p className={uploadRight.para2}>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
                                <button onClick={handleModal} className={uploadRight.selectFile}>Select File</button>
                            </div>
                        </div>
                    ) : (
                        navigate("/transcript")
                    )}
                </div>
            </div>
            {modal && (
                <div className={uploadRight.modalContainer}>
                    <div className={uploadRight.modalContent}>
                        <div className={uploadRight.header}>
                            <div className={uploadRight.iconHeader}>
                                <img src={youtube} alt="Youtube Icon" className={uploadRight.youtube} />
                                <h1 className={uploadRight.headerHeading}>Upload from Youtube</h1>
                            </div>
                            <div onClick={handleModal} className={uploadRight.crossContainer}>
                                <img src={cross} alt="cross" className={uploadRight.cross} />
                            </div>
                        </div>
                        <div className={uploadRight.formInput}>
                            <label className={uploadRight.name}>Name</label>
                            <input
                                type="text"
                                className={uploadRight.inputTag}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={uploadRight.formInput}>
                            <label className={uploadRight.name}>Transcript</label>
                            <textarea
                                className={uploadRight.inputTextarea}
                                name="transcript"
                                value={formData.transcript}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={uploadRight.uploadDiv}>
                            <button className={uploadRight.uploadButton} onClick={handleUpload}>Upload</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadRight;