import React from "react";
import axios from 'axios';
// import PAYMENT_SERVER_URL from '../../constants/server';
import Layout from '../components/layout';


class ContactFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          message: ''
        }
      }

    render() {
        return (
            <Layout>
            <div className="row">
                <div className="col-sm-8 offset-sm-2">
                  <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" id="message" onChange={this.onMessageChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
            </div>
           </Layout> 
    )}

    onNameChange(event) {
        this.setState({name: event.target.value})
      }
    
      onEmailChange(event) {
        this.setState({email: event.target.value})
      }
    
      onMessageChange(event) {
        this.setState({message: event.target.value})
      }

      resetForm(){
        this.setState({name: '', email: '', message: ''})
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        const messagePromise = axios({
          method: "POST", 
          url:`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/message`, 
          data:  this.state
        }).then((response)=>{
          console.log(response);
          if (response.data === 'success') {
            alert("Message Sent."); 
            this.resetForm()
          } else if(response.data.status === 'fail') {
            alert("Message failed to send.")
          }
        })
      }
}

export default ContactFormPage;