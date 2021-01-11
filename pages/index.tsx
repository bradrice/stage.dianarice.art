import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import React from 'react';
// import './home.scss';
import HomeCarousel from '../components/carousel/carousel';
import Layout from '../components/layout';
// import { requestCarouselApiData } from '../state/actions/carouselActions';
import { connect } from 'react-redux';
import { NextPageContext } from 'next'
import { env } from 'process';

// const setCurrentSlide = (val:number) => store.dispatch({type: 'INCREMENT_SLIDE', payload: val});

interface IArtworkItem {
  "id": string,
  "title": string,
  "media": string,
  "description":string,
  "created":string,
  "width":string,
  "height": string,
  "artimage":string,
  "sold":boolean,
  "price":string,
  "forSale":boolean
}


interface IArtworkProps {
  "artwork": IArtworkItem[],
  requestCarouselApiData: any
}


export default function HomePage({ carouselData }) {
    return (
      <Layout>
      <div className="row">
        <div className="col-sm-12">
          <div className={styles.HomePage}>
            <div className="mt-1">
            <HomeCarousel slides={carouselData}/>
            </div>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
          <div className={styles.homecopy}>
          <p className={`text-center ${styles.hometext}`}>View more of my <Link href="art"><a className="btn btn-primary">Artwork</a></Link></p>
          <p></p>
          </div>
        </div>
        </div>
      </Layout>
    )
};

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData()
  const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/carousel/1`);
  const carouselData = await response.json();
  return {
    props: {
      carouselData
    }
  }
}
