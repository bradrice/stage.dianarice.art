import Layout from '../../components/layout';
import { getAllArtIds, getArtData } from '../../lib/art';
// import { loadStripe } from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js';
import SaleInfo from '../../components/saleinfo/saleinfo';
import Card from 'react-bootstrap/Card';
import styles from './art.module.scss';
import Head from 'next/head';
import Link from 'next/link';

// const stripePromise = loadStripe('pk_test_AuwxcUOjPDUHbXyODkwDQ74r');

export default function ArtDetail({ artData }) {

    let artwork = (
        <div className="row">
          <div className="col-sm-12">
            <Card className={styles.cardDetail}>
            {artData.artimage &&
              <Card.Img src={artData.artimage.gallery_large} alt={artData.title} className={styles.cardImage} />
            }
              <Card.Body>
                <h5 className="card-title">{artData.title}</h5>
                <div className="details">
                  <p>{artData.description}</p>
                  <p>Size: {artData.width} x {artData.height}<br />
                  {artData.media}</p>
                        {artData.sold ? <p className={styles.sold}>Sold</p> : ""}
                        {!artData.sold && artData.forSale ? <div>{artData.price_format}</div> : ""}
                        {artData.forSale ? <SaleInfo artitem={artData}/> : <div>Not for sale</div>}
                </div> 
              </Card.Body> 
            </Card>
            <div className={styles.linkback}>
            <Link href="/art"> &lt; Return to art</Link>
            </div>
          </div>
        </div>
      )
      return <Layout>
        <Head>
        <title>Diana Rice art</title>
          <meta property="og:url"           content={`https://dianarice.art/art/${artData.id}`} />
          <meta property="og:type"          content="website" />
          <meta property="og:title"         content={`Art by Diana Rice, ${artData.title}`} />
          <meta property="og:description"   content={artData.description} />
          <meta property="og:image"         content={artData.artimage.gallery_medium}  />
        </Head>
        {artwork}
        </Layout>

        }

// export async function getStaticPaths() {
//     const paths = await getAllArtIds();
//     // console.log(paths);
//     return {
//       paths,
//       fallback: false
//     }
//   }
  
  export async function getServerSideProps({ params }) {
    const artData = await getArtData(params.id);
    // console.log("artwork:", artData);
    return {
      props: {
        artData
      }
    }
  }
  
