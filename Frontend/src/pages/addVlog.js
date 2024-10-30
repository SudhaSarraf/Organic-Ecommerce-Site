import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVlog(){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const [vlogList, setVlogList] = useState([]);
    const [files, setFiles] = useState([]);
    const [vlogForm, setVlogForm] = useState({
      author:'',
      date:'',  
      title: '',
      introduction:'',
      content: '',
      files:''
    });

    const handleSubmit = async(event) =>{
        event.preventDefault();

        const x = new FormData();
        for(let i = 0; i<files.length; i++){
            x.append('files',files[i]);
        }

        var res = await axios.post(`http://localhost:4000/upload`,x);
        console.log(res.data.body, 'res');
        // alert(res.data.body.files);

        const image = res.data.body.files;

        var finalData = {...vlogForm, files: image};

        //send the data to the nodejs API
        fetch('http://localhost:4000/vlog', {
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
            setVlogList(prevList => [...prevList, vlogForm]);
        }
        else{
            alert(data.error);
        }
        })
        .catch(error =>{
            alert('An error occurred');
            console.error(error);
        });

        //clear the form input
        setVlogForm({
            author:'',
            date:'',  
            title:'',
            introduction:'',
            content:'',
            files:'',
        });
    };

    const handleInputChange = (event)=>{
        const{name, value} = event.target;
        setVlogForm((prevVlog) =>({
            ...prevVlog,
            [name]:value,
        }));
    }

    
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

      return(
        <div>
            <h1>Vlogs</h1>
            <div className='form_container' id='vlogFormSection'>
                <form className='form-group' id='vlogForm' onSubmit={handleSubmit}>
                <label className='my-label' htmlFor="author">Author:</label> 
                <input className='form-control' type="text" id="author" name="author" value={vlogForm.author} onChange={handleInputChange} required />
                <label className='my-label' htmlFor="date">Publishing Date:</label> 
                <input className='form-control' type="date" id="date" name="date" value={vlogForm.date} onChange={handleInputChange} required />    
                <label className='my-label' htmlFor="title">Title:</label> 
                <input className='form-control' type="text" id="title" name="title" value={vlogForm.title} onChange={handleInputChange} required />
                <label className='my-label' htmlFor="introduction">Introduction:</label>
                <textarea type="text" className='form-control' id="introduction" name="introduction" value={vlogForm.introduction} onChange={handleInputChange} required />
                <label className='my-label' htmlFor="content">Content:</label>
                <textarea type="text" className='form-control' id="content" name="content" value={vlogForm.content} onChange={handleInputChange} required />
                <label htmlFor='files' className='file'>
                    <input className='text' type='file' id='files' name='files' onChange={handleFileChange} required accept='image/png, image/jpg, image/jpeg'></input>
                </label>
                <button className='btn btn-success my-btn-aqua' type="submit">Add vlog</button>
                </form>

            </div>
        </div>
      )
}

export default AddVlog;