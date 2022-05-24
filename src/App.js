import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'


function App() {

  const urlDB="https://localhost:5001/api/ManagerDB"
  const [data, SetData]= useState([]);

  const fetchGet= async ()=> {
    await axios.get(urlDB).then(res=> {
      // Success Status
      SetData(res.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  useEffect(() => {
    fetchGet();
  }, [])
  

  return (
    <div className="App">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data.map(manage=>(
          <tr key={manage.id}>
            <td>{manage.id}</td>
            <td>{manage.name}</td>
            <td>{manage.category}</td>
            <td>{manage.description}</td>
            <td>{manage.picture}</td>
            <td>
              <button className="btn btn-primary">Edit</button> {" "}
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
