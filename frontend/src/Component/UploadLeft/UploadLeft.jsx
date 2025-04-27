import React from 'react'
import uploadLeft from "./UploadLeft.module.css"
import icnos from "../../assets/colorlogo.png";
import diamond from "../../assets/diamond-line.png"
import widget from "../../assets/checkbox-multiple-blank-line.png";
import add from "../../assets/add-line.png";
import pencil from "../../assets/pencil-line.png";
import setting from "../../assets/settings-2-line.png";
import profile from "../../assets/profile.png"

const UploadLeft = () => {
  return (
    <div>
       <div className={uploadLeft.left}>
                <div>
                    <div className={uploadLeft.leftImageDiv}>
                        <img src={icnos} alt="icon" className={uploadLeft.leftIcon} />
                    </div>
                    <div className={uploadLeft.leftContent}>
                        <div className={uploadLeft.leftData}><img src={add} alt="Plus" className={uploadLeft.leftIconsData} />Add your Podcast (s)</div>
                        <div className={uploadLeft.leftData}><img src={pencil} alt="Create" className={uploadLeft.leftIconsData} />Create & Repurpose</div>
                        <div className={uploadLeft.leftData}><img src={widget} alt="Widget" className={uploadLeft.leftIconsData} />Podcast Widget</div>
                        <div className={uploadLeft.leftData}><img src={diamond} alt="Upgrade" className={uploadLeft.leftIconsData} />Upgrade</div>
                    </div>
                </div>

                <hr />
                <div className={uploadLeft.leftDownDiv}>
                    <div className={uploadLeft.leftHelp}>
                        <img src={setting} alt="Help" className={uploadLeft.leftIconsImage} /> Help
                    </div>
                    <hr className={uploadLeft.hrline} />
                    <div className={uploadLeft.settingContainer}>
                        <div><img src={profile} alt="Profile" /></div>
                        <div className={uploadLeft.leftUserDetail}>
                            <p className={uploadLeft.username}>UserName</p>
                            <p className={uploadLeft.email}>test@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default UploadLeft