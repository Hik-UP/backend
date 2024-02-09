import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const mailBody = (token: string) => {
  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
      <style type="text/css">
        @media only screen and (min-width: 720px) {
    .u-row {
      width: 700px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
    .u-row .u-col-33p33 {
      width: 233.31px !important;
    }
    .u-row .u-col-33p34 {
      width: 233.38000000000002px !important;
    }
    .u-row .u-col-100 {
      width: 700px !important;
    }
  }
  @media (max-width: 720px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: 100% !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
    .no-stack .u-col {
      min-width: 0 !important;
      display: table-cell !important;
    }
    .no-stack .u-col-33p33 {
      width: 33.33% !important;
    }
    .no-stack .u-col-33p34 {
      width: 33.34% !important;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  p {
    margin: 0;
  }
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  * {
    line-height: inherit;
  }
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  @media (max-width: 480px) {
    .hide-mobile {
      max-height: 0px;
      overflow: hidden;
      display: none !important;
    }
  }
  table, td { color: #ffffff; } #u_body a { color: #0071e3; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_9 .v-src-width { width: auto !important; } #u_content_image_9 .v-src-max-width { max-width: 55% !important; } #u_content_heading_4 .v-font-size { font-size: 30px !important; } #u_content_heading_4 .v-color { color: #ffffff !important; } #u_content_heading_4 .v-text-align { text-align: center !important; } #u_content_heading_4 .v-line-height { line-height: 100% !important; } #u_content_text_25 .v-font-size { font-size: 14px !important; } #u_content_text_28 .v-font-size { font-size: 12px !important; } #u_content_text_29 .v-font-size { font-size: 12px !important; } #u_row_4.v-row-padding--vertical { padding-top: 5px !important; padding-bottom: 5px !important; } #u_content_heading_3 .v-container-padding-padding { padding: 10px 5px 5px !important; } #u_content_heading_3 .v-font-size { font-size: 12px !important; } #u_content_heading_3 .v-line-height { line-height: 120% !important; } #u_content_menu_1 .v-font-size { font-size: 10px !important; } #u_content_menu_1 .v-layout-display { display: inline !important; } #u_content_text_17 .v-font-size { font-size: 10px !important; } #u_content_text_17 .v-text-align { text-align: center !important; } }
      </style>
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  </head>
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #ffffff">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  <table id="u_content_image_9" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 0px 10px;font-family:helvetica,sans-serif;" align="left">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        <img align="center" border="0" src="https://assets.unlayer.com/stock-templates/1707467487984-logo.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 210px;" width="210" class="v-src-width v-src-max-width"/>
      </td>
    </tr>
  </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="u_content_heading_4" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
    <!--[if mso]><table width="100%"><tr><td><![endif]-->
      <h1 class="v-color v-text-align v-line-height v-font-size" style="margin: 0px; color: #ffffff; line-height: 100%; text-align: center; word-wrap: break-word; font-family: 'Cabin',sans-serif; font-size: 40px; font-weight: 700;"><span><span><span><span><span><span><span><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><span style="line-height: 50px;"><strong><span style="line-height: 50px;"><span style="line-height: 50px;">Hik'UP</span></span></strong></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h1>
    <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 30px;font-family:helvetica,sans-serif;" align="left">
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="u_content_text_25" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px 15px;font-family:helvetica,sans-serif;" align="left">
    <div class="v-color v-text-align v-line-height v-font-size" style="font-family: 'Cabin',sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;">Voici votre code de vérification</p>
    </div>
        </td>
      </tr>
    </tbody>
  </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    </div>
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row no-stack" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="233" style="width: 233px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 233.31px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="233" style="background-color: #1d1d1f;width: 233px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 233.31px;display: table-cell;vertical-align: top;">
    <div style="background-color: #1d1d1f;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  <table id="u_content_text_28" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
    <div class="v-color v-text-align v-line-height v-font-size" style="font-family: terminal,monaco; font-size: 14px; font-weight: 700; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;">${token}</p>
    </div>
        </td>
      </tr>
    </tbody>
  </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="233" style="width: 233px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-33p34" style="max-width: 320px;min-width: 233.38px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    </div>
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  <table id="u_content_text_29" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 0px 15px;font-family:helvetica,sans-serif;" align="left">
    <div class="v-color v-text-align v-line-height v-font-size" style="font-family: courier new,courier; font-size: 14px; font-weight: 700; color: #d2d2d7; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%;">Code à usage unique, strictement personnel</p>
    </div>
        </td>
      </tr>
    </tbody>
  </table>
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 30px;font-family:helvetica,sans-serif;" align="left">
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
        </td>
      </tr>
    </tbody>
  </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    </div>
  <div id="u_row_4" class="u-row-container v-row-padding--vertical" style="padding: 20px 5px 5px;background-color: #1d1d1f">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 20px 5px 5px;background-color: #1d1d1f;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  <table id="u_content_heading_3" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 5px 0px;font-family:helvetica,sans-serif;" align="left">
    <!--[if mso]><table width="100%"><tr><td><![endif]-->
      <h1 class="v-color v-text-align v-line-height v-font-size" style="margin: 0px; color: #d2d2d7; line-height: 120%; text-align: center; word-wrap: break-word; font-family: 'Cabin',sans-serif; font-size: 16px; font-weight: 400;"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span style="line-height: 24px;"><span style="line-height: 24px;"><span style="line-height: 24px;"><span style="line-height: 24px;"><span style="line-height: 24px;"><span style="line-height: 24px;">Connectez-vous à la nature.</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h1>
    <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    </div>
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px 10px 50px;background-color: #1d1d1f">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px 10px 50px;background-color: #1d1d1f;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  <table id="u_content_menu_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:helvetica,sans-serif;" align="left">
  <div class="menu" style="text-align:center">
  <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <a href="https://eip.epitech.eu/2024/hikup/" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Cabin',sans-serif;font-size:12px;text-decoration:none"  class="v-font-size v-layout-display">
        Site Internet
      </a>
    <!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#424245;font-family:'Cabin',sans-serif;font-size:12px;" class="v-font-size hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <a href="https://github.com/Hik-UP" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Cabin',sans-serif;font-size:12px;text-decoration:none"  class="v-font-size v-layout-display">
        GitHub
      </a>
    <!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#424245;font-family:'Cabin',sans-serif;font-size:12px;" class="v-font-size hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <a href="https://play.google.com/apps/internaltest/4699738584864309580" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Cabin',sans-serif;font-size:12px;text-decoration:none"  class="v-font-size v-layout-display">
        Play Store
      </a>
    <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]></tr></table><![endif]-->
  </div>
        </td>
      </tr>
    </tbody>
  </table>
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #424245;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table id="u_content_text_17" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
    <div class="v-color v-text-align v-line-height v-font-size" style="font-size: 12px; color: #86868b; line-height: 200%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 200%;">©2024 Hik'UP Tous droits réservés</p>
    </div>
        </td>
      </tr>
    </tbody>
  </table>
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    </div>
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  </html>`;
};

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Failed to create access token\n' + err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ADDRESS,
      accessToken,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN
    }
  } as nodemailer.TransportOptions);

  return transporter;
};

const sendEmail = async (emailOptions: Mail.Options) => {
  const emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

export { mailBody, sendEmail };
