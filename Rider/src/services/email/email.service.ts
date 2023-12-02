import nodemailer, {Transporter} from "nodemailer";
import * as path from "path";
import * as ejs from "ejs";

const templatePath = path.join(__dirname, 'template', 'email.ejs');


interface MailBody {
    to: string;
    subject: string;
    name: string;
    token: string;
  }
  

export const sendToMail = async (mailBody :MailBody)=>{

    const transport : Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },       
    });

    const html = await ejs.renderFile(templatePath, { body : mailBody });

    const options = {
        from : process.env.USER,
        to : mailBody.to,
        subject : mailBody.subject,
        html : html,
    }
    await transport.sendMail(options);
    return;
}