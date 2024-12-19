import React from 'react'

import { Button } from 'react-bootstrap'
import { FaTrashAlt } from "react-icons/fa";
//props handleclick - stoppropagation tüm sütünu seçmeni engelliyor
export const IconButton = ({handleclick}) => {
  return (
    <Button variant="secondary " onClick={(e)=>{e.stopPropagation(); handleclick()}}><FaTrashAlt  /></Button>
  )
}
