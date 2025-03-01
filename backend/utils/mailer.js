const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    return transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to,
        subject,
        html,
    });
};

const accountCreated = (user) => {
    let html = "";
    html = `<p>Account created on TNRTP</p>
        <p>UserName: ${user.userName}</p>
        <p>Temporary password: ${user.password}</p>`;
    return sendMail(user.emailId, "Account created", html);
};

const forgetPassword = (user) => {
    let html = `<p>To reset your password use below link http://localhost:3000/reset-password?otp=${user.otp}&email=${user.emailId}</p>`;
    return sendMail(user.emailId, "Forget password", html);
};

module.exports = { accountCreated, forgetPassword }