import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import Layout from '../../components/layout';
import { getAllArtIds, getArtData } from '../../lib/art';
// import { fetchArtworkDetailData } from '../../lib/api';

const stripekey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE;
const stripePromise = loadStripe(stripekey);

interface iProps {
  saleitem: {
    url: string,
    id: number,
    title: string,
    media: string,
    description: string,
    created: null
    width: string,
    height: string,
    sold: boolean,
    price: number,
    price_format: string,
    forSale: boolean,
    showOnWebsite: boolean,
  }
}

export default function CheckoutPage({artitem}) {
  // console.log(artitem);

    return (
            <Layout>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={artitem.id} title={artitem.title} price={artitem.price} price_format={artitem.price_format}  />
                    </Elements>
                </div>
            </Layout>   
        )
}

// export async function getStaticPaths() {
//   const paths = await getAllArtIds();
//   // console.log(paths);
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   const artitem = await fetchArtworkDetailData (params.id);
//   // console.log("artwork:", artitem);
//   return {
//     props: {
//       artitem
//     }
//   }
// }

export async function getServerSideProps({ params }) {
  const artitem = await getArtData(params.id);
  return {
    props: {
      artitem
    }
  }
}