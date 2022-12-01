export const compareProps = (prevProps, nextProps) => {

    if (!(JSON.stringify(prevProps) === JSON.stringify(nextProps))) {
        return false // causes rerender
    }
    return true
}