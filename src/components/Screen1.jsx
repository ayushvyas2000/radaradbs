import React from 'react'
import ExcelUploadButton from './ExcelUploadButton'
import { SCREEN_2, useRadarContext } from '../RadarContext'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import * as XLSX from 'xlsx'
import * as lodash from 'lodash'
const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ConfigurationWrapper = styled(FlexWrapper)`
    border: 1px dashed violet;
    padding: 30px 40px;
`
const TitleWrapper = styled.h1`
    
`

const InputWrapper = styled.input`
    margin: 10px 0px;
    padding: 10px;
`

const NextButton = styled.button`
    
`

const ErrorWrapper = styled.h3`
    color: red;
`

const adbs ='adbs'
const radar = 'radar'
const ScreenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const SpeedContainer = styled.div(() => ({
    display: 'flex',
    margin: '10px',
}))

const ButtonContainer = styled.button(({isActive}) => ({
        padding: '5px',
        fontSize: "20px",
        outline: 'none',
        background: isActive ? 'purple' : 'blue',
        border: 'none',
        margin: "0px 10px",
        color: 'white'
    
}))

const Screen1 = () => {
    const { simpleRadarData,adbsRadarData, setCurrentScreen, setPivotVariableName, pivotVariableName,setAdbsRadarData,setSimpleRadarData, speed, setSpeed } = useRadarContext()
    const [isError, setIsError] = useState(false)

    const validateAndNext = () => {
        // if (!pivotVariableName || !simpleRadarData || !adbsRadarData) {
        //     setIsError(true)
        // }
        // else{
        //     setCurrentScreen(SCREEN_2)
        // }
                    setCurrentScreen(SCREEN_2)
    }

    useEffect(() => {
        if (isError) {
            setTimeout(() => setIsError(false), 3000)
        }
    }, [isError])

    const handleFileUpload = (e, type) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (type === adbs) {
            const formattedMap = {}

            jsonData.forEach((data, index) => {

                if (index!== 0) {
    
                    const newObj = {
                        time: data[0],
                        flightID: data[1],
                        bearing: data[2],
                        distance: data[3],
                        level: data[4],
                        speed: data[5]
                    }
    
                    if (formattedMap?.[`${data[1]}${data[0]}`]) {
                        const {bearing, distance, level, speed} =formattedMap[`${data[1]}${data[0]}`]
                        formattedMap[`${data[1]}${data[0]}`] = {
                            ...formattedMap[`${data[1]}${data[0]}`],
                            ...bearing=="-"&&{
                                bearing: newObj.bearing
                            },
                            ...distance=="-"&&{
                                distance: newObj.distance
                            },
                            ...level=="-"&&{
                                level: newObj.level
                            },
                            ...speed=="-"&&{
                                speed: newObj.speed
                            },
                        }
                    }
                    else{
                        lodash.set(formattedMap, [`${data[1]}${data[0]}`], newObj)
                    }
                    const {bearing, distance, level, speed} =formattedMap[`${data[1]}${data[0]}`]
                    const radian = bearing * (Math.PI/180)
                    const x= distance * Math.cos(radian)
                    const y= distance * Math.sin(radian)
                    lodash.set(formattedMap[`${data[1]}${data[0]}`],['x'],x)
                    lodash.set(formattedMap[`${data[1]}${data[0]}`],['y'],y)
                }
                
            })
            setAdbsRadarData(Object.values(formattedMap))

        }
        else {
            const formattedMap = []
            jsonData.forEach((data, index) => {
                if (index!== 0 && data[1]!=='-') {
                    
                    const newObj = {
                        time: data[0],
                        flightID: data[1],
                        bearing: data[2],
                        distance: data[3],
                        level: data[4],
                        speed: data[5],
                        ssrCode: data[6]
                    }
                    const radian = newObj.bearing * (Math.PI/180)
                    const x= newObj.distance * Math.cos(radian)
                    const y= newObj.distance * Math.sin(radian)
                    lodash.set(newObj,['x'],x)
                    lodash.set(newObj,['y'],y)
                    formattedMap.push(newObj)
                }
                
            })

            setSimpleRadarData(formattedMap)

        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (<ScreenContainer>
    <FlexWrapper>
    <TitleWrapper>  
        Set Radar Configurations
    </TitleWrapper>
    <ConfigurationWrapper>
        <ExcelUploadButton onUpload={(e) => handleFileUpload(e, radar)} buttonText={'Upload Radar Data'}/>
        <ExcelUploadButton onUpload={(e) => handleFileUpload(e, adbs)} buttonText={'Upload ADSB Data'} />
        <InputWrapper value={pivotVariableName} onChange={(e) => setPivotVariableName(e.target.value) } placeholder='Set Pivot Variable Name' />
        <SpeedContainer>
            <ButtonContainer isActive= {speed === 1000} onClick={() => setSpeed(1000)} >1x</ButtonContainer>
            <ButtonContainer isActive= {speed === 2000} onClick={() => setSpeed(2000)}>0.5x</ButtonContainer>
            <ButtonContainer isActive={speed===4000} onClick={() => setSpeed(4000)}>0.25x</ButtonContainer>
            
        </SpeedContainer>
        <NextButton onClick={validateAndNext}>
            Next -{'>'}
        </NextButton>
    </ConfigurationWrapper>
    {isError && <ErrorWrapper>
        Please fill all the details
        </ErrorWrapper>}
    </FlexWrapper>
    
    {/* <div>Screen1</div>
        <button onClick={()=> setCurrentScreen(SCREEN_2)}>Next</button> */}
        </ScreenContainer>
  )
}

export default Screen1