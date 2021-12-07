import React, { useState } from 'react';
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'


export default function BioPage({ AboutData }) {
  const [aboutData, setAboutData] = useState(AboutData);
  
    return (
    <Layout>
    <div className="row">
        <div className="col-sm-12">
          <div className={styles.BioPage}>
              <div className={styles.content}>
              <p>
          Rice is currently a student at The University of Akron Myers School of Art. She is working towards her Bachelors of Fine Art in Painting and Drawing with a minor of Illustration. Rice plans to graduate with honors from the Williams Honors College in 2023.
</p>
<p>
Rice’s paintings focus on her personal history, mythologizing childhood memories, dreams, and familial stories. She draws inspiration from poetry, literature, folklore, and her own writings in her practice. Using traditional and created symbolisms in her paintings, her work creates a lyrical reality that is both a true personal record of early childhood and an otherworldly narrative open to the interpretation of the viewer.
</p>
<p>
Rice has always been interested in the arts, from painting to storytelling. Her father is also a painter, and she would often enjoy painting and reading with him in childhood. Rice’s family was also talented in music, her mother was a gifted singer and Rice remembers many touching church-service solos. Looking forward, she plans to continue her artistic education abroad with sights on European graduate schools. Rice intends to continue to travel after graduation and begin to sell and show her work.
            </p>
            </div>
          </div>
        </div>
        </div>
  </Layout>
    )
  }
