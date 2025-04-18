import React, { useState } from "react";
import backgroundImage from '../../assets/img/conta.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    rating: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("description", formData.description);
      form.append("rating", formData.rating);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch("http://64.227.163.17:8000/testimonial/", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", description: "", rating: 0, image: null });
      } else {
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact section" style={{
      position: 'relative',
      padding: '3rem 0',
      overflow: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Background Image - Fixed Position */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: ` url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'brightness(0.7)',
        
      }}></div>
      {/* Dark Overlay */}
     {/* Overlay */}
     <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: -1
      }}></div>


      <div className="container section-title" data-aos="fade-up" style={{ 
        position: 'relative', 
        zIndex: 1,
        paddingTop: '2rem'
      }}>
        <h2 style={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Contact</h2>
        <div style={{ color: '#fff' }}>
          Get In <span style={{ color: '#f6ad55' }}>Touch</span>
        </div>
      </div>

      <div className="container" data-aos="fade" style={{ 
        position: 'relative', 
        zIndex: 1,
        paddingBottom: '3rem'
      }}>
        <div className="row gy-5 gx-lg-5">
          <div className="col-lg-4">
            <div className="info" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '25px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
              height: '100%'
            }}>
              <h3 style={{ color: '#333' }}>Contact Info</h3>
              <p style={{ color: '#555' }}>We&apos;d love to hear from you!</p>
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0" style={{ color: '#f6ad55', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>Location:</h4>
                  <p style={{ color: '#555', margin: 0 }}>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              <div className="info-item d-flex mt-4">
                <i className="bi bi-envelope flex-shrink-0" style={{ color: '#f6ad55', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>Email:</h4>
                  <p style={{ color: '#555', margin: 0 }}>info@example.com</p>
                </div>
              </div>
              <div className="info-item d-flex mt-4">
                <i className="bi bi-phone flex-shrink-0" style={{ color: '#f6ad55', fontSize: '1.5rem' }}></i>
                <div style={{ marginLeft: '15px' }}>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>Call:</h4>
                  <p style={{ color: '#555', margin: 0 }}>+1 5589 55488 55</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="php-email-form" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
            }}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ 
                      borderRadius: '4px', 
                      padding: '12px 15px',
                      border: '1px solid #ddd',
                      width: '100%',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ 
                      borderRadius: '4px', 
                      padding: '12px 15px',
                      border: '1px solid #ddd',
                      width: '100%',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{ 
                    borderRadius: '4px', 
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    width: '100%',
                    minHeight: '150px',
                    fontSize: '1rem'
                  }}
                ></textarea>
              </div>

              {/* Star Rating and Image Upload */}
              <div className="form-group mt-3">
                <div className="d-flex flex-column flex-md-row align-items-md-center">
                  <div className="mb-3 mb-md-0 me-md-4">
                    <label className="d-block mb-2" style={{ color: '#333', fontWeight: '500' }}>Rate Us:</label>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} style={{ fontSize: "28px", cursor: "pointer", marginRight: "8px" }}>
                          <input
                            type="radio"
                            name="rating"
                            value={star}
                            checked={formData.rating === star}
                            onChange={() => setFormData((prev) => ({ ...prev, rating: star }))}
                            style={{ display: "none" }}
                          />
                          {star <= formData.rating ? "⭐" : "☆"}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="d-block mb-2" style={{ color: '#333', fontWeight: '500' }}>Upload Image:</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ 
                        borderRadius: '4px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="my-3">
                {loading && (
                  <div className="loading" style={{ 
                    color: '#f6ad55',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    Sending your message...
                  </div>
                )}
                {message && (
                  <div className={`sent-message ${message.includes("error") ? "error-message" : ""}`} 
                    style={{ 
                      color: message.includes("error") ? '#dc3545' : '#28a745',
                      fontWeight: '500',
                      textAlign: 'center'
                    }}
                  >
                    {message}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={loading} 
                  style={{
                    background: '#f6ad55',
                    border: 'none',
                    padding: '12px 35px',
                    borderRadius: '4px',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    width: '100%',
                    maxWidth: '250px'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#e69c3d'}
                  onMouseOut={(e) => e.target.style.background = '#f6ad55'}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-5" style={{ 
        position: 'relative', 
        zIndex: 1,
        paddingBottom: '3rem'
      }}>
        <iframe
          title="Location Map"
          style={{ 
            width: "100%", 
            height: "400px", 
            border: 'none', 
            borderRadius: '8px', 
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white'
          }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;