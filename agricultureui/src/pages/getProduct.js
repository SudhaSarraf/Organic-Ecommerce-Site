import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './getProduct.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartContext } from '../components/global/cartContext';
// import "../pages/getProduct.css";

function DisplayData() {
  const [productDetails, setProductDetails] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  // const [productForm, setProductForm] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [editData, getEditData] = useState([]);
  const [productId, setProductId] = useState('');
  const [product_Id, setProduct_Id] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productNutritional_Value, setProductNutritional_Value] = useState(''); 
  const [productHealth_Benefits, setProductHealth_Benefits] = useState('');
  const {dispatch} = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');

  const [productForm, setProductForm] = useState({
    product_id: '',
    category: '',
    name: '',
    price: '',
    quantity: '',
    nutritional_value: '',
    health_benefits: '',
  });



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/product/all');
      setProductDetails(response.data.output); // Assuming the response is in the format { output: [productDetails...] }
    } catch (error) {
      console.error(error);
    }
  };

  const getAddProduct = () =>{
    if(userInfo[4]=== 'admin') navigate('/products',{replace:true});
    
  }

  const filteredProducts = productDetails.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };


  const updateProduct = async()=>{
    console.log(productId, productName, productPrice, productQuantity, productNutritional_Value, productCategory,productHealth_Benefits,'data update')

    const productData = {
      'name': productName,
      'price': productPrice,
      'quantity': productQuantity,
      'category': productCategory,
      'id': productId,
      'nutritional_value': productNutritional_Value,
      'health_benefits': productHealth_Benefits,
      'product_id' : product_Id
    }
    try{
      //sending the updated data to the database
      if(productData){
        await axios.put(`http://localhost:4000/product`, productData).then(data=>{
          console.log(data)
        });
        console.log('product updated successfully');
      }
      }
      catch(error){
        console.error(error);
        throw error;
      }

  };

  const deleteProduct = async (id) =>{
    console.log(id,'delete id')
    const shouldDelete = window.confirm("Are you sure you want to delete this Product");
    if(shouldDelete){
      try {
        // Send a DELETE request to the backend API
        const response = await axios.delete(`http://localhost:4000/product?id=${id}`);
        console.log(response.data); 
        if (response.data.message === 'Product Deleted Successfully') {
          const updatedProducts = productDetails.filter((product) => product.id !== id);
          setProductDetails(updatedProducts);
        }
      } catch (error) {
        console.error(error);
      }
    }
      
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    try{
      //send put request to update the product
      await updateProduct(productForm);
      alert('Product Updated Successfully');

      //clear the form inputs and hide the modal after successful update
      setShow(false);
      setProductForm({});
      fetchData();
    }catch(error){
      console.error(error);
    }
  };


  useEffect(()=>{
    let auth = JSON.parse(localStorage.getItem('userInfo'));
    if(auth){
        let y = Object.values(auth);
        setUserInfo(y);
    }
    else{
    localStorage.removeItem('userInfo');
    navigate('/login',{replace:true})
    }
  },[navigate]);

  return (
    <>
      <input
        type="text"
        className='search-bar form-control mr-sm-2'
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
            {selectedProduct && (
        <Modal show={selectedProduct !== null} onHide={closeModal} size="lg" dialogClassName="product-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              src={'http://localhost:4000/images/' + selectedProduct?.files}
              alt="Product"
            />

            <>
              <p><b>Nutritional Value:</b></p>
                {selectedProduct?.nutritional_value.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </>

              <>
                <p><b>Health Benefits:</b></p>
                {selectedProduct?.health_benefits.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>

          </Modal.Body>
        </Modal>
      )}

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Update Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='form_container' id="productFormSection">
              <form className='form-group' id="productForm" onSubmit={handleSubmit}>
                {/* <label className='my-label' htmlFor="product_id">Product ID:</label> */}
                {/* <input className='form-control' type="decimal" id="product_id" name="product_id" value={productForm.product_id} onChange={handleInputChange} required /> */}
                <label className='my-label' htmlFor="productCategory">Product Category:</label>
                <select className='form-control' id="categorySelect" value={productCategory} onChange={(e)=>setProductCategory(e.target.value)}>
                  <option value="">-- Select Category --</option> 
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="oils">Oils</option>
                  <option value="nuts">Nuts</option>
                  <option value="spices">Spices</option>
                </select>
                <label className='my-label' htmlFor="productName">Product Name:</label>
                <input type="text" id="productName" name="name" value={productName} onChange={(e)=>setProductName(e.target.value)} required />
                <label className='my-label' htmlFor="price">Price:</label>
                <input className='form-control' type="decimal" id="price" name="price" step="0.01" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} required />
                <label className='my-label' htmlFor="quantity">Quantity:</label>
                <input className='form-control' type="number" id="quantity" name="quantity" value={productQuantity} onChange={(e)=>setProductQuantity(e.target.value)} required />
                <label className='my-label' htmlFor="nutritional_value">Nutritional Value:</label>
                <textarea type="text" id="nutritional_value" className='form-control' name="nutritional_value" value={productNutritional_Value} onChange={(e)=>setProductNutritional_Value(e.target.value)} required />
                <br></br>
                <label className='my-label' htmlFor="health_benefits">Health Benefits:</label>
                <textarea type="text" id="health_benefits" className='form-control' name="health_benefits" value={productHealth_Benefits} onChange={(e)=>setProductHealth_Benefits(e.target.value)} required />
                <button className='btn btn-success my-btn-aqua' type="submit" onClick={handleSubmit}>Apply Changes</button>
                
              </form>
            </div>

            </Modal.Body>
          </Modal>

          <div>
      <h1>Products</h1>
      { userInfo[4] === 'admin' && <button className=' btn btn-success my-btn' onClick={()=>getAddProduct()} >Add New Products</button>}
      <br></br><br></br>
      <div className="product-container">
        {filteredProducts?.map((product) => (
          // console.log(product)
          <div key={product.id} className="product-card">
            <img style={{width:'60%', height:'40%', marginBottom:'20px'}} src={'http://localhost:4000/images/'+product.files} alt="Product" />
            <h2 className='para'>{product.name}</h2>
            <p><b>Category: </b>{product.category}</p>
            <p><b>Price: </b>{product.price}</p>
            {userInfo[4] === 'admin' && <p><b>Product Id: </b> {product.product_id} </p>}
            {userInfo[4] === 'admin' && <p><b>Quantity: </b> {product.quantity}</p>}
            {userInfo[4] === 'user' && <button className='btn btn-info view' onClick={()=>openModal(product)}>View </button>}
            {userInfo[4] === 'user' && <button className='btn btn-success addCart-btn' onClick={()=>{dispatch({type:'ADD_TO_CART', id:product.id, product})}}>Add to cart </button>}
            {userInfo[4] === 'admin' && <Button variant="primary" onClick={() => {setShow(true); updateProduct(); getEditData(product); setProductId(product.id); setProductName(product.name); setProductPrice(product.price); setProductQuantity(product.quantity); setProductCategory(product.category); setProductNutritional_Value(product.nutritional_value); setProductHealth_Benefits(product.health_benefits); setProduct_Id(product.product_id)}}>Update</Button>}
            {userInfo[4] === 'admin' && <button className='btn btn-success delete' onClick={()=>deleteProduct(product.id)}> Delete</button>}          
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}

export default DisplayData;



