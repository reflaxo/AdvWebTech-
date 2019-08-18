import React from 'react';
import elham from './Contact.css';

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }
    callAPI() {
        fetch("/contact/new")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err);
    }
    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div>
                <div>
                    <img src={ require('../Images/IMAGE 2019-07-03 22_27_47.jpg')}  className="Aida" alt="aligment"/></div>
                <header>
                    <h1 className="contactHeading"> Contact us </h1>
                </header>
                <div className="App12">
                    <form method="POST" action="/contact/new">
                        <div>
                            <label> 👤First Name</label>
                            <input type="text" icon="us" id="fname" name="firstname" placeholder="Your name.."/>
                            <label>👥Last Name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                            <label>📧Email</label>
                            <input type="email" id="email" name="email" placeholder="Your email"/>
                            <label>✎Subject</label>
                            <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default Contact;
