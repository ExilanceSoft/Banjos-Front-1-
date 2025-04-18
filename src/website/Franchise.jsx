import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { motion } from 'framer-motion'; 
import reservation from '../assets/img/reservation.jpg';

const Franchise = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    requested_country: null,
    requested_state: null,
    requested_city: null,
    investment_budget: '',
    experience_in_food_business: '',
    additional_details: '',
    request_status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.8 }
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = formData.requested_country
    ? State.getStatesOfCountry(formData.requested_country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = formData.requested_country && formData.requested_state
    ? City.getCitiesOfState(formData.requested_country, formData.requested_state).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_country: selectedOption.value,
      requested_state: null,
      requested_city: null,
    });
  };

  const handleStateChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_state: selectedOption.value,
      requested_city: null,
    });
  };

  const handleCityChange = (selectedOption) => {
    setFormData({
      ...formData,
      requested_city: selectedOption.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);

    const payload = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_phone: formData.user_phone,
      requested_city: formData.requested_city,
      requested_state: formData.requested_state,
      requested_country: formData.requested_country,
      investment_budget: formData.investment_budget,
      experience_in_food_business: formData.experience_in_food_business,
      additional_details: formData.additional_details,
      request_status: formData.request_status,
    };

    try {
      const response = await fetch('http://64.227.163.17:8000/franchise/requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      const data = await response.json();
      console.log('Response Data:', data);

      setFormData({
        user_name: '',
        user_email: '',
        user_phone: '',
        requested_country: null,
        requested_state: null,
        requested_city: null,
        investment_budget: '',
        experience_in_food_business: '',
        additional_details: '',
        request_status: 'pending',
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const styles = {
    franchiseBanner: {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      marginBottom: '50px'
    },
    reservationImg: {
      backgroundImage: `url(${reservation})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px'
    },
    reservationFormBg: {
      backgroundColor: '#fff',
      padding: '40px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)'
    },
    formControl: {
      width: '100%',
      padding: '10px 15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '15px'
    },
    submitButton: {
      backgroundColor: '#ffc107',
      color: '#333',
      padding: '12px 30px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    submitButtonHover: {
      backgroundColor: '#ffab00'
    }
  };

  return (
    <>
      {/* Banner Section with Animation */}
      <motion.section 
        className="franchise-banner"
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        style={styles.franchiseBanner}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h1 
            style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' ,color:'#ffc107'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Own a Banjo&apos;s Franchise
          </motion.h1>
          <motion.p 
            style={{ fontSize: '20px', lineHeight: '1.6' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Join our growing family of franchise owners and bring the Banjo&apos;s experience to your community
          </motion.p>
        </div>
      </motion.section>

      {/* Form Section */}
      <section id="book-a-table" className="book-a-table" style={{ padding: '60px 0' }}>
        <motion.div 
          className="container text-center" 
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '15px' }}>Franchise Inquiry</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>Fill out the form below to inquire about franchise opportunities</p>
        </motion.div>

        <div className="container">
          <motion.div 
            className="row" 
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <div className="col-lg-6" style={styles.reservationImg}></div>

            <div className="col-lg-6" style={styles.reservationFormBg}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="user_name"
                      style={styles.formControl}
                      placeholder="Your Name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      style={styles.formControl}
                      name="user_email"
                      placeholder="Your Email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      style={styles.formControl}
                      name="user_phone"
                      placeholder="Your Phone"
                      value={formData.user_phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <Select
                      options={countryOptions}
                      value={countryOptions.find((c) => c.value === formData.requested_country)}
                      onChange={handleCountryChange}
                      placeholder="Select Country"
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '5px',
                          marginBottom: '15px'
                        })
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <Select
                      options={stateOptions}
                      value={stateOptions.find((s) => s.value === formData.requested_state)}
                      onChange={handleStateChange}
                      placeholder="Select State"
                      isDisabled={!formData.requested_country}
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '5px',
                          marginBottom: '15px'
                        })
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <Select
                      options={cityOptions}
                      value={cityOptions.find((c) => c.value === formData.requested_city)}
                      onChange={handleCityChange}
                      placeholder="Select City"
                      isDisabled={!formData.requested_state}
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '5px',
                          marginBottom: '15px'
                        })
                      }}
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="number"
                      style={styles.formControl}
                      name="investment_budget"
                      placeholder="Investment Budget"
                      value={formData.investment_budget}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <textarea
                    style={{ ...styles.formControl, minHeight: '100px' }}
                    name="experience_in_food_business"
                    placeholder="Experience in Food Business"
                    value={formData.experience_in_food_business}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <textarea
                    style={{ ...styles.formControl, minHeight: '100px' }}
                    name="additional_details"
                    placeholder="Additional Details"
                    value={formData.additional_details}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="text-center">
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={styles.submitButton}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
                  >
                    {loading ? 'Submitting...' : 'Send Inquiry'}
                  </button>
                </div>

                {submitted && (
                  <motion.p 
                    style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Request submitted successfully!
                  </motion.p>
                )}
                {error && (
                  <motion.p 
                    style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Franchise;