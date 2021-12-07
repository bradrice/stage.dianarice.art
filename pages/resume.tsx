import React, { useState } from 'react';
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'


export default function ResumePage({ AboutData }) {
  const [aboutData, setAboutData] = useState(AboutData);
  
    return (
    <Layout>
    <div className="row">
        <div className="col-sm-12">
          <div className={styles.ResumePage}>
              <div className={styles.content}>
              <h3>Resum&#233;</h3>

<p>b. 2000</p>

<p>Visual Artist and Student, Myers School of Art, University of Akron
<br/>455 Grant Street, Akron, OH 44311	330-410-5988
<br />dcr60@uakron.edu	dianarice.art
</p>



<h2>EDUCATION</h2>

<p>2023		
    <br />B.F.A. in painting and drawing with honors
		<br />Minor in illustration
<br />The University of Akron, Akron, OH
</p>


<h2>GROUP EXHIBITIONS</h2>
<dl>
    <dt>2020</dt>		
    <dd>Emily Davis Gallery, Myers Spring Student Exhibition, Akron, OH</dd>
    <dt>2020</dt>
    <dd>Myers School of Art, Scholarship Exhibition, Akron, OH</dd>
    <dt>2020</dt>
    <dd>Summit Artspace, Creativity During a Crisis, Akron, OH, curated by Kristina 
Wolin</dd>
<dt>2021</dt>
<dd>Emily Davis Gallery, Myers Spring Student Exhibition, Akron, OH</dd>
<dt>2021</dt>
<dd>Myers School of Art, Scholarship Exhibition, Akron, OH</dd>
<dt>2021</dt>
<dd>Summit Artspace, Everything but the Kitchen Sink, Akron, OH, curated by Abby 
Cipar</dd>
<dt>2021</dt>
<dd>The Warehouse, Groundhog Show, Akron, OH, curated by Hope Hickman</dd>
</dl>


<h2>AWARDS AND SCHOLARSHIPS</h2>
<dl>
    <dt>2018</dt>
    <dd>Scholastics Gold Key Award</dd>
    <dt>2020</dt>
    <dd>Raleigh Art Scholarship</dd>
    <dt>2021</dt>
    <dd>Demetros, Mary B. Memorial Scholarship</dd>
</dl>
<p><a href="/documents/Rice_ArtResume2.docx">Download resum&#233;</a> as a word document</p>
            </div>
          </div>
        </div>
        </div>
  </Layout>
    )
  }
