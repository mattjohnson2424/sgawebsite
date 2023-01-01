import { useState, useEffect } from "react"
import "./Carousel.css"

const imageLinks = [
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga1.jpeg?alt=media&token=99084003-c8eb-4ad9-8329-3cd5501f84e3",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga2.jpeg?alt=media&token=d1649d32-6dff-4d70-a9a6-232c10e72264",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga3%20Large.jpeg?alt=media&token=1fd4276d-e13e-45b1-824a-0788a2cf3306",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga4%20Large.jpeg?alt=media&token=6bc8f22e-5e7a-4fb6-b3f4-e4049115ca8c",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga5%20Large.jpeg?alt=media&token=6f26d946-111c-43e5-bdd5-be1c79e06924",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga6%20Large.jpeg?alt=media&token=479845b7-c993-4d88-91a4-1650d1405720",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga7%20Large.jpeg?alt=media&token=1e6d7372-2b95-479f-b2b1-f3c12cf39cfe",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga8%20Large.jpeg?alt=media&token=d8b656c3-600f-4bbe-8d10-01cd525f6196",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga9%20Large.jpeg?alt=media&token=382170f3-d385-4e6e-9f89-1740fade6ac4",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga10%20Large.jpeg?alt=media&token=55dea9af-be89-4b2a-b3fb-d943d9628fc7",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga11%20Large.jpeg?alt=media&token=6e760334-4b37-4e3e-aab7-78b236854f66",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga12%20Large.jpeg?alt=media&token=2bc58951-7809-4968-b114-7b8443e6669d",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fsga13.jpeg?alt=media&token=d7afbeb2-8e68-45ee-aa3c-df9e49a1d5be",
]

export const Carousel = () => {

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
        <div className="carousel-container">
            {imageLinks.map((link, index) => {

                // return <img key={index} src="media/gallery1.heic" className="carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }} alt=""/>
                return (
                    <img key={index} src={link} className="carousel-item" style={{ transform: `translate(-${currentIndex * 100}%)` }} alt=""/>
                    
                )
            })}
        </div>
    )
}

export default Carousel