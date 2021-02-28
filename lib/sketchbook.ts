import { data } from "jquery";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import { fetchSketchbookData } from './api';
import { fetchSketchbookDetailData }  from './api';

export async function getAllSketchbookIds() {
    const response = await fetchSketchbookData();
    const artworks = await response;
    // console.log("getAllArtIds:", artworks.results);
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: '1'
    //     }
    //   },
    //   {
    //     params: {
    //       id: '2'
    //     }
    //   }
    // ]
    const ids =  await artworks.results.map(artwork => {
      return {
        params: {
          id: String(artwork.id)
        }
      }
    });
    console.log(ids);
    return ids;
  }

  export async function getSketchbookData(id) {
    const artdetail = await fetchSketchbookDetailData(id);
  
    // Combine the data with the id
    return {
      id,
      ...artdetail
    }
  }
  
  