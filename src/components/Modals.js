import React from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useFormik } from 'formik'
import * as Yup from 'yup'



const Modals = ({stateModals, controlModal,
                handleChange, crudMethod,
                productData
              }) => {

  const formik = useFormik({
    initialValues: {
      id:0,
      name:"",
      description:"",
      category:"",
      picture:""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
      description: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      category: Yup.string()
        .required('Required'),
    }),
  });

  return (
    <div>
      <Modal isOpen={stateModals.insert}>
        <ModalHeader>Insert Product</ModalHeader>
        <ModalBody>
          <form className="form-group">
            <label htmlFor='name'>Name: </label><br/>
            <input type="text" className="form-control"
              name="name" onChange={handleChange}
              placeholder='Product Name'
            />
            {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
            ) : null}
              <br/>
            <label htmlFor='description'>Description: </label><br/>
            <input type="text" className="form-control"
              name="description" onChange={handleChange}
              placeholder='Product description'
            />
            {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
            ) : null}
            <br/>
            <label htmlFor='category'>Category: </label><br/>
            <input type="text" className="form-control"
              name="category" onChange={handleChange}
              placeholder='Product category'
            />
            {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
            ) : null}
            <br/>
            <label>Picture: </label><br/>
            <input type="file" accept='image/*' className="form-control-file"
              name="picture" alt="Product image" onChange={handleChange}
            /><br/>
            { !productData.picture ? <span>Not Image selected</span> :
              <img
                src={productData.picture} className='img-thumbnail rounded mx-auto d-block'
                width="50%" alt="Product uploaded"
              />
            }
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={ ()=> {crudMethod.post()} }
          >Insert
          </button>
          <button className="btn btn-danger"
            onClick={ ()=>{controlModal.Insert()} }
          >Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={stateModals.edit}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <form className="form-group">
            <label>Id: </label><br/>
            <input type="number" className="form-control"
              readOnly value={productData && productData.id}
            /><br/>
            <label htmlFor='name'>Name: </label><br/>
            <input type="text" className="form-control" name="name"
              onChange={handleChange}
              value={productData && productData.name}
            />
            {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
            ) : null}
            <br/>
            <label htmlFor='description'>Description: </label><br/>
            <input type="text" className="form-control" name="description"
              onChange={handleChange}
              value={productData && productData.description}
            />
            {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
            ) : null}
            <br/>
            <label htmlFor='category'>Category: </label><br/>
            <input type="text" className="form-control" name="category"
              onChange={handleChange}
              value={productData && productData.category}
            />
            {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
            ) : null}
            <br/>
            <label>Picture: </label><br/>
            <input type="file" accept='image/*' className="form-control-file"
              name="picture" alt="Product image" onChange={handleChange}
            /><br/>
            { !productData.picture ? <span>Not Image selected</span> :
              <img
                src={productData.picture} className='img-thumbnail rounded mx-auto d-block'
                width="50%" alt="Product uploaded"
              />
            }
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
            onClick={ ()=> {crudMethod.put()} }
          >Edit
          </button>
          <button className="btn btn-danger"
            onClick={ ()=>{ controlModal.Edit()} }
          >Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={stateModals.delete}>
        <ModalHeader>Delete Product</ModalHeader>
        <ModalBody>
          Do you want to delete &gt;&gt; {productData && productData.name} product?
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
