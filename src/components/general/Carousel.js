import { useState, useEffect } from "react"
import "./Carousel.css"

const imageLinks = [
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery4.png?alt=media&token=36de81b7-3b27-4691-bc7b-39078a13e62a",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery1.png?alt=media&token=04f5214f-69aa-4d2e-b4c3-51b55cfb80e9",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery2.png?alt=media&token=d8c5e51d-586e-47c9-8b1c-af3cc1e21ad7",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery3.png?alt=media&token=1e2da9e9-ab07-4f72-8302-b4f01bf31fd8",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery5.png?alt=media&token=dd95fa31-59e8-4222-9076-77a9d84a6077",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery6.png?alt=media&token=32e2bb3e-a8c1-4974-8fc1-0846f92f225c",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery7.png?alt=media&token=0582e302-4d06-45bb-921a-8a53f4d49c6d",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery8.png?alt=media&token=9285e613-a1e5-4459-a721-3d82d4855c68",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery9.png?alt=media&token=6023151c-b236-4a64-bc1e-bc849894cabc",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery10.png?alt=media&token=905bba32-893f-4c52-82b0-5c808cf0e995",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery11.png?alt=media&token=a0d88c2c-e511-4f4e-adbe-6c08c00d5cf6",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery12.png?alt=media&token=8f9ef6fe-268a-41cd-b55e-ec56663b604e",
    "https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Fgallery13.png?alt=media&token=3ed50861-945e-483c-a6a2-b1de6056d80a",
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