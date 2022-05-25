import React from 'react'
import Modals from './Modals'
import { ProductTableRow } from './ProductTableRow'



export const ProductManage = ({data, opencloseModal, controlModal, handleChange, fetchPost}) => {

  return (
    <div className='container '>
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
          {data.length > 0 ? (data.map((el)=> (
              <ProductTableRow
                key={el.id}
                el={el}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">Not Data</td>
            </tr>
          )
            
          }
        </tbody>
      </table>
      <Modals
        opencloseModal={opencloseModal}
        controlModal={controlModal}
        handleChange={handleChange}
        fetchPost={fetchPost}
      />
    </div>
  )
}

export default ProductManage
