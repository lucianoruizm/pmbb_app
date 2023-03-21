import { useEffect, useState } from "react";
import {Navbar} from "../components/Navbar/Navbar"
import {Card} from "../components/Card/Card"
import {Filter} from "../components/Filter/Filter"
import {Search} from "../components/Search/Search"
import {SlideshowGallery} from "../components/SlideshowGallery/SlideshowGallery"
import { Pagination } from "../components/Pagination/Pagination";
//import { data as productList } from "../data";
import './LandingPage.css';


export const LandingPage = () => {

  const [fetchedData, updateFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [exist, setExist] = useState(false)
  
  // useEffect(() => {
  //   const fetchData = () => {
  //     setLoading(true);
  //     const res = [ ...productList];
  //     updateFetchedData(res);
  //     setExist(true);
  //     setLoading(false);
  //   }
  //   fetchData()
  // }, [])

  let api = `http://localhost:8000/products/?name=${search}&category=${category}`;

  // Get de los productos
  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const response = await fetch(api);
        const data = await response.json();
        updateFetchedData(data);
        setExist(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [api])

  // function handleSearch(e) {
  //   const query = e.target.value;
  //   const queryLowerCase = query.toLowerCase();

  //   if (!!queryLowerCase) {
  //     const search = productList.filter((product) => {
  //       return (
  //         product.name.toLowerCase().includes(queryLowerCase) ||
  //         product.description.toLowerCase().includes(queryLowerCase)
  //       );
  //     });

  //     updateFetchedData(search);
  //     setCurrentPage(1);
  //   } else {
  //     updateFetchedData(productList);
  //   }
  // }

  function handleFilter(e) {
    const query = e.target.value;

    // if (!!query) {
    //   const filterCategory = productList.filter((product) => {
    //     return (
    //       product.category.includes(query)
    //     );
    //   });
  
    //   updateFetchedData(filterCategory);
    //   setCurrentPage(1);
    // } else {
    //   updateFetchedData(productList);
    // }
    setCurrentPage(1);
    setCategory(query)
  }

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = fetchedData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
        <Navbar />
        <div id="gallery">
          <SlideshowGallery />
        </div>
        <h1 id="h1">Nuestros Productos</h1>
        {/* <Search onSearch={handleSearch} /> */}
        <Search setSearch={setSearch} page={setCurrentPage} />
        <div className="filter-cards-containers">
          <div className="filter-container">
            {/* <Filter onFilter={handleFilter}/> */}
            <Filter onFilter={handleFilter}/>
          </div>
          <div className="grid-container">
            <Card results={currentProducts} loading={loading} exist={exist} />
          </div>
        </div>
        <Pagination 
          productsPerPage={productsPerPage} 
          totalProducts={fetchedData.length}
          paginate={paginate} />
    </div>
  )
}
