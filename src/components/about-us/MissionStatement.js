import { useState, useEffect } from "react"
import Carousel from "../general/Carousel"
import "./MissionStatement.css"

const imageNames = [
    "gallery1.png",
    "gallery2.png",
    "gallery3.png",
    "gallery4.png",
    "gallery5.png",
    "gallery6.png",
    "gallery7.png",
    "gallery8.png",
    "gallery9.png",
    "gallery10.png",
    "gallery11.png",
    "gallery12.png",
    "gallery13.png",
]

export const MissionStatement = () => {

    return (
        <div className="mission-container">   
            <Carousel/>         
            <p className="mission-txt">
                ELCA's Student Government Association is comprised of Student Council, Unity 
                Council, and Spiritual Life in order to promote inclusion and Christlike culture 
                within the student body. The website was built so that students can have
                more access to event planning, sign ups, and a platform to learn more about our 
                executive board. If you have any questions or concerns feel free to contact us
                at <u>sga@elcachargers.org</u>!
            </p>
        </div>
    )
}

export default MissionStatement