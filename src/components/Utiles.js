export const copyToClip = async (id,pin,setCopy) => {
    const text = `Please search for group id ${id} and use this pin "${pin}" to login`
    try {
        await navigator.clipboard.writeText(text);
        console.log('Content copied to clipboard');
        if(setCopy){
        setCopy(true)
        setTimeout(()=>setCopy(false),2000)
        }
    } catch (err) {
        console.error('Failed to copy: ', err);
    }

}