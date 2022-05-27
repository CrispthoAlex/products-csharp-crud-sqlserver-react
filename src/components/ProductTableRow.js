import React from 'react'


export const ProductTableRow = ({product, selectProduct}) => {
  
  const {
    id, name,
    description, category,
    picture } = product;
  
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{picture}</td>
      <td>
        <button className="btn btn-primary" onClick={ () => { selectProduct(product, "Edit") }}>Edit</button>
        <button className="btn btn-danger" onClick={ () => { selectProduct(product, "Delete") }}>Delete</button>
      </td>
    </tr>
  )
}

export default ProductTableRow
