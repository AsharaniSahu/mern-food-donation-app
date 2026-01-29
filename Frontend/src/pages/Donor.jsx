import React, { useState } from 'react';
import axios from 'axios';
import './FoodDonation.css';
import { useNavigate } from 'react-router-dom'; 


const DonorForm = () => {

    const navigate = useNavigate(); // ✅ initialize here
  
  const [formData, setFormData] = useState({
    foodItem: '',
    quantity: 1,
    dateMade: '',
    location: '',
    contact: '',
    email: '',
    description: ''
  });
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (photo) data.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:5000/api/DR/donate', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      alert('Donation submitted!');
      console.log(res.data);
      navigate('/Donor');
    } catch (err) {
      alert(err.response?.data?.error || 'Submission failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="foodItem" placeholder="Enter Food Item" value={formData.foodItem} onChange={handleChange} required />
      <input type="number"  name="quantity" value={formData.quantity} onChange={handleChange} required />
      <input type="date" name="dateMade" value={formData.dateMade} onChange={handleChange} required />
      <input name="location"  placeholder="Enter Address" value={formData.location} onChange={handleChange} required />
      <input name="contact" placeholder="Enter Contact Number" value={formData.contact} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Enter Email Id"  value={formData.email} onChange={handleChange} required />
      <textarea name="description" placeholder="Enter Description"  value={formData.description} onChange={handleChange} />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Donate Food'}
      </button>
    </form>
  );
};

export default DonorForm;