import React, { useState, useEffect } from 'react';
import project from "./Project.module.css";
import logo from "../../assets/colorlogo.png";
import notification from "../../assets/notifications.png";
import setting from "../../assets/setting.png";
import plus from "../../assets/plus.png";
import group from "../../assets/Group 16.png";
import api from "../../config/api";
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const [modal, setModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [projects, setProjects] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [showProjects, setShowProjects] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get("/api/projects/all");
            alert("fetched all project list")
            setProjects(response.data);
            setProjectCount(response.data.length);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleModal = () => {
        setModal(!modal);
    };

    const handleProject = async () => {
        if (!projectName) {
            setError("Project Name is Required!");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post("/api/project/create", { name: projectName });
            if (response.status === 201 || response.status === 200) {
                alert("Project created successfully")
                setSuccess("Project created successfully");
                setProjectName("");
                setModal(false);
                fetchProjects(); 
                setShowProjects(true); 
            } else {
                setError("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
            setError(error.response?.data?.error || "Failed to create project. Try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const routeToUpload = async() =>{
        navigate("/upload")
    }

    return (
        <div className={project.container}>
            <div className={project.header}>
                <div>
                    <img src={logo} alt="Logo" className={project.logo} />
                </div>
                <div className={project.icons}>
                    <img src={setting} alt="Settings" className={project.icon} />
                    <img src={notification} alt="Notifications" className={project.icon} />
                </div>
            </div>
            {showProjects ? (
                <div className={project.projectsSection} onClick={routeToUpload}>
                    <div className={project.projectsHeader}>
                        <h1>Projects</h1>
                        <button className={project.buttonTag} onClick={handleModal}>
                            <img src={plus} alt="Addition" className={project.add} />Create New Project
                        </button>
                    </div>
                    <div className={project.projectCountCard}>
                        <h2>Total Projects</h2>
                        <p>{projectCount}</p>
                    </div>
                </div>
            ) : (
                <div className={project.details}>
                    <h1 className={project.heading}>Create a New Project</h1>
                    <img src={group} alt="Group Photo" className={project.mainImg} />
                    <p className={project.lorem}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae impedit quibusdam quisquam quidem, excepturi deserunt maiores nostrum odio aspernatur veniam. Maiores excepturi inventore error a quaerat autem in magnam voluptate.
                    </p>
                    <button className={project.buttonTag} onClick={handleModal}>
                        <img src={plus} alt="Addition" className={project.add} />
                        <p className={project.create}>Create New Project</p>
                    </button>
                </div>
            )}
            {modal && (
                <div className={project.modalOverlay}>
                    <div className={project.modalContent}>
                        <h1 className={project.modalHeading}>Create Project</h1>
                        <div className={project.inputData}>
                            <label className={project.modalLabel}>Enter Project Name:</label>
                            <input
                                type="text"
                                placeholder="Type Here"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className={project.inputModal}
                            />
                            {error && <p className={project.error}>{error}</p>}
                            {success && <p className={project.success}>{success}</p>}
                        </div>
                        <div className={project.buttonDiv}>
                            <button onClick={handleModal} className={project.modalCancel}>Cancel</button>
                            <button
                                onClick={handleProject}
                                disabled={loading}
                                className={project.createButton}
                            >
                                {loading ? <span className={project.loader}></span> : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;