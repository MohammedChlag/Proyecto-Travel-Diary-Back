import brevo from "@getbrevo/brevo";

import { SMTP_API_KEY, SMTP_USER } from "../config/env.js";
import generateErrorUtils from "./helpers.js";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY);
export const sendEmailBrevoUtil = async (to, subject, text) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.to = [{ email: to }];

    sendSmtpEmail.htmlContent = text;
    sendSmtpEmail.sender = {
      name: "Equipo de Travel Diary Api",
      email: SMTP_USER,
    };
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    throw generateErrorUtils(
      500,
      "SEND_EMAIL_ERROR",
      "Error al enviar el email"
    );
  }
};
