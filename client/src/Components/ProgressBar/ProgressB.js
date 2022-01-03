import React from 'react'
import {ProgressBar} from 'react-bootstrap'
function ProgressB({progressPer}) {
    
    return (
 <ProgressBar now={progressPer} label={`${progressPer}%`} />
     
    )
}

export default ProgressB
