import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import '../index.css';
import Axios from 'axios';
import { UpdateMenuItemsOwners } from '../Service/service';
import { useNavigate } from 'react-router-dom';

const validate = (values) => {
  const errors = {};
  if (!values.dishname) {
    errors.dishname = 'Select dishname';
  }
  if (!values.status) {
    errors.status = 'Select status';
  }
  return errors;
};

const UpdateMenuOwner = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:9090/deliciousbyte/view/menu')
      .then((res) => {
        setMenu(res.data);
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  const formik = useFormik({
    initialValues: {
      dishname: '',
      category: '',
      price: '',
      status: '',
    },
    validate,
    onSubmit: (values) => {
      UpdateMenuItemsOwners(values)
        .then(() => {
          alert('Updated Successfully');
          navigate('/ownerhome');
        })
        .catch((error) => {
          console.error('Update error:', error);
          alert('Failed to update');
        });
    },
  });

  const getDishesByCategory = () => {
    return menu.filter(item => item.category === formik.values.category);
  };

  const getOldPrice = () => {
    const selectedDish = menu.find(item => item.dishname === formik.values.dishname);
    return selectedDish ? selectedDish.price : '';
  };

  return (
    <div className='img'>
      <div className='box'>
        <h2>UPDATE ITEMS</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor='category'>Select Category</label><br />
          <select
            className='select'
            name='category'
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=''>--Select Category--</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select><br />

          <label htmlFor='dishname'>Select Dish</label><br />
          <select
            className='select'
            name='dishname'
            value={formik.values.dishname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=''>--Select Dish--</option>
            {getDishesByCategory().map((item, index) => (
              <option key={index} value={item.dishname}>{item.dishname}</option>
            ))}
          </select><br />
          {formik.touched.dishname && formik.errors.dishname && <div>{formik.errors.dishname}</div>}

          <label htmlFor='price'>Price</label><br />
          <input
            type='text'
            name='price'
            placeholder={getOldPrice() + ' (old price)'}
            value={formik.values.price}
            onChange={formik.handleChange}
          /><br />

          <label htmlFor='status'>Status</label><br />
          <select
            className='select'
            name='status'
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value=''>--Select Status--</option>
            <option value='available'>Available</option>
            <option value='unavailable'>Unavailable</option>
          </select><br />
          {formik.touched.status && formik.errors.status && <div>{formik.errors.status}</div>}<br /><br />

          <Button type='submit' variant='contained' color='success'>SUBMIT</Button>&nbsp;&nbsp;&nbsp;
          <Button variant='contained' color='warning' onClick={() => navigate('/ownerhome')}>Back</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuOwner;
