import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




function ProductManagement() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [productList, setProductList] = useState([]);
  const [files, setFiles] = useState([]);
  const [productForm, setProductForm] = useState({
    product_id: '',
    category: '',
    name: '',
    price: '',
    quantity: '',
    nutritional_value: '',
    health_benefits:'',
    files:''
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const x = new FormData();
    for(let i =0; i < files.length; i++){
      x.append('files', files[i]);
    }

    var res = await axios.post(`http://localhost:4000/upload`,x);
    // console.log(res.data.body,'res');
    // alert(res.data.body.files);

    const image = res.data.body.files;

    var finalData = {...productForm, files: image};

    // Send the data to the Node.js API
    fetch('http://localhost:4000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Save Successful') {
          alert(data.message);
          setProductList(prevList => [...prevList, productForm]);
        } else {
          alert(data.error);
        }
      })
      .catch(error => {
        alert('An error occurred');
        console.error(error);
      });

    // Clear the form inputs
    setProductForm({
      product_id: '',
      category: '',
      name: '',
      price: '',
      quantity: '',
      nutritional_value: '',
      health_benefits:'',
      files:'',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Update the state only if the id matches the categorySelect element
    if (name === 'categorySelect') {
      setProductForm((prevForm) => ({
        ...prevForm,
        category: value, // Update the 'category' property
      }));
    } else {
      setProductForm((prevForm) => ({
        ...prevForm,
        [name]: value, // For other input fields, update the state as usual
      }));
    }
  };

  const handleFileChange = e =>{
    if(e.target.files.length > 0){
      let files = e.target.files;
      let x = [];
      for(let i =0; i < files.length; i++){
        x.push(files[i]);
      }
      setFiles(x);
    }
  }

  useEffect(()=>{
    let auth = JSON.parse(localStorage.getItem('userInfo'));
    if(auth){
      setUserInfo(auth);
    }
    else{
      localStorage.removeItem('userInfo');
      navigate('/login',{replace:true})
    }
  },[navigate])

  return (
    <div>
      <h1>Product Management</h1>
      <div className='form_container' id="productFormSection">
        <form className='form-group' id="productForm" onSubmit={handleSubmit}>
          <label className='my-label' htmlFor="product_id">Product ID:</label>
          <input className='form-control' type="decimal" id="product_id" name="product_id" value={productForm.product_id} onChange={handleInputChange} required />
          <label className='my-label' htmlFor="productCategory">Product Category:</label>
          <select className='form-control' name='categorySelect' id="categorySelect" value={productForm.category} onChange={handleInputChange}>
            <option value=""> -- Select Category -- </option> 
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="oils">Oils</option>
            <option value="nuts">Nuts</option>
            <option value="spices">Spices</option>
          </select>
          <label className='my-label' htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" name="name" value={productForm.name} onChange={handleInputChange} required />
          <label className='my-label' htmlFor="price">Price:</label>
          <input className='form-control' type="number" id="price" name="price" step="0.01" value={productForm.price} onChange={handleInputChange} required />
          <label className='my-label' htmlFor="quantity">Quantity:</label>
          <input className='form-control' type="number" id="quantity" name="quantity" value={productForm.quantity} onChange={handleInputChange} required />
          <label className='my-label' htmlFor="nutritional_value">Nutritional Value:</label>
          <textarea type="text" className='form-control' id="nutritional_value" name="nutritional_value" value={productForm.nutritional_value} onChange={handleInputChange} required />
          <br></br>
          <label className='my-label' htmlFor="health_benefits">Health Benefits:</label>
          <textarea type="text" className='form-control' id="health_benefits" name="health_benefits" value={productForm.health_benefits} onChange={handleInputChange} required />
          <small className='inputLabels'>Picture</small>
          <label htmlFor='files' className='file'>
            <input className='text' type='file' id='files' name='files' onChange={handleFileChange} required accept='image/png, image/jpg, image/jpeg'></input>
          </label>
          <button className='btn btn-success my-btn-aqua' type="submit">Add Product</button>
        </form>
      </div>

      {/* <div id="productCards">
        {productList.map(product => createProductCard(product))}
      </div> */}
    </div>
  );
}

export default ProductManagement;
