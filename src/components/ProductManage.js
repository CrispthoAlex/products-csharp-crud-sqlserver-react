import React from 'react'
import Modals from './Modals'
import { Search } from './Search'
import '../styles/Table.css'



export const ProductManage = (
  {data, stateModals, controlModal, handleChange, crudMethod,
    selectProduct, productData }) => {

  return (
    <div>
      <br/><br/>
      <button
      onClick={()=> controlModal.Insert()}
      className="btn btn-success"
      >
        Insert New Product
      </button>
      <br/><br/>
      <table>
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
          {data.length > 0 ? (
            <Search
              data={data}
              selectProduct={selectProduct}
            />
          ) : (
            <tr>
              <td colSpan="6">Not Data</td>
            </tr>
          )  
          }
        </tbody>
      </table>
      <Modals
        stateModals={stateModals}
        controlModal={controlModal}
        handleChange={handleChange}
        crudMethod={crudMethod}
        productData={productData}
      />
    </div>
  )
}

export default ProductManage
