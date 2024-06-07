import { sendSMS } from "../services/sms-service.js";

import { setErrorResponse, setResponse } from "./response-handler.js";

export const sendsms = async (request, response) => {
  try {
    const sendsms = await sendSMS({
      from: "+14706136756",
      to: request.body.to,
      body: request.body.message,
    });
    setResponse(sendsms, response);
  } catch (error) {
    setErrorResponse(500, error, response);
  }
};