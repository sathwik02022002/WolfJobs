const User = require("../models/user");
const AuthOtp = require("../models/authOtp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Profile View
module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
};

// Sign Up View
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "WolfJobs | Sign Up"
    });
};

// Sign In View
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "WolfJobs | Sign In"
    });
};

// Create New User
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log('Error in finding user during sign-up');
            return;
        }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('Error in creating user during sign-up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
};

// Generate OTP and Send Email on Login
async function sendOtpEmail(user) {
    const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    await AuthOtp.create({ userId: user._id, otp, expiresAt });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'autowolfjobs@gmail.com', pass: 'kpee cokw ccab wzpq' }
    });

    const mailOptions = {
        from: 'autowolfjobs@gmail.com',
        to: user.email,
        subject: 'Your OTP for Login',
        text: `Your OTP is ${otp}. It expires in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
}

// Create Session and Send OTP
module.exports.createSession = async function(req, res) {
    try {
        const user = req.user;
        await sendOtpEmail(user);
        return res.status(200).json({ message: 'OTP sent to email.', userId: user._id });
    } catch (error) {
        console.error('Error during OTP generation:', error);
        return res.status(500).json({ error: 'Failed to generate OTP.' });
    }
};

// OTP Verification
module.exports.verifyOtp = async function(req, res) {
    const { userId, otp } = req.body;
    try {
        const otpRecord = await AuthOtp.findOne({ userId, otp });
        if (!otpRecord || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        await AuthOtp.deleteOne({ _id: otpRecord._id });
        return res.json({ success: 'OTP verified, login successful' });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        return res.status(500).json({ error: 'OTP verification failed.' });
    }
};

// Destroy Session
module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/');
};
