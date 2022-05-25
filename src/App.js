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

  const fetchPost= async ()=> {
    // Avoid to modify the id. It's primary key, auto increment
    delete productData.id;
    await axios.post(urlDB, productData)
    .then(res=> {
      // Success Status
      SetData(data.concat(res.data));
    })
    .catch(error=>{
      console.log(error);
    });
  }

  // Modal controller. Open or close. false=close, true=open
  const [controlModal, setControlModal]=useState(false);
  const opencloseModal = ()=> {
    setControlModal(!controlModal);
  }

  // Onchange method
  const handleChange= (e)=> {
    const {name, value}=e.target;
    console.log(name, value);
    setProductData({
      ...productData, [name]:value
    })
  }
  

  return (
    <div className="App">
      <ProductManage
        data={data}
        opencloseModal={opencloseModal}
        controlModal={controlModal}
        handleChange={handleChange}
        fetchPost={fetchPost}
      />
    </div>
  );
}

export default App;
