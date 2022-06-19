import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row} from 'reactstrap';
import PeopleManagement from './components/people-management';
import AppNavbar from './components/navbar';

const App = ()=> {
  

  return (
    <>
      <AppNavbar></AppNavbar>
      <Container>
        <Row>
          <Col sm="12">
            <PeopleManagement></PeopleManagement>
          </Col>
        </Row>
      </Container>
        
    </>
  );
}

export default App;
