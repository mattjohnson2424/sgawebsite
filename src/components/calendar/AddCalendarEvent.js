import { useContext, useState } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import dayjs from "dayjs"
import Modal from "../general/Modal"
import { addDoc, collection } from "@firebase/firestore"
import { db } from "../../firebase"

const colors = ['red', 'orange', 'gold', 'green', 'blue', 'purple'];


export const AddCalendarEvent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const { daySelected, showEventModal, setShowEventModal } = useContext(CalendarContext)

    const addEvent = async e => {
        e.preventDefault()

        await addDoc(collection(db, "calendar"), {
            title: title,
            description: description,
            date: dayjs(daySelected).format("MM-DD-YYYY"),
            color: selectedColor
        })

        setShowEventModal(false)
        setTitle("")
        setDescription("")
    }

    return (
        <Modal show={showEventModal} onClose={() => setShowEventModal(false)}>
            <form>
                <label htmlFor="new-calendar-event-title">Title: </label>
                <input
                    id="new-calendar-event-title"
                    type="text" 
                    name="title" 
                    placeholder="Add title" 
                    value={title} 
                    required
                    onChange={e => setTitle(e.target.value)}
                />
                <p>{dayjs(daySelected).format("dddd, MMMM DD")}</p>
                <label htmlFor="new-calendar-event-description">Description</label>
                <input 
                    id="new-calendar-event-description"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    required
                    onChange={e => setDescription(e.target.value)}
                />
                <div className="color-container row">
                    {colors.map((color, index) => (
                        <div 
                            key={index} 
                            className="color-selector" 
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                        >
                            {selectedColor === color && <p>&#10004;</p>}
                        </div>
                    ))}
                </div>
                <button type="submit" onClick={addEvent}>Save</button>
            </form>
        </Modal>
    )
}

export default AddCalendarEvent;