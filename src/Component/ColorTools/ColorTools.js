import React,{useRef} from 'react';
import PropTypes from 'prop-types';
import {Container,Row,Col,Button,Dropdown} from 'react-bootstrap'

const ColorTools = props => {

    const widthRef=useRef()


    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex justify-content-center">
                    <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    Color Options
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={()=>{props.changeColor('red')}} href="#/action-1">Red</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('black')}} href="#/action-2">Black</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('blue')}} href="#/action-3">Blue</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('green')}} href="#/action-3">Green</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('yellow')}} href="#/action-3">Yellow</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('white')}} href="#/action-3">White</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('orange')}} href="#/action-3">Orange</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


{console.log(widthRef)}
                    </Col>
                    <Col className="d-flex justify-content-center" style={{display:'flex',flexDirection:'row'}}>
                    <input ref={widthRef} placeholder="Set Brush Width..."></input><Button onClick={()=>{props.setWidth(Number(widthRef.current.value))}}>Set</Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                    {console.log(props.drawRef)}
                    <Button
            onClick={() => {
              console.log(props.drawRef.current.undo())
            }}
          >
            Undo
          </Button></Col>
                </Row>
            </Container>
        </div>
    );
};

ColorTools.propTypes = {
    
};

export default ColorTools;