import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Management from './pages/management';
import AboutUs from './pages/AboutUs';
import NgoAboutUs from './pages/NgoAboutUs';
import ManagemetAboutUs from './pages/ManagemetAboutUs';
import Welcome from './pages/Welcome';
import LogOut from './pages/LogOut';
import LoginPage from './pages/LoginPage';
import Donor from './pages/DonorPage';
import ContactUs from './pages/ContactUs';
import NgoContactUs from './pages/NgoContactUs';
import Signup from './pages/SignUp';
import NGODashboard from './pages/NGODashboard';
import DonorForm from './pages/Donor';
import Track from './pages/Track';
import MTrack from './pages/ManagementTrack';
import NgoTrack from './pages/NgoTrack';
import Recommendations from './pages/DonationDisplay'; // Assuming the correct path

<Route path="/recommendations" element={<Recommendations />} />

export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/AboutUs" element={<AboutUs />}/>
                <Route path="/ngoAboutUs" element={<NgoAboutUs />}/>
                <Route path="/ManagementAboutUs" element={<ManagemetAboutUs />}/>
                <Route path="/Track" element={<Track />}/>
                <Route path="/MTrack" element={<MTrack />}/>
                <Route path="/NgoTrack" element={<NgoTrack />}/>
                <Route path="/LogOut" element={<LogOut />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/Donor" element={<Donor />}/>
                <Route path="/ContactUs" element={<ContactUs />}/>
                <Route path="/NgoContactUs" element={<NgoContactUs />}/>
                <Route path="/" element={<Welcome />} />
                <Route path="/donor-dashboard" element={<Donor />} />
                <Route path="/management-dashboard" element={<Management />} />
                <Route path="/ngo-dashboard" element={<NGODashboard />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/donate-form" element={<DonorForm />} />
            </Routes>
        </Router>
    )
}