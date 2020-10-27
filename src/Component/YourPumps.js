import React,{useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';import {Container,Row,Card,Button, Jumbotron} from 'react-bootstrap'
import CanvasDraw from "react-canvas-draw";
import { async } from 'regenerator-runtime';
import {compressToUTF16,decompressFromUTF16,decompress} from 'lz-string'
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import '../css/CustomStyles.css'



const YourPumps = props => {
    
    const [userInventory, changeInventory]=useState([])
    const [userInfo,changeInfo]=useState([])
    //const [arrRefs,changeRefs]=useState([])
    //const [inputRefs,changeInputRefs]=useState([])

    const inputRefs=useRef([])
    const arrRefs=useRef([])


    useEffect(()=>{
        getPumps();
    },[])

    const getPumps=async()=>{
        const getInventory= await window.contract.getPumpkinInventory({owner:window.accountId});
        let arr=[]
        let tokens=[]
        let refs=[];
        let inRefs=[];


        getInventory.forEach((x,i)=>{
            arr.push(window.contract.getPumpkinDrawing({token_id:x}))

 

        })

       
          inputRefs.current=new Array(getInventory.length)
          arrRefs.current=new Array(getInventory.length)
      

        Promise.all(arr)
        .then(res=>{
            changeInfo(
                res
            )
        })
        changeInventory(
            getInventory
        )



    }
    useEffect(()=>{
        LoadImages()
    }, [userInfo])

    const LoadImages=async()=>{
        userInfo.map((x,i)=>arrRefs.current[i].loadSaveData(decompressFromUTF16(x)))
    }


    const sendToFriend=async(recipient,tokenId)=>{
        await window.contract.transfer({new_owner_id:recipient, token_id:tokenId})

     }



    return (
        <div>
        <Container>
        <Row className="d-flex justify-content-center ScaryStyleFontDraw">
            <Jumbotron style={{backgroundColor:'black'}}><h1>Your Pumpkins!</h1></Jumbotron></Row>
            {console.log(arrRefs)}
        {userInfo.map((x,i)=>{
            
  return (

    <Row style={{marginTop:'5%'}}>
        <Card>
            <Card.Header>{window.accountId}'s pumpkin ID#: <b>{userInventory[i]}</b></Card.Header>
            <CanvasDraw        imgSrc='https://i.imgur.com/NnHp4oS.jpg'
            key={i} ref={el=>arrRefs.current[i]=el}></CanvasDraw>
            <Card.Body className="d-flex justify-content-center">
            <Container>
            <Row className="d-flex justify-content-center">
            <Button onClick={()=>exportComponentAsJPEG(arrRefs.current[i])}>Save as JPEG</Button>
            </Row>
            <Row style={{marginTop:'10px'}} className="d-flex justify-content-center">
            <input key={i} ref={el=>inputRefs.current[i]=el}  placeholder="send to a friend"></input> <Button onClick={()=>sendToFriend(inputRefs.current[i].value,userInventory[i])}>Send to Friend</Button>
        </Row>
        </Container>
        </Card.Body>
    </Card>


    </Row>
  )})
        
  }
      </Container>
      
    </div>
    );
};

YourPumps.propTypes = {
    
};

export default YourPumps;