import React, { useState, useEffect } from "react"
import './styles/App.css'
import axios from 'axios'
import ProductManage from "./components/ProductManage"



const initialValues = {
  id:0,
  name:"",
  description:"",
  category:"",
  picture:""
}


function App() {

  // Save the data once time
  const urlDB="https://localhost:5001/api/ManagerDB"

  // setting the data
  const [data, setData]= useState([]);

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
      setData(res.data);
    }).catch(error=>{
      console.log(error);
    });
  }

  useEffect(() => {
    fetchGet();
  }, [])

  // Setting the enctype with Axios
  const configHeaders = {headers: {
    "Content-Type": "application/json",
  }}

  // POST method
  const fetchPost= async ()=> {
    // Avoid to modify the id. It's primary key, auto increment
    delete productData.id;

    await axios.post(urlDB, productData, configHeaders)
    .then(res=> {
      // Success Status
      setData(data.concat(res.data));
      controlModal.Insert();
    }).catch(error=>{
    });
  }
  // PUT method
  const fetchPut= async ()=> {
    await axios.put(urlDB+"/"+productData.id, productData, configHeaders)
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
        return product; // Be careful with this
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
      setData(data.filter(product=> product.id !== res.data))
      controlModal.Delete();
      window.location.reload();
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
  const handleChange= async (e)=> {
    e.preventDefault();

    const {name, value}= e.target;

    let fileObj = null;
    let imageBase64 = null;
    if (e.target.files) {
      fileObj = e.target.files;
      console.log(fileObj[0]);
      imageBase64 = await converToBase64(fileObj[0]);
    }
    console.log("convert64", imageBase64);
    setProductData({
      ...productData,
      [name]:value,
      picture: imageBase64
    });
  }

  /**
   * Convert Image to Base 64 (Binary format)
  */
  const converToBase64 = (imageFile) => {
    return new Promise((resolve, reject)=> {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="App container">
      <div className="App-header .bg-primary.bg-gradient">
        <h1>Product Catalog</h1>
        <h4>ASP.Net Core + ReactJs</h4>
        <div>
          <img src="./images/aspnetcore_logo.png" width="200px" alt="Asp .Net Core logo"/><img src="./images/react_logo.svg" width="200px" alt="ReactJs logo"/>
        </div>
      </div>
      <ProductManage
        data={data}
        stateModals={stateModals}
        controlModal={controlModal}
        handleChange={handleChange}
        crudMethod={crudMethod}
        selectProduct={selectProduct}
        productData={productData}
      />
      <hr />
    </div>
  );
}

export default App;
