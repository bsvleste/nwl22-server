import { MailAdapter, SendMailData } from "../mail-adatpter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1100ff42745c33",
    pass: "f6ee5f20f9fc3e"
  }
});
export class NodemailerMailAdapater implements MailAdapter{
 async sendMail ({subject,body}: SendMailData){
   await transport.sendMail({
    from:'Equipe Feedback <oi@feedback.com>',
    to:'Diego Fernandes <brunoccsp@gmail.com>',
    subject,
    html:body
  })
   
 }
}