import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import WebNavbar from './components/navbar.js';
import OverviewCard from './components/overviewcard.js';
import WebFooter from './components/footer.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClipboardList, faComment } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendar,faClipboardList, faComment);

function App() {
  
  return (
    <div className="App">
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
<Router>
<header>
      <WebNavbar/>  </header>
  
      <div className="container-fluid mt-4 text-muted">
	  <div className="row">
      <OverviewCard title="Current Assignment" shape="shadow rounded-pill" icon="calendar" leadColor="yellow" text="React"/>
      <OverviewCard title="Last Assignment" shape="shadow rounded-pill" icon="calendar" leadColor="green" text="Mongo DB"/>
      <OverviewCard title="My Task" shape="shadow" icon="clipboard-list" leadColor="blue" text="task 4.2"/>
      <OverviewCard title="Unread Messages" shape="shadow" icon="comment" leadColor="red" text="15"/>
      </div>
      </div>
      <hr/>
   <WebFooter/>
        </Router>
    </div>
  );
}



export default App;
