import React, { useState } from 'react';
import './ProductList.css'; 
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const [showCart, setShowCart] = useState(false); 
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  // Calculate total items for the navbar
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://t3.ftcdn.net/jpg/04/18/25/78/360_F_418257850_w31Hw7XN6o1bcP2c2Wk6q1N8b5r5j5j5.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484279-a21d1d6a49d9?w=500&auto=format&fit=crop&q=60", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1563200021-d8525e626027?w=500&auto=format&fit=crop&q=60", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592873117462-23c58852e693?w=500&auto=format&fit=crop&q=60", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
      ]
    },
    {
        category: "Medicinal Plants",
        plants: [
          { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547610015-c20e2311456a?w=500&auto=format&fit=crop&q=60", description: "Soothing gel used for skin ailments.", cost: "$14" },
          { name: "Mint", image: "https://images.unsplash.com/photo-1626466336329-37335d212726?w=500&auto=format&fit=crop&q=60", description: "Relieves digestive issues and headaches.", cost: "$10" },
        ]
      }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true, 
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); 
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false); 
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{backgroundColor: '#4CAF50', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px'}}>
        <div className="tag">
          <div className="luxury">
            <h3 style={{color:'white'}}>Paradise Nursery</h3>
            <i style={{color:'white'}}>Where Green Meets Serenity</i>
          </div>
        </div>
        <div>
          <a href="#" onClick={(e)=>handlePlantsClick(e)} style={{color: 'white', fontSize: '20px', textDecoration: 'none', marginRight: '30px'}}>Plants</a>
          <a href="#" onClick={(e) => handleCartClick(e)} style={{color: 'white', fontSize: '20px', textDecoration: 'none'}}>
            Cart <span className='cart_quantity_count'>{totalQuantity}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button 
                      className="product-button" 
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]} 
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping}/>
      )}
    </div>
  );
}

export default ProductList;