import React, { useState } from 'react';
import DonorForm from './Donor';
import Navbar from '../components/WelcomeNavBar';
import { useNavigate } from 'react-router-dom';
import './DonorPage.css';
import foodImage from './fooddonation.jpg'; // if it's in the same folder

const Welcome = () => {
  const navigate = useNavigate();
  const [showMoneyForm, setShowMoneyForm] = useState(false);
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [donationType, setDonationType] = useState('once');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: ''
  });

  const handleDonateClick = () => {
    navigate('/login');
  };

  const handleAmountSelection = (amount) => {
    if (amount === 'custom') {
      const customAmount = prompt("Enter the donation amount:");
      if (customAmount && !isNaN(customAmount)) {
        setSelectedAmount(customAmount);
        setShowMoneyForm(true);
      }
    } else if (amount) {
      setSelectedAmount(amount);
      setShowMoneyForm(true);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your donation of ${selectedAmount}!`);
    setShowMoneyForm(false);
    setSelectedAmount('');
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="fixed-navbar">
        <Navbar/>
      </div>
      
      <div className="food-donation-container">
        {/* Left Section - Information */}
        <div className="info-section">
          <h2 className="section-title">Help Fight Hunger</h2>
          <p className="section-text">
            Millions of people go to bed hungry every day. Your donation can provide food and hope to those in need. 
            Join us in making a difference.
          </p>
          <p className="section-text">
            Your contributions help provide nutritious meals to families, individuals, and communities facing food insecurity. 
            Whether it's canned goods, fresh produce, or non-perishable items, every donation counts!
          </p>
          <p className="section-text">
            By supporting us, you're not just giving food, you're giving hope. Together, we can create a hunger-free community.
          </p>
          
          <img src={foodImage} alt="Food Donation" className="food-image" />

          <p className="section-text font-medium">We accept a variety of food items, including:</p>
          <ul className="food-list">
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Leftover/Extra Food (rice, dal, chapati, etc.)</span>
            </li>
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Canned goods (vegetables, fruits, soups, beans, meats, etc.)</span>
            </li>
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Dry goods (rice, pasta, lentils, oats, flour, etc.)</span>
            </li>
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Packaged snacks (protein bars, nuts, crackers, etc.)</span>
            </li>
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Beverages (juice, milk powder, tea, coffee, etc.)</span>
            </li>
            <li className="food-item">
              <span className="food-icon">✅</span>
              <span>Baby food & formula</span>
            </li>
          </ul>
          
          <div className="info-box">
            <h2 className="info-box-title">Benefits of Donating Food</h2>
            <ul>
              <li className="benefit-item">
               
                <span>✅Help Those in Need</span>
              </li>
              <li className="benefit-item">
               
                <span>✅Reduce Food Waste</span>
              </li>
              <li className="benefit-item">
                
                <span>✅Strengthen Communities</span>
              </li>
              <li className="benefit-item">
                
                <span>✅Spread Happiness</span>
              </li>
              <li className="benefit-item">
                
                <span>✅Gain good karma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Donation Options */}
        <div className="donation-section">
          {showFoodForm ? (
            <DonorForm 
              onSuccess={() => setShowFoodForm(false)}
              onCancel={() => setShowFoodForm(false)}
            />
          ) : showMoneyForm ? (
            <form className="donation-form" onSubmit={handlePaymentSubmit}>
              <h2 className="section-title">Complete Your Donation</h2>
              <button 
                type="button" 
                className="back-button"
                onClick={() => setShowMoneyForm(false)}
              >
                ← Back
              </button>
              
              <div>
                <label className="form-label">Name:</label>
                <input 
                  type="text" 
                  name="name"
                  value={paymentInfo.name}
                  onChange={handlePaymentChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Email Address:</label>
                <input 
                  type="email" 
                  name="email"
                  value={paymentInfo.email}
                  onChange={handlePaymentChange}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Selected Amount:</label>
                <input 
                  type="text" 
                  value={selectedAmount} 
                  readOnly
                  className="form-input readonly-input"
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
              >
                Proceed to Payment
              </button>
            </form>
          ) : (
            <>
              <h2 className="section-title">Donate Money</h2>
              
              <div className="donation-toggle">
                <button 
                  className={`toggle-button ${donationType === 'once' ? 'toggle-active' : 'toggle-inactive'}`}
                  onClick={() => setDonationType('once')}
                >
                  Give Once
                </button>
                <button 
                  className={`toggle-button ${donationType === 'monthly' ? 'toggle-active' : 'toggle-inactive'}`}
                  onClick={() => setDonationType('monthly')}
                >
                  Give Monthly
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Select {donationType === 'once' ? 'Amount' : 'Monthly Amount'}:</label>
                <select 
                  onChange={(e) => handleAmountSelection(e.target.value)}
                  value={selectedAmount}
                  className="form-input"
                >
                  <option value="" disabled>-- Select an amount --</option>
                  {donationType === 'once' ? (
                    <>
                      <option value="₹100">₹100</option>
                      <option value="₹200">₹200</option>
                      <option value="₹500">₹500</option>
                      <option value="₹1000">₹1000</option>
                    </>
                  ) : (
                    <>
                      <option value="₹50/month">₹50/month</option>
                      <option value="₹100/month">₹100/month</option>
                      <option value="₹500/month">₹500/month</option>
                      <option value="₹1000/month">₹1000/month</option>
                    </>
                  )}
                  <option value="custom">Specify Other Amount</option>
                </select>
              </div>

              <h2 className="section-title">Donate Food</h2>
              <button 
                className="food-donate-button"
                onClick={handleDonateClick}
              >
                Donate Food Items
              </button>

              
              < h1 className="OR">OR</h1>

              <button 
                className="food-donate-button"
                onClick={handleDonateClick}
              >
                Register As NGO
                  </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Welcome;