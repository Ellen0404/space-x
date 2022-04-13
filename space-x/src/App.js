import './App.css';
import React, { useEffect, useState } from 'react'
import {showLaunchesResults} from './components/API'
import LauncheDetails from './components/LauncheDetails'
import {Modal, Button, Container, Col, Row } from 'react-bootstrap';


const App = () => {

  const [data, setData] = useState([{}])
  const [deactivatedMatch, setdeactivatedMatch] = useState(false)
  const [show, setShow] = useState(false)
  const [launche, setLaunche] = useState({name: '', id: '', details: '', image: ''})

  const handleClose = () => {
    setdeactivatedMatch(false);
    setShow(false);
}
const handleShow = () => setShow(true)

const deactivateLaunche = (id) => {
  const filtered = data.filter(item => item.id !== id)
  setData(filtered)
  setdeactivatedMatch(true)
  setTimeout(() => {
      handleClose();
  }, 1500);

}
  useEffect(() => {
    showLaunchesResults(setData)
  },[])

  return (
    <div className="mainContainer">
      <div className="container p-4">
        <h1 className="m-5">Launches</h1>
        <div className="ui four cards">
          {data.map(item => (
            <LauncheDetails 
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.links?.patch?.small}
            handleShow={handleShow}
            setLaunche={setLaunche}
            status={item.success}
          />
          ))}

      <Modal aria-labelledby="contained-modal-title-vcenter"
          centered show={show} onHide={handleClose}>
          <Modal.Header >
              <Modal.Title className="ui yellow">{launche.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container>
                  <Row >
                      <Col md={4}>
                          <span >
                              <img src={launche.image} alt={launche.name} style={{height:'100px', width: '100px'}}/>
                          </span>
                      </Col>
                      <Col md={8}>
                          <h6 > {launche.details || 'There is no details about this launce'}</h6>
                      </Col>
                  </Row>
              </Container>
          </Modal.Body>
          <Modal.Footer>
              <Container>
                  <div className="alert alert-danger mr-2 ml-2" role="alert" style={{ opacity: deactivatedMatch ? 1 : 0 }}>
                      This launche has been deactivated
              </div>
              </Container>
              <Button className="ui inverted green button" onClick={handleClose}>
                  Close
              </Button>
              <Button className="ui inverted red button" variant="danger" onClick={() => {
                  deactivateLaunche(launche.id)
              }
              }>
                  Deactivate launche
              </Button>

          </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  )
}

export default App;
