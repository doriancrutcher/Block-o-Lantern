import React from 'react';
import PropTypes from 'prop-types';
import {Container,Row,Col,Button,Jumbotron} from 'react-bootstrap'
import PumpkinHome from '../assets/PumpkinHome.png'
import CommunityPumps from './CommunityPumps'
import '../css/CustomStyles.css'



const Home = props => {
    return (
        <div>
            <Container>
                <Jumbotron style={{marginTop:'10px',backgroundColor:'black',boarderRadius:'10px',backgroundSize:'cover',backgroundImage:'url("https://images.pexels.com/photos/619418/pexels-photo-619418.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")'}}>
  <Row className=" ScaryStyleFontDraw d-flex justify-content-center"><header>Block'O'Lantern</header></Row>
                    
  {/* <Row className="d-flex justify-content-center"><img style={{width:'26vw'}} src={PumpkinHome}></img></Row> */}
  </Jumbotron>
  <Row className=' ScaryStyleFontDrawSub d-flex justify-content-center' style={{margin:'10px'}}>
        <Jumbotron style={{backgroundColor:'black'}} >Create your own Pumpkins on Blockchain! Share them online, Send them to your Friends!<img style={{width:'10%'}}src={PumpkinHome}></img> check out some of the community Pumpkins Below!</Jumbotron>
  </Row>
  <Row className="d-flex justify-content-center" ><CommunityPumps/></Row>
 
  
</Container>
        </div>
    );
};



export default Home;