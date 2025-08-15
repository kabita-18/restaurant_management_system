import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../caps.css"
const ViewOrders = () => {

  const [orders,setOrders]=useState([])
  useEffect(()=>{
    const asynccall=async()=>{
       await Axios.get("http://localhost:9091/deliciousbyte/view/order")
       .then(res=>{
        setOrders(res.data)
        console.log(res.data)
       })
       
    }
    asynccall();
    const intervalId = setInterval(() => {
       asynccall();
       
     }, 3000);
     return () => clearInterval(intervalId);
},[])

  const sortByPrice=()=>{
    const sorted=[...menu].sort((a,b)=>{
      return a.price-b.price;
    })
    setMenu(sorted)
  }

  return (
    <div id="cont">
      <button onClick={sortByPrice}>Sort by price</button>
    <table>
      <tbody>
      <tr>
        <th>Order ID</th>
        <th>Order Date</th>
        <th>Table No</th>
        <th>Mobile No</th>
        <th>Order Info</th>
        <th>Total Price</th>
      </tr>
      {
        orders.map((order)=>{
          return(
            <tr>
              <td>{order.orderid}</td>
              <td>{order.orderdate}</td>
              <td>{order.tableno}</td>
              <td>{order.mobileno}</td>
              <td>{order.orderinfo}</td>
              <td>{order.tprice}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>

  </div>
  )
}

export default ViewOrders
