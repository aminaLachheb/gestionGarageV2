"use strict";
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const nodemailer_1 = require("nodemailer");
const models_1 = require("../models");
let EmailService = EmailService_1 = class EmailService {
    /**
     * If using gmail see https://nodemailer.com/usage/using-gmail/
     */
    static async setupTransporter() {
        return nodemailer_1.createTransport({
            host: process.env.SMTP_SERVER,
            port: +process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendResetPasswordMail(user) {
        const transporter = await EmailService_1.setupTransporter();
        const emailTemplate = new models_1.EmailTemplate({
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
};
EmailService = EmailService_1 = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT })
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map