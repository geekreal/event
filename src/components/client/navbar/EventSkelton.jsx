import React from 'react'
import { alpha, Skeleton } from '@mui/material'

const EventSkelton = ({children}) => {
  return (
    <>
    <Skeleton sx={{background: alpha("#ffff" , 0.1),}} width={300}>{children}
    </Skeleton>
    </>
  )
}

export default EventSkelton