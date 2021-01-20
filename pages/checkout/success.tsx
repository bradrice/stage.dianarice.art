import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';

export default function Success (props:any){
    return (
        <Layout>
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                    <h2>Success</h2>
                    <p>Thank you for purchasing my original artwork. I will wrap and send the art work soon. If you have any special instructions, you can use my <Link href="/contact"><a>contact form</a></Link> to send me them.</p>
                    <p>Return to my <Link href="/art"><a className="btn btn-outline-dark">Artwork</a></Link></p>

                </div>
            </div>
        </Layout>
        
    )
    }