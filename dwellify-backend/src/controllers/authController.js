import { client, twilioPhone } from "../config/twilioClient.js";
import { otpStore, generateOTP } from "../utils/otpStore.js";
import { db, admin } from '../config/firebaseAdmin.js'; // ✅ match exactly


export const sendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();

  otpStore[phone] = { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: twilioPhone,
      to: phone,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "OTP sent successfully",
        sid: message.sid,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      });
  }
};

export const verifyCode = async (req, res) => {
  const { phone, code } = req.body;
  const record = otpStore[phone];

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[phone];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.code == code) {
    delete otpStore[phone];

    try {
      // Save phone number to Firestore before email auth
      await db.collection("verifiedPhones").doc(phone).set({
        phone,
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res
        .status(200)
        .json({ success: true, message: "OTP verified and phone saved" });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Phone verified but failed to save",
          error: error.message,
        });
    }
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
};
