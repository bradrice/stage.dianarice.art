import Layout from '../../components/layout';
import { getAllSketchbookIds, getSketchbookData } from '../../lib/sketchbook';
// import { loadStripe } from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js';
import SaleInfo from '../../components/saleinfo/saleinfo';
import Card from 'react-bootstrap/Card';
import styles from './sketchbook.module.scss';
import Head from 'next/head';
import Link from 'next/link';

// const stripePromise = loadStripe('pk_test_AuwxcUOjPDUHbXyODkwDQ74r');

export default function SketchbookDetail({ artData }) {

    let artwork = (
        <div className="row">
          <div className="col-sm-12">
            <Card className={styles.cardDetail}>
            {artData.artimage &&
              <Card.Img src={artData.artimage.original} alt={artData.title} className={styles.cardImage} />
            }
              <Card.Body>
                <h5 className="card-title">{artData.title}</h5>
                <div className="details">
                  <p>{artData.description}</p>
                  <p>{artData.media}</p>
                </div> 
              </Card.Body> 
            </Card>
            <div className={styles.linkback}>
            <Link href="/sketchbook"> &lt; Return to sketchbook</Link>
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
    const artData = await getSketchbookData(params.id);
    // console.log("artwork:", artData);
    return {
      props: {
        artData
      }
    }
  }
  
