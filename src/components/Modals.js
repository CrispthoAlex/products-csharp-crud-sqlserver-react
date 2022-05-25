import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';



const Modals = ({opencloseModal, controlModal, handleChange, fetchPost}) => {


  return (
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
  )
}

export default Modals
