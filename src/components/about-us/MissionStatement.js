import { useState, useEffect } from "react"
import "./MissionStatement.css"

const imageLinks = [
    "https://static.wixstatic.com/media/f1982d_9ecd59817adc4820a5a87516be1ce5e8~mv2.jpg/v1/fill/w_1770,h_554,fp_0.50_0.35,q_85,usm_0.66_1.00_0.01,enc_auto/5U2A2168.jpg",
    "https://static.wixstatic.com/media/f1982d_36f582ba2cc64cf8bb9b437605d6e42a~mv2.jpg/v1/fill/w_1770,h_534,fp_0.50_0.34,q_85,usm_0.66_1.00_0.01,enc_auto/5U2A2634.jpg",
    "https://static.wixstatic.com/media/f1982d_6be361f75ee340d58f9ef37479aadff6~mv2.jpg/v1/fill/w_1770,h_1096,fp_0.50_0.30,q_85,usm_0.66_1.00_0.01,enc_auto/5U2A2226.jpg"
]

export const MissionStatement = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const carouselInfiniteScroll = () => {
        if (currentIndex === imageLinks.length - 1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => carouselInfiniteScroll(), 3000);
        return () => clearInterval(interval)
    })

    return (
        <div className="mission-container">
            <div className="carousel-container">
                {imageLinks.map((link, index) => {
                    return (
                        <img key={index} src={link} className="carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }} alt=""/>
                        
                    )
                })}
            </div>
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