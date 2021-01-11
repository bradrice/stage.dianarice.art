export const fetchArtworkData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork`);
        const data = (await response).json();
        // console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    } 
}

export const fetchArtworkDetailData = async (id) => {
    try {
        // console.log('fetching artwork:', id);
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork/${id}`);
        const data = (await response).json();
        // console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    } 
}

export const fetchArtworkPagedData = async (url:string) => {
    console.log(url);
    try {
        const response = await fetch(url+'&format=json');
        const data = (await response).json();
        // console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    } 
}

export const fetchCarouselData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/carousel/1`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
    
}