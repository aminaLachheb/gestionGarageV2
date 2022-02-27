import {User} from '@loopback/authentication-jwt';
import {bind, BindingScope} from '@loopback/core';
import {createTransport} from 'nodemailer';
import {EmailTemplate} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  /**
   * If using gmail see https://nodemailer.com/usage/using-gmail/
   */
  private static async setupTransporter() {
    return createTransport({
      host: process.env.SMTP_SERVER,
      port: +process.env.SMTP_PORT!,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendResetPasswordMail(user: User): Promise<any> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      to: user.email,
      subject: 'Demande de réinitialisation de mot de passe',
      html: `
      <div>
          <p>Bonjour,</p>
          <p style="color: red;">Nous avons reçu une demande de réinitialisation du mot de passe de votre compte</p>
          <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous</p>
          <a href="http://localhost:4200/changePwd">Lien de réinitialisation de votre mot de passe</a>
          <p>Si vous n'avez pas demandé de réinitialiser votre mot de passe, veuillez ignorer cet e-mail ou réinitialiser votre mot de passe pour protéger votre compte.</p>
          <p>Merci</p>
          <p>SRA-Sign</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }
}
