import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ProductManage from "./components/ProductManage";



const initialValues = {
  id:0,
  name:"",
  description:"",
  category:"",
  picture:null
}


function App() {

  // Save the data once time
  const urlDB="https://localhost:5001/api/ManagerDB"

  // setting the data
  const [data, SetData]= useState([]);

  const [productData, setProductData] = useState(initialValues)

  //===========================================================
  /**
   * CRUD methods to manage the DB
  */
  // GET method
  const fetchGet= async ()=> {
    await axios.get(urlDB).then(res=> {
      // Success Status
      console.log(res);
      SetData(res.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  useEffect(() => {
    fetchGet();
  }, [])

  // POST method
  const fetchPost= async ()=> {
    // Avoid to modify the id. It's primary key, auto increment
    delete productData.id;
    await axios.post(urlDB, productData)
    .then(res=> {
      // Success Status
      SetData(data.concat(res.data));
      controlModal.Insert();
    }).catch(error=>{
      console.log(error);
    });
  }
  // PUT method
  const fetchPut= async ()=> {
    await axios.put(urlDB+"/"+productData.id, productData)
    .then(res=> {
      // Success
      var response = res.data;
      var dataHelper = data;

      dataHelper.map(product => {
        if(product.id === response.id) {
          product.name = response.name;
          product.description = response.description;
          product.category = response.category;
          product.picture = response.picture;
        }
        //return product; // Be careful with this
      });
      controlModal.Edit();

    }).catch(error=>{
      console.log(error);
    });
  }
  // DELETE method
  const fetchDelete= async ()=> {
    await axios.delete(urlDB+"/"+productData.id)
    .then(res=> {
      SetData(data.filter(product=> product.id !== res.data))
      controlModal.Delete();
    }).catch(error=>{
      console.log(error);
    });
  }
  // fast selection of methods
  const crudMethod = {
    post: () => fetchPost(),
    put: () => fetchPut(),
    delete: () => fetchDelete()
  }

  // Method to select a product to edit
  const selectProduct = (product, action) => {
    setProductData(product);
    (action === "Edit") ? controlModal.Edit() : controlModal.Delete();
  }

  /**
   * Modal controller. Open or close. false=close, true=open
  */
  const [modalInsert, setModalInsert]=useState(false);
  const [modalEdit, setModalEdit]=useState(false);
  const [modalDelete, setModalDelete]=useState(false);

  const controlModal = {
    Insert: () => setModalInsert(!modalInsert),
    Edit: () => setModalEdit(!modalEdit),
    Delete: () => setModalDelete(!modalDelete)
  }
  // Save insert, edit and delete modal status. true or false
  const stateModals = {
      "insert": modalInsert,
      "edit": modalEdit,
      "delete": modalDelete
  }

  /**
   * Onchange method
   */
  const handleChange= (e)=> {
    const {name, value}=e.target;
    setProductData({
      ...productData, [name]:value
    })
    console.log(productData);
  }

  return (
    <div className="App">
      <ProductManage
        data={data}
        stateModals={stateModals}
        controlModal={controlModal}
        handleChange={handleChange}
        crudMethod={crudMethod}
        selectProduct={selectProduct}
        productData={productData}
      />
    </div>
  );
}

export default App;
