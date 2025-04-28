/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './Transcript.module.css';
import arrow from "../../assets/ep_back.png"
import api from '../../config/api';
import logout from "../../assets/logout-box-r-line.png";
import home from "../../assets/home.png";
import { useNavigate } from 'react-router-dom';
import notification from "../../assets/notification-line.png";
import UploadLeft from '../UploadLeft/UploadLeft';

const Transcript = () => {
    const [transcript, setTranscript] = useState([
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",

    ]);
    const navigate = useNavigate();
    const [editedTranscript, setEditedTranscript] = useState(transcript);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (index, value) => {
        const newTranscript = [...editedTranscript];
        newTranscript[index] = value;
        setEditedTranscript(newTranscript);
    };

    const handleSave = () => {
        setTranscript(editedTranscript);
        setIsEditing(false);
        alert('Transcript saved!');
    };

    const handleDiscard = () => {
        setEditedTranscript(transcript);
        setIsEditing(false);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleLogout = async () => {
        try {
            await api.post("/api/logout");
            localStorage.removeItem('token');
            alert("Logout Successfully")
            navigate("/");
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
        }
    };
    const previousHandle = () =>{
        navigate("/upload")
    }

    return (
        <div className={styles.container}>
            <UploadLeft className={styles.leftSide}/>

            <div className={styles.mainContent}>
                <div className={styles.headingHome}>
                    <div className={styles.arrow}>
                        <img src={home} alt="home" className={styles.homeIcon} />
                        <p className={styles.headingHomeSample}>Home Page / Sample Project / <span className={styles.headingHomeSpan}>Add your podcast</span></p>
                    </div>
                    <div className={styles.groupIcon}>
                        <img src={notification} alt="notification" className={styles.notification} />
                        <img src={logout} alt="logout" className={styles.notification} onClick={handleLogout} />
                    </div>
                </div>
                <div className={styles.header}>
                    <h2 className={styles.headerTitle}><img src={arrow} alt="arrow" className={styles.arrowIcon} onClick={previousHandle} />Edit Transcript</h2>
                    <div className={styles.headerButtons}>
                        {isEditing ? (
                            <>
                                <button className={styles.discardButton} onClick={handleDiscard}>Discard</button>
                                <button className={styles.saveButton} onClick={handleSave}>Save</button>
                            </>
                        ) : (
                            <button className={styles.editButton} onClick={handleEditClick}>Edit</button>
                        )}
                    </div>
                </div>
                <div className={styles.transcriptContainer}>
                    {editedTranscript.map((text, index) => (
                        <div key={index} className={styles.transcriptItem}>
                            <textarea
                                className={styles.textarea}
                                value={text}
                                onChange={(e) => handleEdit(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transcript;