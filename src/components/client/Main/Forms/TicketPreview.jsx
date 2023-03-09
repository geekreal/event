import React, { useEffect, useState } from 'react'

const TicketPreview = () => {
    
  let [cart, setCart] = useState([])
  
  let ticketPreview = localStorage.getItem("tickets");
  
  const addItem = (item)  =>   {}
  const updateItem = (itemID, amount) => {}
  const removeItem = (itemID) => {}
  
  //this is called on component mount
  useEffect(() => {
    //turn it into js
    ticketPreview = JSON.parse(ticketPreview);
    //load persisted cart into state if it exists
    if (ticketPreview) setCart(ticketPreview)
    
  }, []) //the empty array ensures useEffect only runs once

  
  return (
    <div>TicketPreview</div>
  )
}

export default TicketPreview