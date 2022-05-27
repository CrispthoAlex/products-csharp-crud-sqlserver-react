import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';



const Modals = ({stateModals, controlModal,
                handleChange, crudMethod,
                productData
              }) => {


  return (
    <div>
      <Modal isOpen={stateModals.insert}>
        <ModalHeader>
          Insert Product
          <p>DataBase Manager</p>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name: </label><br/>
            <input type="text" className="form-control"
              name="name" onChange={handleChange}/><br/>
            <label>Description: </label><br/>
            <input type="text" className="form-control"
              name="description" onChange={handleChange}/><br/>
            <label>Category: </label><br/>
            <input type="text" className="form-control"
              name="category" onChange={handleChange}/><br/>
            <label>Picture: </label><br/>
            <input type="file" accept='image/*' className="form-control-file"
              name="picture" alt="Product image" onChange={handleChange}/><br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={ ()=> {crudMethod.post()} }
          >Insert
          </button> {" "}
          <button className="btn btn-danger"
            onClick={ ()=>{controlModal.Insert()} }
          >Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={stateModals.edit}>
        <ModalHeader>
          Edit Product
          <p>DataBase Manager</p>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id: </label><br/>
            <input type="number" className="form-control"
              readOnly value={productData && productData.id}/><br/>
            <label>Name: </label><br/>
            <input type="text" className="form-control" name="name"
              onChange={handleChange} value={productData && productData.name}/><br/>
            <label>Description: </label><br/>
            <input type="text" className="form-control" name="description"
              onChange={handleChange}
              value={productData && productData.description}/><br/>
            <label>Category: </label><br/>
            <input type="text" className="form-control" name="category"
              onChange={handleChange}
              value={productData && productData.category}/><br/>
            <label>Picture: </label><br/>
            <input type="file" className="form-control"
              name="picture" alt="Product image" onChange={handleChange}
              value={productData && productData.picture}/><br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={ ()=> {crudMethod.put()} }
          >Edit
          </button> {" "}
          <button className="btn btn-danger"
            onClick={ ()=>{ controlModal.Edit()} }
          >Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={stateModals.delete}>
        <ModalBody>
          Do you want to delete {productData && productData.name} product?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger'
            onClick={ ()=> {crudMethod.delete()} }
          >Yes
          </button>
          <button className='btn btn-secondary'
            onClick={ ()=> {controlModal.Delete()} }
          >No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Modals
