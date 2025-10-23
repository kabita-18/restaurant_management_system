import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import "../index.css"
import Axios from 'axios'
import { UpdateMenuItemsManager } from '../Service/service'
import { useNavigate } from 'react-router-dom'


const UpdateMenuManager = () => {
    const [menu,setMenu]=useState([])
    const nav=useNavigate()
    const validate = (values)=>{
        let result = {};
        if(!values.dishname){
            result.dishname="select dishname";
        }
        if(!values.status){
            result.status="select status";
        }
        return result;
        }
        
    useEffect(()=>{
        const asyncall=async()=>
        {await Axios.get("http://restaurantmanagement-env.eba-imdxzriv.eu-north-1.elasticbeanstalk.com/deliciousbyte/view/menu")
        .then((res)=>{
        setMenu(res.data);
        // console.log(res)
        })}
        asyncall();
        const intervalId = setInterval(() => {
        asyncall();
        
        }, 3000);
        return () => clearInterval(intervalId);
    },[])
        
    const formik=useFormik({
        initialValues:{
            dishname:'',
            category:'',
            price:'',
            status:''
        },validate,
        onSubmit:(values)=>{
            console.log(values);
            UpdateMenuItemsManager(values).then((res)=>{
                console.log(res)
                console.log("success log");
                alert("Changes Successful")
                nav('/managerhome')
              }).catch((error)=>{
                console.log(error);
                console.log("Error log");
              })
        }
    })

        const list=[];
        return (
        <div className='img'>
        <div className='box'><div ><br /><h2>&nbsp;&nbsp;&nbsp;&nbsp;UPDATE ITEMS</h2>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='category'>Select category</label><br />
                <select name="category" value={formik.values.category} onChange={formik.handleChange} onClick={formik.handleChange} onBlur={formik.handleBlur}>
                {menu.map(item=>{
                    if(!list.includes(item.category))
                    {
                        list.push(item.category)
                        return( 
                                <option key={item.id} value={item.category}>{item.category}</option>
                        )
                    }
                 
                })}
                
                </select><br />
            <label htmlFor='dishname'>Select dish</label><br />
                <select name="dishname" value={formik.values.dishname} onChange={formik.handleChange} onClick={formik.handleChange} >
                    {menu.map(item=>{
                        if(item.category==formik.values.category)
                        {
                        return(
                                <option key={item.id} value={item.dishname} >{item.dishname}</option>
                        )
                        }
                    }  )}
                </select><br />
                {formik.touched.dishname && formik.errors.dishname?<>{formik.errors.dishname}</>:null}
            <label htmlFor='price'>Price</label><br />
                {
                    menu.map(item=>{
                        if(item.dishname==formik.values.dishname)
                        {
                            return (
                                <>
                                <input type='text' key={item.id} name="price" value={item.price} />
                                </>
                            )
                        }
                    })
                }
                <br />
            <label htmlFor='status'>Status</label>
            <select name="status" value={formik.values.status} onChange={formik.handleChange} onClick={formik.handleChange}>
                <option value="">select status</option>
                <option value="available" >Available</option>
                <option value="unavailable">Unavailable</option>
            </select><br /><br />
            {formik.touched.status && formik.errors.status?<div>{formik.errors.status}</div>:null}
            <button type='submit'>Submit Changes</button>
        </form>
        </div>
        </div>
        </div>
    )
    }

export default UpdateMenuManager
