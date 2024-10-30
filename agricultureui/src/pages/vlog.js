import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './getProduct.css';
import { useNavigate } from 'react-router-dom';

function DisplayVlog() {
  const [vlogDetails, setVlogDetails] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/vlog/all');
      setVlogDetails(response.data.output); // Assuming the response is in the format { output: [vlogDetails...] }
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

  return (
    <div className="vlog-list">
      {vlogDetails.map((vlog, index) => (
        <div className="vlog-item" key={vlog.id}>
          <img
            src={'http://localhost:4000/images/' + vlog.files}
            alt="Vlog"
          />
          <div className="vlog-details">
            <h2>{vlog.title}</h2>
            <p>{vlog.introduction}</p>
            <b><p>Posted on : {vlog.date}</p></b>
            <b><p>{vlog.author}</p></b>
            <div className="content">
              {vlog.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayVlog;
