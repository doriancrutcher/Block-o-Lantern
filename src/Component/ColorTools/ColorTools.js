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
    <Dropdown.Item onClick={()=>{props.changeColor('red')}} >Red</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('black')}} >Black</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('blue')}} >Blue</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('green')}} >Green</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('yellow')}} >Yellow</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('white')}} >White</Dropdown.Item>
    <Dropdown.Item onClick={()=>{props.changeColor('orange')}} >Orange</Dropdown.Item>
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