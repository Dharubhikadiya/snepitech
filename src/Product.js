import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Product = () => {

  const [products, setProducts] = useState([]);
  const [currentpage,setCurrentPage] = useState(1);

  const recordperpage = 6;
  const lastIndex = currentpage * recordperpage;
  const firstIndex = lastIndex - recordperpage;

  const currenProduct = products.slice(firstIndex,lastIndex);

  const npages = Math.ceil(products.length / recordperpage);

  const number = [...Array(npages + 1).keys()].slice(1);

  const changeCpage = (id) => {
    setCurrentPage(id)
  }


  const allProduct = () => {
    axios.get(`http://localhost:7000/News`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
        return false;
      }) 
  }

   const searchdata = async(e) => {
    let data = await axios.get(`http://localhost:7000/News?q=${e}`);
    setProducts(data.data)
  }

  useEffect(() => {
    allProduct();
  }, [])

  return (
    <div>
      <div className='container mt-5'>
      </div>
      <div className='container d-flex'>
        <div className='col-md-12 ms-4'>
          <div className='row'>
          <form className="d-flex align-item-center justify-content-end">
              <input onChange={(e)=>searchdata(e.target.value)} className="form-control mb-4 py-3 ps-4 w-50" type="search" placeholder="Search...."/>
            </form>
            <table class="table table-striped table-hover">
            <thead>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>author</td>
                <td>title</td>
                <td>description</td>
                <td>publishedAt</td>
                <td>image</td>
                <td>content</td>
              </tr>
            </thead>
            <tbody>
            {
             
                currenProduct.map((val) => {
                return (
                    <tr>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.author}</td>
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.publishedAt}</td>
                      <td><img src={val.urlToImage} width={200} height={200}></img></td>
                      <td>{val.content}</td>
                    </tr>              
                )
              })
            }
            </tbody>
            </table>
            <div className='d-flex align-items-center justify-content-center'>
          
            {number.map(n => (
              <div className='border '>
              <div key={n} 
              className= {`page-item ${currentpage == n ? 'active' : ''} `}>

              <a onClick={() => setCurrentPage(n)}  
                  className='page-link p-3 px-4' 
                  href='#'>
                  {n}
              </a>
          </div>
              </div>
          ))}
          
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
