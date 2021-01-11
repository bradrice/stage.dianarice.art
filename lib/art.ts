import { data } from "jquery";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import { fetchArtworkData } from './api';
import { fetchArtworkDetailData }  from './api';

export async function getAllArtIds() {
    const response = await fetchArtworkData();
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

  export async function getArtData(id) {
    const artdetail = await fetchArtworkDetailData(id);
  
    // Combine the data with the id
    return {
      id,
      ...artdetail
    }
  }
  
  