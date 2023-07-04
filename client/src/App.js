import React from 'react';
import Login from './components/Login';
// import Getotp from './components/Getotp';
import Passkey from './components/Passkey';
// import Welcome from './components/Welcome';
import Pagenotfound from './components/Pagenotfound'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

function App() {
  return (

    <Container>
      <Row>
        <Col>
          <Routes>
            <Route path='/' element={<Login />} />
            {/* <Route path='/getotp' element={<Getotp />} /> */}
            <Route path='/passkey' element={<Passkey />} />
            <Route path='*' element={<Pagenotfound/>} />
          </Routes>
        </Col>
      </Row>
    </Container>

  );
}

export default App;