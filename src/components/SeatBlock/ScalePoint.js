import React from 'react'

const ScalePoint = ({onMouseDown,position}) => (
  <div
    className={`tr-transform__scale-point tr-transform__scale-point--${position}`}
    onMouseDown={onMouseDown}/>
)

export default ScalePoint