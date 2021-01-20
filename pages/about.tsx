import React, { useState } from 'react';
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'


export default function AboutPage({ AboutData }) {
  const [aboutData, setAboutData] = useState(AboutData);
  
    return (
    <Layout>
    <div className="row">
        <div className="col-sm-12">
          <div className={styles.HomePage}>
          <div className={`mt-1 ${styles.imageContainer}`}>
              <img src={aboutData[0].artwork.artimage.gallery_large} alt="home image" className={styles.HomeImage} />
              <h3>{aboutData[0].artwork.title}</h3>
              <p>{aboutData[0].artwork.media}</p>
              <p>{aboutData[0].artwork.width} x {aboutData[0].artwork.height}</p>
             {aboutData[0].bodycontent ? 
              <p className={styles.ContentBody}>{aboutData[0].bodycontent}</p>
              : <div></div>
             }
            </div>
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