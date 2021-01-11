import React, { useState } from 'react';
import styles from './art.module.scss';
import Link from 'next/link';
// import { ConnectedPager } from '../pager/pager'
import Layout from '../../components/layout';
import { getAllArtIds, getArtData } from '../../lib/art';
import { fetchArtworkData, fetchArtworkPagedData } from '../../lib/api';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns';
import SaleInfo from '../../components/saleinfo/saleinfo';
import Pager from '../../components/pager/pager';
import Head from 'next/head'
import { syncBuiltinESMExports } from 'module';


// const setCurrentSlide = (val:number) => store.dispatch({type: 'INCREMENT_SLIDE', payload: val});
interface IArtworkItem {
  "previous": string,
  "next": string,
  "artworks": [
      {
      "id": string,
      "title": string,
      "media": string,
      "description":string,
      "created":string,
      "width":string,
      "height": string,
      "artimage":any[],
      "sold":boolean,
      "price":string,
      "price_format":string,
      "forSale":boolean
    }
  ]
}

interface IArtworkProps {
  "artwork": IArtworkItem,
  requestArtworkApiData: any,
  requestArtworkPagedData: any
}




export default function ArtListPage({ artData }) {

  const pageSize = process.env.NEXT_PUBLIC_PAGESIZE;
  const [artWork, setArt] = useState(artData);
  const [pageNum, setPage] = useState(1);
  const [mediaType, setMedia] = useState('all');

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
    const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork/media/?media=${mediaType}&page=${page}&page_size=${pageSize}`;
    const response = await fetchArtworkPagedData(url);
    setArt(response);
  }
  
  
  const getArtworkByMedia = async (e) => {
    setPage(1);
    setMedia(e.target.value);
    const url = `${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork/media/?media=${e.target.value}&page=1&page_size=${pageSize}`;
    const response = await fetchArtworkPagedData(url);
    setArt(response);
  }
  let art;
      if(artLoaded) {
        art = (
          <Layout>
            <Head>
        <title>Brad Rice's art</title>
        <meta property="og:title" content="Brad Rice's art" key="title" />
      </Head>
          <div className={styles.artHolder}>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="form-conntrol filter-control">
                  <label htmlFor="media" className="form-label">Filter by Media</label>
                  <select className="form-select" id="meida-select" name="media" onChange={getArtworkByMedia}>
                    <option value="all">All</option>
                    <option value="W">Watercolor</option>
                    <option value="A">Acrylic</option>
                    <option value="MM">Mixed Media</option> 
                    {/* <option value="O">Oil</option> */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.artHolder}>
          <div className="row">
                {(artWork.results || []).map(item => (
                    <div className={`col-sm-4 ${styles.cardCol}`} key={item.id}>
                      <Card className={styles.cardItem}>
                      <Link href={`/art/${item.id}`}>
                        <Card.Img className={styles.cardImage} src={item.artimage.gallery_medium} alt={item.title} /></Link>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text className={styles.cardText}>
                        {item.sold ? <span className={styles.sold}>Sold</span> : ""}
                        </Card.Text>
                        <Link href={`/art/${item.id}`}>Detail</Link>
                      </Card.Body>    
                      </Card>
                    </div> 
                  ))}
              </div>
              <div className="col-sm-12">
              <Pager artData={artWork} pageTo={goToPage} goNext={nextPage} goPrev={prevPage} pageNum={pageNum} pageCount={artWork.count}></Pager>
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

export async function getServerSideProps({ params }) {
  const pageSize = process.env.NEXT_PUBLIC_PAGESIZE;
  console.log("in getStaticProps", pageSize);
  const artData = await fetchArtworkPagedData(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/artwork/?page=1&page_size=${pageSize}`);
  // console.log("artwork:", artData);
  return {
    props: {
      artData
    }
  }
}
