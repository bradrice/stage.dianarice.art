import React, { useState } from 'react';
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'


export default function AboutPage({ AboutData }) {
  const [aboutData, setAboutData] = useState(AboutData);
  
    return (
    <Layout>
    <div className="col-sm-12">
    <div className={styles.HomePage}>
      <h2>{aboutData[0].abouttitle}</h2>
            <div className="mt-1">
              <img src={aboutData[0].artwork.artimage.gallery_large} alt="home image" className={styles.HomeImage} />
              <p className={styles.AboutContentBody}>{aboutData[0].bodycontent}</p>
            </div>
          </div>
    </div>
  </Layout>
    )
  }

export async function getServerSideProps() {
  // const allPostsData = getSortedPostsData()
  const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/api/aboutpage/`);
  const AboutData = await response.json();
  return {
    props: {
      AboutData
    }
  }
}