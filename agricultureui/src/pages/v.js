import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './getProduct.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function DisplayVlog() {
  const [vlogDetails, setVlogDetails] = useState([]);
  const navigate = useNavigate();
  // const { dispatch } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState([]);
  const [selectedvlog, setSelectedVlog] = useState(null);
  // const [showFullDetails, setShowFullDetails] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/vlog/all');
      setVlogDetails(response.data.output); // Assuming the response is in the format { output: [productDetails...] }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('userInfo'));
    if (auth) {
      let y = Object.values(auth);
      setUserInfo(y);
    } else {
      localStorage.removeItem('userInfo');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const openModal = (vlog) => {
    setSelectedVlog(vlog);
  };

  const closeModal = () => {
    setSelectedVlog(null);
  };


  return (
    <>
      {selectedvlog && (
        <Modal show={selectedvlog !== null} onHide={closeModal} size="lg" dialogClassName="product-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedvlog?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              src={'http://localhost:4000/images/' + selectedvlog?.files}
              alt="Product"
            />

              <>
                <p><b>Content:</b></p>
                {selectedvlog?.content.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </>

          </Modal.Body>
        </Modal>
      )}

      {vlogDetails.map((vlog, index) => (
        <div className="full-page-image" key={vlog.id}>
          <img
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
            src={'http://localhost:4000/images/' + vlog.files}
            alt="Product"
          />
          <div className="full-page-details">
            <h1>{vlog.title}</h1>
            <p>{vlog.content}</p>
            <button onClick={() => openModal(vlog)}>Read more</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default DisplayVlog;
