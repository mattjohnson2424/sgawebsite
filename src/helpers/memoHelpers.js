export const compareProps = (prevProps, nextProps) => {

    if (!(JSON.stringify(prevProps) === JSON.stringify(nextProps))) {
        return false // causes rerender
    }
    return true
}

export const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;



