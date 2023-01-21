import nodemailer from "nodemailer";
import config from "../../config/config.js";

const { senderEmail, emailPassword } = config.email;
const { secretKeyResetPassword } = config.API;
const { baseUrl } = config.client;
import {join} from 'path';
//setting up the node mailer

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: emailPassword,
  },
});

export const sendResetPasswordEmail = async (value) => {
  var mailingOptions = {
    from: senderEmail,
    to: value.receiver,
    subject: "Reset Password link",
    attachments: [
      {
        filename: "password.png",
        path: "images\\password.png",
        cid: "password",
      },
      {
        filename: "logo_white.png",
        path: "images\\logo_white.png",
        cid: "lw",
      },
      {
        filename: "logo_black.png",
        path: "images\\logo_black.png",
        cid: "lb",
      }
    ],
    html: `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

a[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: inherit !important;
}

#MessageViewBody a {
  color: #000;
  text-decoration: none;
}

p {
  line-height: inherit;
  font-weight:bold;
}

.desktop_hide,
.desktop_hide table {
  mso-hide: all;
  display: none;
  max-height: 0px;
  overflow: hidden;
}

@media (max-width:685px) {

  .image_block img.big,
  .row-content {
    width: 100% !important;
  }

  .mobile_hide {
    display: none;
  }

  .stack .column {
    width: 100%;
    display: block;
  }

  .mobile_hide {
    min-height: 0;
    max-height: 0;
    max-width: 0;
    overflow: hidden;
    font-size: 0px;
  }
  a[href]{
    color:#fff; 
  }

  .desktop_hide,
  .desktop_hide table {
    display: table !important;
    max-height: none !important;
  }
}
</style>
</head>
<body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 665px;" width="665">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><a href="#" style="outline:none" tabindex="-1" target="_blank"><img alt="company logo" class="big" src="cid:lb" style="display: block; height: auto; border: 0; width: 499px; max-width: 100%;" title="company logo" width="499"/></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 665px;" width="665">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><a  style="outline:none" tabindex="-1" target="_blank"><img alt="reset password" class="big" src="cid:password" style="display: block; height: auto; border: 0; width: 665px; max-width: 100%;" title="reset password" width="665"/></a></div>

</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:50px;">
<div style="font-family: 'Times New Roman', Georgia, serif">
<div class="" style="font-size: 14px; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; mso-line-height-alt: 16.8px; color: #000; line-height: 1.2;">
<p style="margin: 0; font-size: 18px; mso-line-height-alt: 22px;"><strong><span style="font-size:22px;">Hey ${value.username}, </span></strong></p>
<p style="margin: 0; font-size: 18px; mso-line-height-alt: 22px;"><strong><span style="font-size:22px;">Click on the link below to reset your password.</span></strong></p>
<p style="margin: 0;  font-size: 14px; mso-line-height-alt: 16.8px;">  </p>

<p style="margin: 0;  font-size: 14px; mso-line-height-alt: 16.8px;">${baseUrl}/auth/reset-password/${value.id}?token=${value.token} </p>

</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1f1f20; color: #000000; width: 665px;" width="665">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:50px;padding-left:25px;padding-right:25px;padding-top:50px;width:100%;">
<div align="left" class="alignment" style="line-height:10px"><a  style="outline:none" tabindex="-1" target="_blank"><img alt="company logo" src="cid:lw" style="display: block; height: auto; border: 0; width: 172px; max-width: 100%;" title="company logo" width="172"/></a></div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;text-align:center;width:100%;padding-top:25px;">
<h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>About Us</strong></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="divider_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="left" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="font-family: 'Times New Roman', Georgia, serif">
<div class="" style="font-size: 12px; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; mso-line-height-alt: 18px; color: #ffffff; line-height: 1.5;">
<p style="margin: 0; font-size: 14px; mso-line-height-alt: 19.5px;"><span style="font-size:13px;">
Mealtrain is a common platform for students and providers for placing and end to end order
<br/></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;text-align:center;width:100%;padding-top:25px;">
<h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Contact</strong></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="divider_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="left" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #BBBBBB;"><span> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:35px;padding-left:20px;padding-right:15px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #ffffff; line-height: 1.5;">
<p style="margin: 0;color:#fff; font-size: 14px; mso-line-height-alt: 22.5px;"><span style="font-size:15px;"><span style="font-size:13px;">helpdesk.mealtrain@gmail.com</span><br/></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>
        `,
  };

  transporter.sendMail(mailingOptions, (error, info) => {
    console.log("Sending mail")
    if (error) {
      console.log("error", error);
      return error.message;
    } else {
      console.log("email sent");
    }
  });
};
export const sendPasswordResetConfirmationEmail = async (value) => {
  var mailingOptions = {
    from: senderEmail,
    to: value.receiver,
    subject: "Password changed successfully!",
    attachments: [
      {
        filename: "reset.gif",
        path: "images\\reset.gif",
        cid: "password",
      },
      {
        filename: "logo_white.png",
        path: "images\\logo_white.png",
        cid: "lw",
      },
      {
        filename: "logo_black.png",
        path: "images\\logo_black.png",
        cid: "lb",
      }
    ],
    html: `
          
          <!DOCTYPE html>

          <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
          <head>
          <title></title>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
          <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
          <style>
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
          
          #MessageViewBody a {
            color: #000;
            text-decoration: none;
          }
          
          p {
            line-height: 12px;
            font-weight:bold;
          }
          
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
          
          @media (max-width:685px) {
          
            .image_block img.big,
            .row-content {
              width: 100% !important;
            }
          
            .mobile_hide {
              display: none;
            }
          
            .stack .column {
              width: 100%;
              display: block;
            }
          
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
            a[href]{
              color:#fff; 
            }
          
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
          </style>
          </head>
          <body style="background-color: #fff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;" width="100%">
          <tbody>
          <tr>
          <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tbody>
          <tr>
          <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 665px;" width="665">
          <tbody>
          <tr>
          <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
          <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
          <div align="center" class="alignment" style="line-height:10px"><a href="#" style="outline:none" tabindex="-1" target="_blank"><img alt="company logo" class="big" src="cid:lb" style="display: block; height: auto; border: 0; width: 499px; max-width: 100%;" title="company logo" width="499"/></a></div>
          </td>
          </tr>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tbody>
          <tr>
          <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 665px;" width="665">
          <tbody>
          <tr>
          <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
          <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
          <div align="center" class="alignment" style="line-height:10px"><a  style="outline:none" tabindex="-1" target="_blank"><img alt="reset password" class="big" src="cid:password" style="display: block; height: auto; border: 0; width: 665px; max-width: 100%;" title="reset password" width="665"/></a></div>
          
          </td>
          </tr>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
          <tr>
          <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:50px;">
          <div style="font-family: 'Times New Roman', Georgia, serif">
          <div class="" style="font-size: 14px; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; mso-line-height-alt: 16.8px; color: #000; line-height: 1.2;">
        <p style="margin: 0;  font-size: 18px; mso-line-height-alt: 22px;"><strong><span style="font-size:20px;">Hey, ${value.username} </span></strong></p>
          <p style="margin: 0;  font-size: 18px; mso-line-height-alt: 22px;"><strong><span style="font-size:20px;">Congratulations!! Your password is reset. </span></strong></p>
          <p style="margin: 0; font-size: 18px; mso-line-height-alt: 22px;"><strong><span style="font-size:20px;">Login again to resume you work.</span></strong></p>
          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px;">  </p>
          
          <p style="margin: 0;  font-size: 14px; mso-line-height-alt: 16.8px;">${baseUrl}/auth/login</p> 
          </div>
          </div>
          </td>
          </tr>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tbody>
          <tr>
          <td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1f1f20; color: #000000; width: 665px;" width="665">
          <tbody>
          <tr>
          <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
          <table border="0" cellpadding="0" cellspacing="0" class="image_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad" style="padding-bottom:50px;padding-left:25px;padding-right:25px;padding-top:50px;width:100%;">
          <div align="left" class="alignment" style="line-height:10px"><a  style="outline:none" tabindex="-1" target="_blank"><img alt="company logo" src="cid:lw" style="display: block; height: auto; border: 0; width: 172px; max-width: 100%;" title="company logo" width="172"/></a></div>
          </td>
          </tr>
          </table>
          </td>
          <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
          <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad" style="padding-left:20px;text-align:center;width:100%;padding-top:25px;">
          <h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>About Us</strong></h3>
          </td>
          </tr>
          </table>
          <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad">
          <div align="left" class="alignment">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
          <tr>
          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #BBBBBB;"><span> </span></td>
          </tr>
          </table>
          </div>
          </td>
          </tr>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
          <tr>
          <td class="pad" style="padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:10px;">
          <div style="font-family: 'Times New Roman', Georgia, serif">
          <div class="" style="font-size: 12px; font-family: TimesNewRoman, 'Times New Roman', Times, Beskerville, Georgia, serif; mso-line-height-alt: 18px; color: #ffffff; line-height: 1.5;">
          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 19.5px;"><span style="font-size:13px;">
          Mealtrain is a common platform for students and providers for placing and end to end order
          <br/></span></p>
          </div>
          </div>
          </td>
          </tr>
          </table>
          </td>
          <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
          <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad" style="padding-left:20px;text-align:center;width:100%;padding-top:25px;">
          <h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Contact</strong></h3>
          </td>
          </tr>
          </table>
          <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
          <tr>
          <td class="pad">
          <div align="left" class="alignment">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
          <tr>
          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #BBBBBB;"><span> </span></td>
          </tr>
          </table>
          </div>
          </td>
          </tr>
          </table>
          <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
          <tr>
          <td class="pad" style="padding-bottom:35px;padding-left:20px;padding-right:15px;padding-top:10px;">
          <div style="font-family: sans-serif">
          <div class="" style="font-size: 12px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 18px; color: #ffffff; line-height: 1.5;">
          <p style="margin: 0;color:#fff; font-size: 14px; mso-line-height-alt: 22.5px;"><span style="font-size:15px;"><span style="font-size:13px;">helpdesk.mealtrain@gmail.com</span><br/></span></p>
          </div>
          </div>
          </td>
          </tr>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table><!-- End -->
          </body>
          </html>
          `,
  };

  transporter.sendMail(mailingOptions, (error, info) => {
    if (error) {
      console.log("error", error);
      return error.message;
    } else {
      console.log("email sent");
    }
  });
};
