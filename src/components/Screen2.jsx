import React, { useEffect, useState } from 'react'
import { SCREEN_1, useRadarContext } from '../RadarContext'
import aeroplaneSvg from './308556.svg'
import styled from 'styled-components'
import { Tooltip } from '@mui/material'
import Adsbpoints from './Adsbpoints'
import Radarpoints from './Radarpoints'
import Legend from './Legend'

const Circle = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    width: 700px;
    height: 700px;
    border-radius: 50%;
    margin-bottom: 20px;
`

const RadarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    flex-direction: column;
`

const RadarPoint = styled.div(({backgroundColor='green',x=0 ,y=0}) => ({
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor,
    transform: `translate(${x}px, ${y* -1}px)`,
    cursor: 'pointer'
}))


const StartButton = styled.button(() => ({
    background: 'purple',
    color: 'white',
    padding: '10px 25px',
    outline: 'none',
    border: 'none',
    fontSize: '30px',
    borderRadius: '20px',
    cursor: 'pointer'
}))

const Screen2 = () => {

    const { setCurrentScreen, simpleRadarData, adbsRadarData, pivotVariableName, speed, resetState } = useRadarContext()
    const [currentRadarPoints, setCurrentRadarPoints] = useState([])

    const [currentAdbsPoints, setCurrentAdbsPoints] = useState([])


    const [currentIndexAdsb, setCurrentIndexAdsb] = useState(0)
    const [currentIndexRadar, setCurrentIndexRadar] = useState(0)
    const [hasRadarStarted, setHasRadarStarted] = useState(false)

    

    // useEffect(() => {
    //     let interval1;
    //     let interval2;
    //     if (hasRadarStarted) {
    //         let currentAdsbIndex = currentIndexAdsb
    //         let currentRadarIndex = currentIndexRadar
    //         interval1 = setInterval(() => {
    //              const currentTime = adbsRadarData[currentAdsbIndex].time
    //         const tempArr = []

    //         for (let index = currentAdsbIndex; index < adbsRadarData.length; index++) {
    //             const element = adbsRadarData[index];
            

    //             if (element.time===currentTime) {

    //                 tempArr.push(element)
    //             }
    //             else{
            
    //                 currentAdsbIndex = index
    //                 setCurrentAdbsPoints(tempArr)
    //                 break
    //             }
    //         }
    //         }, speed)

    //         interval2 = setInterval(() => {

    //         const tempArr = []
    //         for (let index = currentRadarIndex; index < simpleRadarData.length; index++) {
    //             const element = simpleRadarData[index];
    //             if (element.flightID?.includes(pivotVariableName)) {
    //                 currentRadarIndex = index
    //                 setCurrentRadarPoints(tempArr)
                    
    //                 break
    //             }
    //             else{
    //                 tempArr.push(element)
    //             }
    //         }
    //         }, speed * 4)
    //     }


    //     return () => {
    //         if (hasRadarStarted) {
    //             clearInterval(interval1);
    //             clearInterval(interval2);
                
    //         }
    // };
    // }, [hasRadarStarted])

    // useEffect(() => {
       
    //     const initialTime = adbsRadarData[0].time
    //     const tempArr = []
    //     for (let index = 0; index < adbsRadarData.length; index++) {
    //             const element = adbsRadarData[index];
            

    //             if (element.time===initialTime) {

    //                 tempArr.push(element)
    //             }
    //             else{
            
    //                 setCurrentIndexAdsb(index)
    //                 setCurrentAdbsPoints(tempArr)
    //                 break
    //             }
    //         }
        
    //         for (let index = 0; index < simpleRadarData.length; index++) {
    //             const element = simpleRadarData[index];
    //             if (element.flightID?.includes(pivotVariableName)) {
    //                 setCurrentIndexRadar(index+1)
    //                 setCurrentRadarPoints(tempArr)
                    
    //                 break
    //             }
    //             else{
    //                 tempArr.push(element)
    //             }
    //         }
            
    // }, [])


    if (!hasRadarStarted) {
        return (
                <>
                <Legend />
            <RadarContainer>
                <StartButton onClick={() => setHasRadarStarted(true)}>Start Radar</StartButton>
            </RadarContainer>
            </>
        )
    }
  return (<>
        <Legend />
    <RadarContainer>
        <Circle>
            <Adsbpoints hasRadarStarted={hasRadarStarted}/>
            <Radarpoints hasRadarStarted={hasRadarStarted}/>

        </Circle>
        <StartButton onClick={resetState}>Reset radar and go back</StartButton>
    </RadarContainer>
    </>
  )
}

export default Screen2