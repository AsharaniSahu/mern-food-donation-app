const Volunteer = require('../schema/volunteer');

exports.signupVolunteer = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const volunteer = new Volunteer({ name, email });
    await volunteer.save();

    res.status(201).json({
        message: "Volunteer registered successfully!",
        volunteer: {
          name: volunteer.name,
          email: volunteer.email,
          joinDate: volunteer.joinedAt
        }
      });
  } catch (error) {
    console.error('Volunteer signup error:', error);
    res.status(500).json({ error: "Server error" });
  }
};