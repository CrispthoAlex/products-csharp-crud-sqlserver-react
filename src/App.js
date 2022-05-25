import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'


const initialValues = {
  id:0,
  name:"",
  description:"",
  category:"",
  picture:null
}


function App() {

  // Save the data once time
  const urlDB="https://localhost:5001/api/ManagerDB"

  // setting the data
  const [data, SetData]= useState([]);

  const [productData, setProductData] = useState(initialValues)

  //===========================================================
  /**
   * CRUD methods to manage the DB
  */
  const fetchGet= async ()=> {
    await axios.get(urlDB).then(res=> {
      // Success Status
      console.log(res);
      SetData(res.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  useEffect(() => {
    fetchGet();
  }, [])

  const fetchPost= async ()=> {
    // Avoid to modify the id. It's primary key, auto increment
    delete productData.id;
    await axios.post(urlDB, productData)
    .then(res=> {
      // Success Status
      SetData(data.concat(res.data));
    })
    .catch(error=>{
      console.log(error);
    });
  }

  // Modal controller. Open or close. false=close, true=open
  const [controlModal, setControlModal]=useState(false);
  const opencloseModal = ()=> {
    setControlModal(!controlModal);
  }

  // Onchange method
  const handleChange= (e)=> {
    const {name, value}=e.target;
    setProductData({
      ...productData, [name]:value
    })
  }

  


  return (
    <div className="App">
      <br/><br/>
      <button
      onClick={()=> opencloseModal()}
      className="btn btn-success"
      >
        Insert new data
      </button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data.map(manage=>(
          <tr key={manage.id}>
            <td>{manage.id}</td>
            <td>{manage.name}</td>
            <td>{manage.description}</td>
            <td>{manage.category}</td>
            <td>{manage.picture}</td>
            <td>
              <button className="btn btn-primary">Edit</button> {" "}
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <Modal isOpen={controlModal}>
        <ModalHeader>Insert DataBase Manager</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name: </label><br/>
            <input type="text" className="form-control" name="name" onChange={handleChange}/><br/>
            <label>Category: </label><br/>
            <input type="text" className="form-control" name="category" onChange={handleChange}/><br/>
            <label>Description: </label><br/>
            <input type="text" className="form-control" name="description" onChange={handleChange}/><br/>
            <label>Picture </label><br/>
            <input type="file" className="form-control" alt="Product image" name="picture" onChange={handleChange}/><br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={ ()=> {fetchPost()} }>Insert</button> {" "}
          <button className="btn btn-danger" onClick={ ()=>{opencloseModal()} }>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
