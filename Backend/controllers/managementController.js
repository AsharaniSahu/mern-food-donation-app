const Management = require("../schema/management");
const Donation = require('../schema/donor'); // make sure the path is correct
const NGOModel = require('../schema/user'); // make sure the path is correct

 
  
  
  const getPendingRequests = async (req, res) => {
    try {
      const pending = await Donation.find({ status: 'pending' });
      res.status(200).json(pending);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching pending requests', error: err });
    }
  };
  
  // Update status
const updateDonationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updated = await Donation.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error updating status', error: err });
    }
  };

  // Update status of a donation (accept/reject)
const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updated = await Donation.findByIdAndUpdate(id, { status }, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update request status' });
    }
  };

  // Accept donation
const acceptRequest = async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await Donation.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error accepting request', error });
    }
  };

  // Reject donation
const rejectRequest = async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await Donation.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error rejecting request', error });
    }
  };

  
  const verifiedNgo = async (req, res) => {
    const ngos = await NGOModel.find({ status: "verified" });
    res.json(ngos);
  };

  // Get accepted donations only (for NGO page)
exports.getAcceptedRequests = async (req, res) => {
    try {
      const accepted = await Donation.find({ status: 'Accepted' });
      res.json(accepted);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch accepted requests' });
    }
  };
  
  module.exports = {
    getPendingRequests,
    updateRequestStatus,
    updateDonationStatus,
    acceptRequest,
    rejectRequest,
    verifiedNgo
  };

