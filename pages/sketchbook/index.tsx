import React, { useState } from 'react';
import styles from './sketchbook.module.scss';
import Link from 'next/link';
// import { ConnectedPager } from '../pager/pager'
import Layout from '../../components/layout';
import { getAllArtIds, getArtData } from '../../lib/art';
import { fetchSketchbookData, fetchSketchbookMediaTypes, fetchSketchbookPagedData } from '../../lib/api';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns';
import SaleInfo from '../../components/saleinfo/saleinfo';
import Pager from '../../components/pager/pager';
import Head from 'next/head'
import { syncBuiltinESMExports } from 'module';
import { GetServerSideProps } from 'next'


// const setCurrentSlide = (val:number) => store.dispatch({type: 'INCREMENT_SLIDE', payload: val});
interface ISketchbookItem {
  "previous": string,
  "next": string,
  "sketchbook_images": [
      {
      "id": string,
      "title": string,
      "media": string,
      "description":string,
      "artimage":any[],
    }
  ]
}

interface ISketcbhookProps {
  "artwork": ISketchbookItem,
  requestArtworkApiData: any,
  requestArtworkPagedData: any
}




export default function SketchbookListPage({ artData, menuItems }) {

  const pageSize = process.env.NEXT_PUBLIC_PAGESIZE;
  const [sketchbook_images, setArt] = useState(artData);
  const [pageNum, setPage] = useState(1);
  const [mediaType, setMedia] = useState('all');
  const [mediaItems, setMediaItems] = useState(menuItems);

  function goToPage(val) {
    setPage(val);
    getPagedArtwork(val);
  }

  const nextPage = () => {
    const page = pageNum + 1;
    setPage(page);
    getPagedArtwork(page);
  }

  const prevPage = () => {
    const page = pageNum - 1;
    console.log("Prev", page);
    setPage(page);
    getPagedArtwork(page);
  }

  let artLoaded = artData.results.length > 0;
  console.log("In return:", process.env.NEXT_PUBLIC_PAGESIZE);

  const getPagedArtwork = async (page) => {
    const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook/media/?media=${mediaType}&page=${page}&page_size=${pageSize}`;
    const response = await fetchSketchbookPagedData(url);
    setArt(response);
  }

  const getMenuItems = async () => {
    const data = await fetchSketchbookMediaTypes();
    setMediaItems(data);
  }
  
  
  const getSketchbookByMedia = async (e) => {
    setPage(1);
    setMedia(e.target.value);
    const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook/media/?media=${e.target.value}&page=1&page_size=${pageSize}`;
    const response = await fetchSketchbookPagedData(url);
    setArt(response);
  }

  let art;
      if(artLoaded) {
        art = (
          <Layout>
            <Head>
              <title>Diana Rice's sketchbook art</title>
              <meta property="og:title" content="Diana Rice's art" key="title" />
            </Head>
          <div className={styles.artHolder}>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="form-conntrol filter-control">
                  <label htmlFor="media" className="form-label">Filter by Media</label>
                  <select className="form-select" id="media-select" name="media" onChange={getSketchbookByMedia}>
                    <option value="all">All</option>
                    {mediaItems.map((item, v) => ( 
                      <option value={item.key}>{item.value}</option>
                    )) }
                    {/* <option value="O">Oil</option> */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.artHolder}>
          <div className="row">
                {(sketchbook_images.results || []).map(item => (
                    <div className={`col-sm-4 ${styles.cardCol}`} key={item.id}>
                      <Card className={styles.cardItem}>
                      <Link href={`/sketchbook/${item.id}`}>
                        <Card.Img className={styles.cardImage} src={item.artimage.gallery_medium} alt={item.title} /></Link>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text className={styles.cardText}>
                        {!item.sold && item.forSale ? <div>{item.price_format}</div> : ""}
                        {item.sold ? <span className={styles.sold}>Sold</span> : ""}
                        </Card.Text>
                      </Card.Body>    
                      </Card>
                    </div>
                  ))}
              </div>
              <div className="col-sm-12">
              <Pager artData={sketchbook_images} pageTo={goToPage} goNext={nextPage} goPrev={prevPage} pageNum={pageNum} pageCount={sketchbook_images.count}></Pager>
              </div>
              </div>

          </Layout>
        )
      } else {
        art = (
          <div>The server must be down currently. Please check back later.</div>
        )
      }
        return  (
          <div>
            {art}
          </div>
          )
      }


export async function getServerSideProps() {
  const pageSize = process.env.NEXT_PUBLIC_PAGESIZE;
  const [artData, menuItems] = await Promise.all([
    fetchSketchbookPagedData(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/sketchbook/?page=1&page_size=${pageSize}`),
    fetchSketchbookMediaTypes()
  ]);
  return {
    props: {
      artData,
      menuItems
    }
  }
}
