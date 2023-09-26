import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


const url='https://api.punkapi.com/v2/beers/';

function App() {

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData=async() =>{
    const response=await axios.get(url)
    setItems(response.data)

  }
  useEffect(()=>{
    fetchData();
  },[])


  return (
    <>
    <div>
      <div className="Search-container">
        <input type="text" id='searchInput' className='Search-box' placeholder='Search Here' onChange={(e)=>{
          setSearchTerm(e.target.value);
        }} />
      </div>
      <div className='Cards-container'>
        {
          items
          .filter((value)=>{
            if(searchTerm===""){
              return value;
            }else if(
              value.name.toLowerCase().includes(searchTerm.toLowerCase())
            ){
              return value;
            }
          })
          .map(item=>
            <div key={item.id} className='Cards'>
              <img className='Cards-img' src={item.image_url} alt="item-image" />
              <h5 className='Cards-name'>{item.name}</h5>
            </div>
          )  
        }
      </div>
    </div>    
    </>
  )
}

export default App
