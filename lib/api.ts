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

export const fetchArtworkMediaTypes = async () => {
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork/mediatypes`);
    const data = (await response).json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const fetchHomeData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/homepage`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export const fetchSketchbookData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook`);
        const data = (await response).json();
        // console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    } 
}

export const fetchSketchbookDetailData = async (id) => {
    try {
        // console.log('fetching artwork:', id);
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook/${id}`);
        const data = (await response).json();
        // console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    } 
}

export const fetchSketchbookPagedData = async (url:string) => {
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

export const fetchSketchbookMediaTypes = async () => {
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook/mediatypes`);
    const data = (await response).json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
}