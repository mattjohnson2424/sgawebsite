export const eventTypes = ['meeting', 'service-project', 'schoolwide', 'other']
export const eventTypeColors = ['red', 'orange', 'green', 'blue']

export const eventTypeConvertToColor = {}

eventTypes.forEach((eventType, index) => {
    eventTypeConvertToColor[eventType] = eventTypeColors[index]
})