import React from 'react'
import styled from 'styled-components'


const RadarPoint = styled.div(({x ,y}) => ({
    width: 0, 
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: '8px solid transparent',
              
    borderBottom:" 8px solid yellow",

    cursor: 'pointer',
    
}))

const AdsbPoint = styled.div(({x ,y}) => ({
    width: '8px',
    height: '8px',
    cursor: 'pointer',
    background: 'green'
}))

const LegendContainer = styled.div(() => ({
     position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    padding: '20px',
    border: '1px dashed white',
    flexDirection: 'column',
    width: '150px'
}))

const LegendItem = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Legend = () => {
  return (
    <LegendContainer>
    <LegendItem>
    <AdsbPoint />
    <div>-</div>
    <div>ADSB Point</div>
    </LegendItem>
    <LegendItem>
    <RadarPoint />
    <div>-</div>
    <div>Radar Point</div>
    </LegendItem>
    </LegendContainer>
  )
}

export default Legend