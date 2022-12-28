import { useState, useEffect } from "react"
import "./Carousel.css"

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

export const Carousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const carouselInfiniteScroll = () => {
        if (currentIndex === imageNames.length - 1) {
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => carouselInfiniteScroll(), 3000);
        return () => clearInterval(interval)
    })

    return (
        <div className="carousel-container">
            {imageNames.map((link, index) => {

                // return <img key={index} src="media/gallery1.heic" className="carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }} alt=""/>
                return (
                    <img key={index} src={`media/${link}`} className="carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }} alt=""/>
                    
                )
            })}
        </div>
    )
}

export default Carousel