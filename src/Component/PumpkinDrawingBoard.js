import React,{useRef,useState,useEffect}from 'react';
import PropTypes from 'prop-types';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import CanvasDraw from "react-canvas-draw";
import {compressToUTF16,decompressFromUTF16} from 'lz-string'

import { Container,Row,Col,Button,Alert } from 'react-bootstrap';
import ColorTools from './ColorTools/ColorTools'
import YourPumps from './YourPumps'
import '../css/CustomStyles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Big from 'big.js'





const PumpkinDrawingBoard = props => {

  const BOATLOAD_OF_GAS = Big(3).times(10 ** 14).toFixed()

  const DrawRef=useRef();
  const [color,changeColor]=useState('black')
  const [brushW,changeBrushW]=useState(10)
  const [nearStatus,changeStatus]=useState(false)
  

  const changeUpColor=(newColor)=>{
    changeColor(newColor);
  }

  const setWidth =(size)=>{
      changeBrushW(size);
      
        let x=`{"lines":[{"points":[{"x":105.5,"y":240.734375},{"x":105.5,"y":240.734375},{"x":106.5,"y":240.734375},{"x":107.5,"y":240.734375},{"x":109.5,"y":240.734375},{"x":111.5,"y":240.734375},{"x":112.5,"y":240.734375},{"x":115.5,"y":240.734375},{"x":117.5,"y":240.734375},{"x":120.5,"y":240.734375},{"x":122.5,"y":240.734375},{"x":125.5,"y":240.734375},{"x":125.5,"y":240.734375},{"x":128.5,"y":240.734375},{"x":130.5,"y":240.734375},{"x":132.5,"y":240.734375},{"x":133.5,"y":240.734375},{"x":134.5,"y":240.734375},{"x":135.5,"y":240.734375},{"x":136.5,"y":240.734375},{"x":136.5,"y":240.734375},{"x":136.5,"y":240.734375},{"x":136.5,"y":240.734375},{"x":136.5,"y":240.734375}],"brushColor":"black","brushRadius":10},{"points":[{"x":293.5,"y":237.734375},{"x":293.5,"y":237.734375},{"x":294.5,"y":237.734375},{"x":295.5,"y":237.734375},{"x":296.5,"y":237.734375},{"x":297.5,"y":237.734375},{"x":300.5,"y":237.734375},{"x":301.5,"y":237.734375},{"x":303.5,"y":237.734375},{"x":304.5,"y":237.734375},{"x":306.5,"y":237.734375},{"x":308.5,"y":237.734375},{"x":310.5,"y":237.734375},{"x":312.5,"y":237.734375},{"x":314.5,"y":237.734375},{"x":316.5,"y":237.734375},{"x":316.5,"y":237.734375},{"x":318.5,"y":237.734375},{"x":321.5,"y":237.734375},{"x":322.5,"y":237.734375},{"x":324.5,"y":237.734375},{"x":325.5,"y":237.734375},{"x":326.5,"y":237.734375},{"x":327.5,"y":237.734375},{"x":328.5,"y":237.734375},{"x":328.5,"y":237.734375},{"x":328.5,"y":237.734375},{"x":328.5,"y":237.734375}],"brushColor":"black","brushRadius":10},{"points":[{"x":117.5,"y":365.734375},{"x":117.5,"y":365.734375},{"x":118.5,"y":365.734375},{"x":118.5,"y":365.734375},{"x":119.5,"y":365.734375},{"x":120.5,"y":365.734375},{"x":121.5,"y":365.734375},{"x":121.5,"y":365.734375},{"x":123.5,"y":365.734375},{"x":124.5,"y":365.734375},{"x":126.5,"y":365.734375},{"x":128.5,"y":365.734375},{"x":130.5,"y":365.734375},{"x":133.5,"y":365.734375},{"x":137.5,"y":365.734375},{"x":141.5,"y":365.734375},{"x":145.5,"y":365.734375},{"x":150.5,"y":365.734375},{"x":154.5,"y":365.734375},{"x":159.5,"y":365.734375},{"x":165.5,"y":365.734375},{"x":170.5,"y":365.734375},{"x":175.5,"y":365.734375},{"x":180.5,"y":365.734375},{"x":185.5,"y":365.734375},{"x":190.5,"y":365.734375},{"x":194.5,"y":365.734375},{"x":199.5,"y":364.734375},{"x":204.5,"y":363.734375},{"x":210.5,"y":361.734375},{"x":215.5,"y":359.734375},{"x":220.5,"y":357.734375},{"x":225.5,"y":355.734375},{"x":229.5,"y":353.734375},{"x":233.5,"y":351.734375},{"x":235.5,"y":350.734375},{"x":238.5,"y":348.734375},{"x":240.5,"y":347.734375},{"x":243.5,"y":345.734375},{"x":244.5,"y":344.734375},{"x":245.5,"y":342.734375},{"x":247.5,"y":339.734375},{"x":247.5,"y":338.734375},{"x":248.5,"y":336.734375},{"x":248.5,"y":334.734375},{"x":248.5,"y":333.734375},{"x":248.5,"y":333.734375}],"brushColor":"black","brushRadius":10}],"width":500,"height":500}`
        let y=`{"lines":[{"points":[{"x":135,"y":273.75},{"x":135,"y":273.75},{"x":135,"y":273.75},{"x":135,"y":273.75},{"x":132,"y":273.75},{"x":128,"y":273.75},{"x":122,"y":273.75},{"x":116,"y":273.75},{"x":109,"y":272.75},{"x":102,"y":270.75},{"x":95,"y":267.75},{"x":90,"y":263.75},{"x":86,"y":258.75},{"x":84,"y":256.75},{"x":83,"y":255.75},{"x":83,"y":252.75},{"x":83,"y":252.75},{"x":83,"y":249.75},{"x":84,"y":246.75},{"x":86,"y":240.75},{"x":91,"y":232.75},{"x":96,"y":221.75},{"x":107,"y":204.75},{"x":114,"y":194.75},{"x":121,"y":188.75},{"x":128,"y":184.75},{"x":134,"y":182.75},{"x":139,"y":181.75},{"x":146,"y":179.75},{"x":153,"y":179.75},{"x":162,"y":178.75},{"x":164,"y":178.75},{"x":172,"y":179.75},{"x":177,"y":181.75},{"x":181,"y":185.75},{"x":184,"y":188.75},{"x":188,"y":195.75},{"x":191,"y":200.75},{"x":193,"y":207.75},{"x":194,"y":214.75},{"x":195,"y":221.75},{"x":195,"y":229.75},{"x":194,"y":238.75},{"x":194,"y":241.75},{"x":191,"y":248.75},{"x":189,"y":252.75},{"x":187,"y":256.75},{"x":186,"y":259.75},{"x":184,"y":262.75},{"x":182,"y":265.75},{"x":179,"y":267.75},{"x":176,"y":270.75},{"x":172,"y":272.75},{"x":170,"y":272.75},{"x":164,"y":273.75},{"x":160,"y":274.75},{"x":156,"y":275.75},{"x":152,"y":275.75},{"x":148,"y":276.75},{"x":146,"y":276.75},{"x":143,"y":276.75},{"x":142,"y":276.75},{"x":141,"y":276.75},{"x":141,"y":275.75},{"x":141,"y":275.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":338,"y":178.75},{"x":338,"y":178.75},{"x":337,"y":178.75},{"x":335,"y":178.75},{"x":331,"y":178.75},{"x":326,"y":178.75},{"x":317,"y":178.75},{"x":312,"y":178.75},{"x":309,"y":178.75},{"x":305,"y":179.75},{"x":303,"y":181.75},{"x":301,"y":183.75},{"x":300,"y":187.75},{"x":298,"y":191.75},{"x":297,"y":197.75},{"x":296,"y":204.75},{"x":296,"y":216.75},{"x":296,"y":224.75},{"x":296,"y":232.75},{"x":298,"y":238.75},{"x":302,"y":246.75},{"x":304,"y":250.75},{"x":308,"y":255.75},{"x":313,"y":260.75},{"x":318,"y":263.75},{"x":323,"y":265.75},{"x":329,"y":267.75},{"x":337,"y":268.75},{"x":341,"y":268.75},{"x":346,"y":268.75},{"x":349,"y":267.75},{"x":353,"y":263.75},{"x":358,"y":259.75},{"x":363,"y":254.75},{"x":367,"y":249.75},{"x":371,"y":243.75},{"x":375,"y":236.75},{"x":380,"y":223.75},{"x":382,"y":218.75},{"x":383,"y":213.75},{"x":383,"y":209.75},{"x":383,"y":206.75},{"x":382,"y":201.75},{"x":379,"y":197.75},{"x":376,"y":191.75},{"x":372,"y":184.75},{"x":368,"y":180.75},{"x":363,"y":175.75},{"x":361,"y":174.75},{"x":359,"y":173.75},{"x":356,"y":173.75},{"x":353,"y":173.75},{"x":350,"y":173.75},{"x":346,"y":173.75},{"x":343,"y":173.75},{"x":343,"y":173.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":325,"y":220.75},{"x":325,"y":220.75},{"x":325,"y":220.75},{"x":326,"y":220.75},{"x":327,"y":220.75},{"x":328,"y":220.75},{"x":329,"y":220.75},{"x":329,"y":220.75},{"x":330,"y":220.75},{"x":329,"y":220.75},{"x":328,"y":220.75},{"x":326,"y":220.75},{"x":324,"y":220.75},{"x":323,"y":220.75},{"x":323,"y":220.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":139,"y":223.75},{"x":139,"y":223.75},{"x":139,"y":223.75},{"x":139,"y":223.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":211,"y":301.75},{"x":211,"y":301.75},{"x":209,"y":301.75},{"x":208,"y":301.75},{"x":205,"y":301.75},{"x":198,"y":301.75},{"x":194,"y":301.75},{"x":191,"y":301.75},{"x":189,"y":301.75},{"x":188,"y":301.75},{"x":187,"y":302.75},{"x":186,"y":303.75},{"x":186,"y":304.75},{"x":186,"y":305.75},{"x":186,"y":306.75},{"x":186,"y":308.75},{"x":186,"y":312.75},{"x":186,"y":314.75},{"x":187,"y":316.75},{"x":187,"y":317.75},{"x":189,"y":319.75},{"x":191,"y":320.75},{"x":193,"y":322.75},{"x":196,"y":324.75},{"x":198,"y":325.75},{"x":202,"y":328.75},{"x":205,"y":329.75},{"x":208,"y":330.75},{"x":212,"y":331.75},{"x":217,"y":331.75},{"x":220,"y":331.75},{"x":220,"y":331.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":321,"y":289.75},{"x":321,"y":289.75},{"x":324,"y":289.75},{"x":325,"y":289.75},{"x":326,"y":289.75},{"x":327,"y":289.75},{"x":327,"y":289.75},{"x":329,"y":289.75},{"x":329,"y":289.75},{"x":330,"y":289.75},{"x":331,"y":290.75},{"x":331,"y":291.75},{"x":332,"y":293.75},{"x":332,"y":294.75},{"x":332,"y":297.75},{"x":332,"y":299.75},{"x":332,"y":301.75},{"x":332,"y":303.75},{"x":332,"y":304.75},{"x":331,"y":305.75},{"x":331,"y":306.75},{"x":329,"y":308.75},{"x":328,"y":309.75},{"x":327,"y":310.75},{"x":325,"y":311.75},{"x":323,"y":312.75},{"x":319,"y":315.75},{"x":315,"y":317.75},{"x":309,"y":320.75},{"x":301,"y":323.75},{"x":296,"y":324.75},{"x":292,"y":325.75},{"x":290,"y":326.75},{"x":290,"y":326.75}],"brushColor":"black","brushRadius":10},{"points":[{"x":123,"y":375.75},{"x":123,"y":375.75},{"x":123,"y":375.75},{"x":124,"y":375.75},{"x":126,"y":377.75},{"x":130,"y":380.75},{"x":136,"y":385.75},{"x":146,"y":391.75},{"x":157,"y":399.75},{"x":169,"y":406.75},{"x":185,"y":414.75},{"x":201,"y":420.75},{"x":223,"y":428.75},{"x":255,"y":435.75},{"x":279,"y":438.75},{"x":303,"y":440.75},{"x":327,"y":441.75},{"x":342,"y":442.75},{"x":359,"y":442.75},{"x":380,"y":442.75},{"x":390,"y":441.75},{"x":398,"y":438.75},{"x":404,"y":434.75},{"x":410,"y":429.75},{"x":416,"y":424.75},{"x":422,"y":418.75},{"x":427,"y":414.75},{"x":432,"y":409.75},{"x":436,"y":405.75},{"x":439,"y":400.75},{"x":439,"y":399.75},{"x":440,"y":396.75},{"x":440,"y":395.75},{"x":440,"y":393.75},{"x":440,"y":392.75},{"x":440,"y":392.75},{"x":440,"y":391.75},{"x":440,"y":391.75},{"x":440,"y":391.75},{"x":440,"y":390.75},{"x":440,"y":389.75},{"x":440,"y":389.75},{"x":440,"y":388.75},{"x":440,"y":388.75},{"x":440,"y":388.75},{"x":439,"y":388.75},{"x":439,"y":387.75},{"x":439,"y":387.75}],"brushColor":"black","brushRadius":10}],"width":500,"height":500}
`
      console.log(x===y)
  }

  const pushPumpToBlockChain=async ()=>{
    
    changeStatus(true)
    console.log(nearStatus)
    console.log('before compression')
    console.log(DrawRef.current.getSaveData())
    console.log('after compression')
    console.log(compressToUTF16(DrawRef.current.getSaveData()))

    await  window.contract.mint_to({owner_id:window.accountId,drawingInfo:compressToUTF16(DrawRef.current.getSaveData())},BOATLOAD_OF_GAS)
    .then(res=>{
      console.log('removing drawing save from local storage');
      localStorage.removeItem('myDrawing') 
    }
    )
    .then(
      console.log(await window.contract.getPumpkinDrawing({token_id:3}))
    )

    
  }

 

  useEffect(()=>{
    console.log('hi')
    if(localStorage.getItem('myDrawing')){
      DrawRef.current.loadSaveData(decompressFromUTF16(localStorage.getItem('myDrawing')),false)
    }
  },[])




    return (
      

      <Router>

         <Route path="/draw" exact>
        <div className="DrawBoard">
          
          <Container>
           
            <Row className=" ScaryStyleFontDraw d-flex justify-content-center"><header >Draw your Pump!</header></Row>
            <Row style={{display:'flex',justifyContent:'center'}}>
              <ColorTools drawRef={DrawRef} setWidth={setWidth} changeColor={changeUpColor}/>
            </Row>
            <Row className="d-flex justify-content-center">
            <div className="CanvasStyle">
            <CanvasDraw
          hideGrid
          imgSrc='https://i.imgur.com/NnHp4oS.jpg'
          ref={DrawRef}
          brushColor={color}
          brushRadius={brushW}
          lazyRadius={0}
          canvasWidth={500}
          canvasHeight={500}
        />
        </div>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col className="d-flex justify-content-center"><Button  onClick={()=>{localStorage.setItem('myDrawing',compressToUTF16(DrawRef.current.getSaveData())); console.log('Saving to Local Storage')}}>Save for Later</Button></Col>
        <Col className="d-flex justify-content-center"><Button disabled={nearStatus} onClick={pushPumpToBlockChain}>Push to NEAR Blockhain</Button></Col>
        <Col className="d-flex justify-content-center">     <Button onClick={() => {
          exportComponentAsJPEG(DrawRef)
        }
          }>
         Export As JPEG
       </Button></Col>
        </Row>
          { (nearStatus)?
        <Row style={{marginTop:'3%'}}className="d-flex justify-content-center"><Alert variant={'primary'} onClick={()=><Redirect to='/mypumps'/>} disabled={!nearStatus}>Go to My Pumps to Check out your New Pumpkin!</Alert></Row>
          :null}
        </Container>

        

          
        </div>
        </Route >
    

      



        </Router>
    );
};




export default PumpkinDrawingBoard;