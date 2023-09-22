
import React from 'react'
import styled from 'styled-components'

const ExcelUploadButtonWrapper = styled.button`
  background-color: green;
  color: white;
  padding: 10px 10px;
  margin: 10px 0px;
`
const ExcelUploadButton = ({buttonText, onUpload = () => {}}) => {
  return (
     <ExcelUploadButtonWrapper >
        <input type="file" accept=".xlsx, .xls" onChange={onUpload} />
        {buttonText}
     </ExcelUploadButtonWrapper>
    
  )
}


export default ExcelUploadButton