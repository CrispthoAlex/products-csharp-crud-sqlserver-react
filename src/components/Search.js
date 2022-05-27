import React, { useState } from "react";
import { ProductTableRow } from './ProductTableRow'


export const Search = ({data, selectProduct}) => {
  
  // console.log(...data);
  const [search, setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = search === null? {...data} :
  data.filter( product => {
    //console.log(search);
    return (
      (product.name.toLowerCase().includes(search.toLowerCase())
       || product.description.toLowerCase().includes(search.toLowerCase()))
       || product.category.toLowerCase().includes(search.toLowerCase()
      )
  )});

  return (
    <>
      <tr>
        <td className="filterRow" colSpan="6">
          Filter products:{" "}
          <input
            type="text"
            value={search}
            onChange={ handleSearchChange }
            placeholder="Search..."
          />
        </td>
      </tr>
      { filtered.map((product) => {
        return (
          <ProductTableRow
            key={product.id}
            product={product}
            selectProduct={selectProduct}
          />
        );
      })
      }
    </>
  );
};

export default Search;
