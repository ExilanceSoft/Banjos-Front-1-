import React, { useState, useEffect } from 'react';
import { FaStar, FaUtensils, FaLeaf, FaDrumstickBite } from 'react-icons/fa';

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});
  const BASE_URL = "http://64.227.163.17:8000";

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/menu`);
        if (!response.ok) throw new Error('Failed to fetch menu data');
        const data = await response.json();
        setMenuItems(data);
        
        // Initialize image loaded state
        const initialImageState = {};
        data.forEach(item => {
          initialImageState[item.id] = false;
        });
        setImageLoaded(initialImageState);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const filteredItems = menuItems.filter(item => {
    if (activeFilter === 'all') return item.category_name === 'special';
    if (activeFilter === 'veg') return item.category_name === 'special' && item.is_veg;
    if (activeFilter === 'non-veg') return item.category_name === 'special' && !item.is_veg;
    return false;
  });

  if (loading) {
    return (
      <section className="special-menu py-5 bg-light">
        <div className="container text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading special menu...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="special-menu py-5 bg-light">
        <div className="container text-center py-5">
          <div className="alert alert-warning" role="alert">
            Error loading menu: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="special-menu" className="special-menu py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="display-4 fw-bold">Special Menu</h2>
          <p className="text-muted">Our chef&apos;s special creations</p>
          <div className="divider mx-auto bg-warning" style={{ height: '3px', width: '80px' }}></div>
        </div>

        {/* Filter Tabs */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <ul className="nav nav-pills justify-content-center">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeFilter === 'all' ? 'active bg-warning text-dark' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <FaUtensils className="me-2" /> All Items
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeFilter === 'veg' ? 'active bg-warning text-dark' : ''}`}
                  onClick={() => setActiveFilter('veg')}
                >
                  <FaLeaf className="me-2" /> Vegetarian
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeFilter === 'non-veg' ? 'active bg-warning text-dark' : ''}`}
                  onClick={() => setActiveFilter('non-veg')}
                >
                  <FaDrumstickBite className="me-2" /> Non-Vegetarian
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Items */}
        <div className="row g-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="special-item card h-100 border-0 shadow-sm overflow-hidden">
                  <div className="position-relative">
                    {!imageLoaded[item.id] && (
                      <div 
                        className="card-img-top img-fluid placeholder-glow"
                        style={{ 
                          height: '250px', 
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <div className="spinner-border text-warning" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    <img 
                      src={`${BASE_URL}${item.image_url}`}
                      alt={item.name}
                      className={`card-img-top img-fluid ${!imageLoaded[item.id] ? 'd-none' : ''}`}
                      style={{ 
                        height: '250px', 
                        objectFit: 'cover',
                        transition: 'opacity 0.3s ease'
                      }}
                      onLoad={() => handleImageLoad(item.id)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-food.jpg';
                      }}
                    />
                    <div className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                      <FaStar className="me-1" /> Special
                    </div>
                    <div className={`badge position-absolute top-0 start-0 m-2 ${item.is_veg ? 'bg-success' : 'bg-danger'}`}>
                      {item.is_veg ? 'Veg' : 'Non-Veg'}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      {/* <h5 className="card-title mb-0">{item.name}</h5> */}
                      <span className="text-warning fw-bold">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="card-text text-muted">{item.description}</p>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <button className="btn btn-warning text-dark w-100">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5>No special items available</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;