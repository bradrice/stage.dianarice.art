import React from 'react';
import Layout from '../components/layout'


class AboutPage extends React.Component  {  

  componentDidMount() {
    const toggler = document.getElementById("navbarSupportedContent");
    toggler?.classList.remove('show');
  }
  
  render (){
    return (
    <Layout>
    <div className="col-sm-12">
      <div className="m-4">
        <h1>About me</h1>
        <p>I study art at <a href="https://www.uakron.edu">The University of Akron</a>. I'm the daughter of an awesome, superior, old master fine artist.</p>
        
        {/* <h3>The details</h3> */}
        {/* <ul class="pbox">
          <li><a href="/resume">My resumé</a></li>
          <li><a href="/portfolio">A portfolio of my web work</a></li>
        </ul> */}
      </div>
  </div>
  </Layout>
    )}
  };

export default AboutPage;
