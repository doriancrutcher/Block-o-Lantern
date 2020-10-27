import React,{useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import PumpkinHome from '../assets/PumpkinHome.png'
import {Card,Col,Row,Button} from 'react-bootstrap'
import CanvasDraw from "react-canvas-draw";
import { async } from 'regenerator-runtime';
import {compressToUTF16,decompressFromUTF16,decompress} from 'lz-string'




const CommunityPumps = props => {

    const [communityArt,changeCommunityArt]=useState([])
    const [owners,changeOwners]=useState([])
    const [tokens,changeTokens]=useState([])

    let drawRefs=[useRef(),useRef(),useRef()]

    useEffect(()=>{
        const getPumps=async()=>{
            let TotalPumps=await window.contract.getTokenHeight()
            let arr=communityArt
            let Owners=[];          
            let tokens=[]
            
            for(let i=0;i<3;i++){
                let randomImage = Math.floor(Math.random()*(TotalPumps-15))+15
               let  x=window.contract.getPumpkinDrawing({token_id:randomImage})
               let Ownz=window.contract.get_pumpkin_owner({token_id:randomImage})
               tokens.push(randomImage)
                arr.push(x)
                Owners.push(Ownz)
                console.log(x)

                        
            }
            console.log(arr)
            Promise.all(arr).then(
                res=>{
                    changeCommunityArt(res)
                }
            )
            Promise.all(Owners).then(
                res=>{
                    changeOwners(res)
                }
            )
            changeTokens(tokens)
          
           
        }
     getPumps();
  
    },[])


useEffect(()=>{
    LoadImages()
},[communityArt])
    
    const LoadImages=async()=>{
        
        console.log(communityArt)
        Promise.all(communityArt).then(res=>{
            console.log(res)
        res.map((x,i)=>drawRefs[i].current.loadSaveData(decompressFromUTF16(x)))
        })

    }

    return (
       <Row  style={{backgroundColor:'black',paddingTop:'5%',paddingBottom:'5%'}}>
        
        {communityArt.map((x,i)=>{
            return(
                
        <Col className="d-flex justify-content-center">
        <Card style={{display:'flex',justifyContent:'center'}} className="d-flex justify-content-center" style={{ width: '18rem' }}>
        <Row className="d-flex justify-content-center">
        <CanvasDraw
                  hideGrid
                  ref={drawRefs[i]}
                  imgSrc='https://i.imgur.com/NnHp4oS.jpg'
                  brushColor={'black'}
                  brushRadius={10}
                  lazyRadius={0}
                  canvasWidth={200}
                  canvasHeight={200}></CanvasDraw>
        </Row>
        <Card.Body>
          <Card.Title>{owners[i]}</Card.Title>
          <Card.Text>
            Checkout this user's pumpkin! Token ID: {tokens[i]}
          </Card.Text>
        </Card.Body>
      </Card>
      </Col>
            )
    }) }
    </Row>
    );
};



export default CommunityPumps;