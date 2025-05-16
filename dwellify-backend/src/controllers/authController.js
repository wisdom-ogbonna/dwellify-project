import { sendSMS } from '../services/termiiService.js';
import { isValidPhoneNumber } from '../utils/validation.js';

const codes = {}; // In-memory store for demo; use DB/Redis for real use

export const sendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  if (!isValidPhoneNumber(phone)) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    console.log('📱 Phone received:', phone);
    const termiiResponse = await sendSMS(phone, code);

    console.log('📨 Termii response:', JSON.stringify(termiiResponse, null, 2));
    

    // Optionally check if Termii actually accepted the message
    if (termiiResponse.code !== 'ok') {
      return res.status(400).json({
        message: 'Failed to send SMS',
        termiiResponse
      });
    }

    codes[phone] = code;
    res.json({ message: 'Verification code sent', termiiResponse });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send SMS', error: error.message });
  }
};


export const verifyCode = (req, res) => {
  const { phone, code } = req.body;

  if (codes[phone] && codes[phone] === code) {
    delete codes[phone]; // One-time use
    return res.json({ message: 'Phone number verified successfully' });
  }

  return res.status(400).json({ message: 'Invalid or expired code' });
};
