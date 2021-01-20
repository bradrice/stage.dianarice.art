import React, { useState } from 'react';
// import {setSaleItem } from '../../state/actions/artworkActions';
// import { loadStripe } from '@stripe/stripe-js';
// import {Elements} from '@stripe/react-stripe-js';
import Link from 'next/link'

// import store from '../../state/store';

export default function SaleInfo({ artitem }) {
  let checkoutpath = `/checkout/${artitem.id}`;

  const buttonClicked = ()=> {
    alert('Will work when stripe account is setup')
}
  
  return(
    // <div className="btn btn-primary" onClick={buttonClicked}>Purchase</div>
    <Link href={checkoutpath}><a className="btn btn-light">Purchase</a></Link>
  )
}

// class SaleInfo extends React.Component {
      
//       isForSale = () => {
//         let art = {};
//         if(this.props.artwork.length > 0) {
//           let art = this.props.artwork.filter(item => {return item.id === this.props.id})
//           art = art[0];
//         } else {
//           art = this.props.artitem;
//         }
//         if(this.props.forSale) {
//             return (
//                 <div>
//                     <p>For sale {this.props.price_format}</p>
//                     <p>
//                     <Link
//                         className="btn btn-primary"
//                         to="/checkout"
//                         onClick={() => {this.props.setSaleItem(this.props.id, art)}}
//                         >
//               Purchase
//             </Link>
//                     </p>
//                 </div>
                
//             )
//         } else {
//           if(art.sold) {
//             return "";
//           } else {
//             return <p>Not for sale</p> 
//         }
//       }
//     }
    
//     render() {
        
//         return (
//             <div>
//                 {this.isForSale()} 
//             </div> 
//         )
//       }
// }

// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//       saleitem: state.saleitem,
//       artwork: state.artwork.artworks,
//       artitem: state.artworkdetail
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         setSaleItem: (id, artwork) => {
//           console.log("set sale item", id, artwork)
//             // let saleitem = artwork.filter(item => {return item.id === id});
//             dispatch(setSaleItem(artwork[0]));
            
//         }
//     };
//   }

//   export const ConnectedSaleInfo = connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(SaleInfo)