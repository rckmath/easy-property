import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePropertyTransfer from './pages/PropertyTransfer/CreatePropertyTransfer'
import PropertyTransferListing from './pages/PropertyTransfer/PropertyTransferListing'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreatePropertyTransfer />} />
        <Route path="/property-transfers" element={<PropertyTransferListing />} />
      </Routes>
    </Router>
  )
}

export default App
