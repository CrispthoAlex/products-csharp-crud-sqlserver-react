import React from 'react'
import Modals from './Modals'
import { ProductTableRow } from './ProductTableRow'



export const ProductManage = ({data, stateModals, controlModal,
                              handleChange, crudMethod,
                              selectProduct, productData
                            }) => {

  return (
    <div className='container '>
      <br/><br/>
      <button
      onClick={()=> controlModal.Insert()}
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
          {data.length > 0 ? (data.map((product)=> (
              <ProductTableRow
                key={product.id}
                product={product}
                selectProduct={selectProduct}
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
