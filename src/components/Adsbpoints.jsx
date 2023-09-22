import React, { useEffect, useState } from 'react'
import { useRadarContext } from '../RadarContext'
import styled from 'styled-components'
import { Tooltip } from '@mui/material'

const sample = {
    "time": 0.4044560185185185,
    "flightID": "VTI706  ",
    "bearing": 132.89753489112252,
    "distance": 114.21177841783751,
    "level": 101,
    "speed": 296.631,
    "x": -77.74274135156261,
    "y": 83.6683721397115
}

const SinglePoint = styled.div(({x ,y}) => ({
    position: 'absolute',
     
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
    width: '8px',
    height: '8px',

    ...x&&y&&{transform: `translate(${x}px, ${y* -1}px)`},
    cursor: 'pointer',
    background: 'green'
}))

const TailPoint = styled.div(({x ,y}) => ({
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    ...x&&y&&{transform: `translate(${x}px, ${y* -1}px)`},
    cursor: 'pointer',
    background: 'green'
}))



const Adsbpoints = ({hasRadarStarted}) => {
    const {  adbsRadarData,  speed, resetState } = useRadarContext()
    console.log("🚀 ~ file: Adsbpoints.jsx:33 ~ Adsbpoints ~ adbsRadarData:", adbsRadarData[1])
    const [currentPoints, setCurrentPoints] = useState([])
    const [previousBuffer, setPreviousBuffer] = useState([])
    console.log("🚀 ~ file: Adsbpoints.jsx:29 ~ Adsbpoints ~ previousBuffer:", previousBuffer)
    useEffect(() => {
        let interval;
        if (hasRadarStarted) {
            let numberOfIterations = 0;
            let currentIndex = 0;
            let previousIndex = currentIndex;
            let currentTime = adbsRadarData[currentIndex].time
            let tempArray = []
            for (let index = 0; index < adbsRadarData.length; index++) {
                const element = adbsRadarData[index];
                if (element.time === currentTime) {
                    tempArray.push(element)
                }
                else{
                    setCurrentPoints(tempArray)
                    currentTime = element.time
                    currentIndex = index
                    numberOfIterations += 1

                    break;
                }
            }
            interval = setInterval(() => {
                let anotherTempArray = []
                previousIndex = currentIndex
                if (currentIndex>=adbsRadarData.length) {
                    clearInterval(interval)
                }
                for (let index = currentIndex; index < adbsRadarData.length; index++) {
                    const element = adbsRadarData[index];
                    if (element.time === currentTime) {
                        anotherTempArray.push(element)
                    }
                    else{
                        setPreviousBuffer([...previousBuffer,currentPoints])
                        setCurrentPoints(anotherTempArray)
                        currentTime = element.time
                        currentIndex = index
                        numberOfIterations +=1
                        console.log("🚀 ~ file: Adsbpoints.jsx:66 ~ interval=setInterval ~ currentIndex:", currentIndex)
                        console.log("🚀 ~ file: Adsbpoints.jsx:56 ~ interval=setInterval ~ previousIndex:", previousIndex)
                        console.log("🚀 ~ file: Adsbpoints.jsx:63 ~ interval=setInterval ~ numberOfIterations:", numberOfIterations)
                    break;
                    }
                }
            }, speed)
        }

             return () => {
            if (hasRadarStarted) {
                clearInterval(interval);
        
                
            }
    }},[hasRadarStarted])
    console.log("🚀 ~ file: Adsbpoints.jsx:43 ~ Adsbpoints ~ Adsbpoints:")
  return (
    <>
        {currentPoints.map(point => (
            <Tooltip key={point.flightID} title={<>
            <div>Flight ID: {point.flightID}</div>
            <div>Flight Level: {point.level}</div>
            <div>Flight Speed: {point.speed}</div>
    
            </>} >
            <SinglePoint  x={point.x} y={point.y} />
            </Tooltip>
        ))}
        
    </>
  )
}

export default Adsbpoints