import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRadarContext } from '../RadarContext'
import { Tooltip } from '@mui/material'

const SinglePoint = styled.div(({x ,y}) => ({
     position: 'absolute',
    width: 0, 
    height: 0,
      top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
    borderLeft: "8px solid transparent",
    borderRight: '8px solid transparent',
              
    borderBottom:" 8px solid yellow",
  
    ...x&&y&&{transform: `translate(${x}px, ${y* -1}px)`},
    cursor: 'pointer',
    
}))

const TailPoint = styled.div(({x ,y}) => ({
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    ...x&&y&&{transform: `translate(${x}px, ${y* -1}px)`},
    cursor: 'pointer',
    background: 'yellow'
}))

const Radarpoints = ({hasRadarStarted}) => {
      const {  simpleRadarData,  pivotVariableName, speed} = useRadarContext()
    const [currentPoints, setCurrentPoints] = useState([])
    console.log("🚀 ~ file: Radarpoints.jsx:31 ~ Radarpoints ~ currentPoints:", currentPoints)

    useEffect(() => {
        let interval;
        if (hasRadarStarted) {
            let currentIndex = 0;
            let pivotName = pivotVariableName;
            console.log("🚀 ~ file: Radarpoints.jsx:37 ~ useEffect ~ pivotName:", pivotName)
            let tempArray =[]
            for (let index = currentIndex; index < simpleRadarData.length; index++) {
                const element = simpleRadarData[index];
                console.log("🚀 ~ file: Radarpoints.jsx:41 ~ useEffect ~ element:", element)
                if (element.flightID !== pivotName) {
                    tempArray.push(element)
                }
                else{
                    setCurrentPoints(tempArray)
                    currentIndex = index + 1;
                    break;
                }
            }
            interval = setInterval(() => {
                let anotherTempArray = []
                

                for (let index = currentIndex; index < simpleRadarData.length; index++) {
                    const element = simpleRadarData[index];
                    if (currentIndex >= simpleRadarData.length) {
                        clearInterval(interval)
                        break;
                    }
                    if (element.flightID !== pivotName) {
                    anotherTempArray.push(element)
                }
                else{
                    setCurrentPoints(anotherTempArray)
                    currentIndex = index + 1;
                    break;
                }
                }
            }, speed*4)
        }

        return () => {
            if (hasRadarStarted) {
                clearInterval(interval)
            }
        }

    }, [hasRadarStarted])
  return (
    <>
    {currentPoints.map(point => (
        <Tooltip key={point.flightID} title={<>
            <div>Flight ID: {point.flightID}</div>
            <div>SSR code: {point.ssrCode}</div>
            <div>Flight Level: {point.level}</div>
            <div>Flight Speed: {point.speed}</div>
            <div>Flight Distance: {point.distance}</div>
    
            </>} >
        <SinglePoint  x={point.x} y={point.y} />
        </Tooltip>
    ))

    }
    </>
  )
}

export default Radarpoints