import React from 'react'


export const ProductTableRow = ({el}) => {
  
  const {
    id, name,
    description, category,
    picture } = el;
  
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{picture}</td>
      <td>
        <button className="btn btn-primary">Edit</button> {" "}
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  )
}

export default ProductTableRow
