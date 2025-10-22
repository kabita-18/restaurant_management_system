import React, { useEffect } from 'react'
import {useFormik} from 'formik'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {AddOrderDetails} from "../Service/service"
import Axios from "axios"
import "../index.css"
let tprice=0;
let orderinfo="";

let arr=[];

const validate=(values)=>{

  let result={};
  if(!values.orderdate){
    result.orderdate="please enter order date";
  }
  if(!values.mobileno){
    result. mobileno ="please enter mobile number";
  }
  if(!values.tableno){
    result.tableno="please enter table number";
  }
  return result;
}
const SubmitOrder = (props) => {

  const navigate=useNavigate();
  const formik=useFormik({
    initialValues:{
      orderid:"",
      orderdate:"",
      mobileno:"",
      tableno:'',
      orderinfo:"",
      tprice:""
    },
    validate,
    onSubmit:(values)=>{
      console.log("submiited");
      navigate('/vieworders')
      AddOrderDetails(values).then((res)=>{
        console.log(res)
        console.log("success log");
      }).catch((error)=>{
        console.log(error);
        console.log("Error log");
      })
    }
    
  })

    const [menu,setMenu]=useState([]);
    useEffect(()=>{
      const asyncall=async()=>
      {
      await Axios.get("https://restaurantmanagement-env.eba-imdxzriv.eu-north-1.elasticbeanstalk.com/deliciousbyte/view/menu")
      .then((res)=>{
        setMenu(res.data);
        // console.log(res)
      })}
      asyncall();
      // const intervalId = setInterval(() => {
      //   asyncall();
        
      // }, 3000);
      // return () => clearInterval(intervalId);
    },[])
    const [dishname,setDishName]=useState("");

    const dishChange=(e)=>{
      setDishName(e.target.value);
    }
    

   
    let dishes=[];
    if(dishname.length>0)
    {
      dishes=menu.filter((item)=>{
        return item.dishname.toLowerCase().includes(dishname.toLowerCase());
      })
    }

    const [newarr,setNewarr]=useState([])


  return (
    <div id='cont'>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='orderdate'>Enter Order Date</label><br />
        <input type='date'
        name='orderdate' value={formik.values.orderdate} onChange={formik.handleChange} onBlur={formik.handleBlur}></input><br />
        
        {formik.touched.orderdate && formik.errors.orderdate?<>{formik.errors.orderdate}</>:null} <br />
      
      <label htmlFor="mobileno">Enter Customer Mobile Number</label><br />
        <input type='text'
        name='mobileno' value={formik.values.mobileno}  onChange={formik.handleChange} onBlur={formik.handleBlur}></input><br />

        {formik.touched.mobileno && formik.errors.mobileno?<>{formik.errors.mobileno}</>:null} <br />

      <label htmlFor='tableno'>Enter Table Number</label><br />
        <input type="number" name='tableno' value={formik.values.tableno}  onChange={formik.handleChange} onBlur={formik.handleBlur}/><br />

        {formik.touched.tableno && formik.errors.tableno?<>{formik.errors.tableno}</>:null} <br />

        <label>Enter DishName</label><br />
        <input id='dishname' onClick={()=>{document.getElementById("dishtable").style.display='block'}} 
        type='text' placeholder="Search Here" value={dishname} onChange={dishChange} ></input>
        
        
        <table id='dishtable'>
          <tbody>
          { 
            dishes.map((dish,index)=>{
              return(
                <tr key={index} >
                  <td onClick={()=>{document.getElementById("dishname").value=dish.dishname;document.getElementById("dishtable").style.display='none'}}>{dish.dishname}</td>
                </tr>
              )
            })
          } 
          </tbody>
        </table><br/>

        


        <label>Enter Quantity</label><br />
        <input id='dishqty' name="dishqt" type='number'/><br />


        <button type='reset' onClick={()=>{
          let t="";
          orderinfo+=document.getElementById("dishname").value+":"+document.getElementById('dishqty').value+":";
          t+=document.getElementById("dishname").value+":"+document.getElementById('dishqty').value+":";
          menu.map((item)=>{
            if(item.dishname==document.getElementById("dishname").value)
            {
              orderinfo+=item.price;
              t+=item.price+":";
              tprice+=parseFloat(item.price)*parseFloat(document.getElementById('dishqty').value);
              t+=parseFloat(item.price)*parseFloat(document.getElementById('dishqty').value);
            }
            
          })

          t+=";"
          orderinfo=orderinfo+";";
          console.log(t);
          setNewarr(newarr=> [...newarr,t]);
          let temp=[...newarr]
          temp.push(t)
          setNewarr(temp)
        
         document.getElementById("dishname").value="";
         document.getElementById('dishqty').value="";
        }}>Add</button>
        <button type='submit' onClick={()=>{
          formik.values.orderinfo=orderinfo;
          formik.values.tprice=tprice
        }}>Submit</button>
        <table id='view'>
        <tr>
          <td>Dish Name</td>
          <td>Quantity</td>
          <td>Price</td>
          <td>Total Price</td>
          <td>Edit</td>
        </tr>
        
        {
           newarr.map((dish,index)=>{
            let dishinfo=dish.split(":")
            return(
              <tr>
                  <td>{dishinfo[0]}</td>
                  <td>{dishinfo[1]}</td>
                  <td>{dishinfo[2]}</td>
                  <td>{dishinfo[3].slice(0,-1)}</td>
                  <button type="button" onClick={()=>{
                      console.log(newarr)
                      let array=[...newarr].filter((item)=>{
                        return ((item.split(":"))[0])!=dishinfo[0]
                      })
                      setNewarr(array)
                  }}>Delete Item</button>
                </tr>
              )
           
          })
        }
        
        
      </table>
    </form>
    </div>
  )
}

export default SubmitOrder;