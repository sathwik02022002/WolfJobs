// controllers/resume_controller.js
const Resume = require('../models/resume');
const User = require('../models/user');

const multer = require('multer');

const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error('Please upload a PDF file'));
    }
    cb(undefined, true);
  }
});

// Resume upload handler
exports.uploadResume = async (req, res) => {
  // find the user and add the resume
  let user = await User.findOne({ _id: req.body.id });

  try {
    const resume = new Resume({
      applicantId: user._id, // Assuming the user is authenticated
      fileName: req.file.originalname,
      fileData: req.file.buffer,
      contentType: 'application/pdf'
    });
    await resume.save();
    res.status(201).send({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Make sure to export the multer upload as well
exports.upload = upload;
