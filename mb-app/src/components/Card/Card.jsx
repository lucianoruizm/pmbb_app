import { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import './Card.css';
import { CardModal } from "./CardModal";

export const Card = ({ results, loading, exist }) => {

  //modal states
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState([]);

  // Favorites
  const [favs, setFavs] = useState([]);
  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
  
  useEffect(() => {
    if (getArray !== 0) {
      setFavs([...getArray]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(loading) {
    return <div className="loadingContainer">
      <h3>Cargando...</h3>
    </div>
  }

  const onAdd = (props) => {
      let array = favs;
      let addArray = true;
      array.map((item, key) => {
        if (item === props.id_product) {
          array.splice(key, 1);
          addArray = false;
        }
        return addArray;
      });
      if (addArray) {
        array.push(props.id_product);
      }
      setFavs([...array])

      localStorage.setItem("favorites", JSON.stringify(favs));

      let storage = localStorage.getItem('favItem' + (props.id_product) || '0');
      if (storage == null) {
        localStorage.setItem(('favItem' + (props.id_product)), JSON.stringify(props.x));
      } else {
        localStorage.removeItem('favItem' + (props.id_product));
      }
  }
  // Favourites end--

  //modal function
  const getData = (id, name, img) => {
    let tempData = [id, name, img]
    setTempData(item => [1, ...tempData])
    return setShowModal(true)
  }

  let display;
  if (results && exist) {
      display = results.map((x) => {
          let { id_product, name, price, size, img, description } = x;
          return (
              <div 
                className="cards-container"
              >
                <div
                  key={id_product}
                  className="card" 
                >
                    <img className="card-img" src={img} alt="img" onClick={() => getData(id_product, name, img)} />
                    <div className="card-body">
                        <div className='heart'>
                            <div className="card-name">{name}</div>
                              {favs.includes(id_product)? (
                                    <BsSuitHeartFill
                                      onClick={() => onAdd({ x, id_product })}
                                      style={{ color: 'red'}}
                                    />
                                  ) : (
                                        <BsSuitHeart
                                          onClick={() => onAdd({ x, id_product })}
                                          style={{ color: 'red'}} 
                                        />
                              )}
                        </div>
                        <div className="card-info-container">
                            <div className="card-info"><strong>Precio:</strong> {price}</div>
                            {size? <div className="card-info"><strong>Tamaño:</strong> {size}</div> : ''}
                            <div className="card-info"><strong>Descripción:</strong> {description}</div>
                        </div>
                    </div>
                </div>
                {showModal ? <CardModal name={tempData[2]} img={tempData[3]} hideModal={()=>{setShowModal(false)}} /> : null}
              </div>
          );
      });
  } else {
    display = "No products Found :/";
  }

  return <>{display}</>
}