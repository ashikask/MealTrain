// const userDetails = {
//     firstName: "Varun",
//     lastName: "Jayakumar",
//     email: "jkvarun7@gmail.com",
//     orderDetails: req.body,
//   };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mealtrian.service@gmail.com",
    pass: "qgewbngfmmsjadff",
  },
});

export async function sendOrderCompleteEmail(emailConfig) {
  const mailOptions = {
    from: "mealtrian.service@gmail.com",
    to: emailConfig.email,
    subject: `MealTrain Order Delivered! ${emailConfig.orderDetails._id}`,
    html: `<div class="m_-1463195408468569412main" style="margin:0;padding:0">

    <table class="m_-1463195408468569412wrapper" style="border-collapse:collapse;table-layout:fixed;min-width:320px;width:100%;background-color:#f5f6f8" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
      <div role="banner">
        <div class="m_-1463195408468569412preheader" style="Margin:0 auto;max-width:560px;min-width:280px;width:280px;width:calc(28000% - 167440px)">
          <div style="border-collapse:collapse;display:table;width:100%">
          
            <div class="m_-1463195408468569412snippet" style="display:table-cell;Float:left;font-size:12px;line-height:19px;max-width:280px;min-width:140px;width:140px;width:calc(14000% - 78120px);padding:10px 0 5px 0;color:#999;font-family:sans-serif">
              
            </div>
          
          
          </div>
        </div>
        <div class="m_-1463195408468569412header" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px)" id="m_-1463195408468569412emb-email-header-container">
        
          <div class="m_-1463195408468569412logo" style="font-size:26px;line-height:32px;Margin-top:24px;Margin-bottom:40px;color:#41637e;font-family:sans-serif;Margin-left:20px;Margin-right:20px" align="center">
            <div align="left" id="m_-1463195408468569412emb-email-header"><img style="display:block;height:auto;width:100%;border:0;max-width:278px" src="https://ci5.googleusercontent.com/proxy/-07roZr0shCKGO-oOUOmCb6VX5oz4UHrFs6Y9ubIAUfyfhfSlxjll0oSilyfA8Tpno-J6m-_I5DHzY0Q159aOdvTWhT9rhawsEbvq104Wow=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131722/csfinal/Logo.png" alt="" width="278" class="CToWUd" data-bit="iit"></div>
          </div>
        
        </div>
      </div>
      <div>
      <div class="m_-1463195408468569412layout m_-1463195408468569412one-col m_-1463195408468569412fixed-width m_-1463195408468569412stack" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
        <div class="m_-1463195408468569412layout__inner" style="border-collapse:collapse;display:table;width:100%;background-color:#ffffff">
        
          <div class="m_-1463195408468569412column" style="text-align:left;color:#717a8a;font-size:16px;line-height:24px;font-family:sans-serif">
        
        <div style="font-size:12px;font-style:normal;font-weight:normal;line-height:19px" align="center">
          <img style="border:0;display:block;height:auto;width:100%;max-width:900px" alt="" width="600" src="https://ci3.googleusercontent.com/proxy/i8xMuVRhdgtgHwH8j6dK4smygHp5ZQxoeWATMqcvYuEUKZpbzjQYU2fNz1ZLattKZIfbEqOUlEmeYcvD_VvEtQeft-a0-5e1cYJbNkJaZm23zW2tQiC91LOt8z4j2kKYtr0UVJJdQ_oLbKfqjsTHlQmvlfw8pYub4GRdREyT_h_Pmlbv1USf9FY=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131722/csfinal/traditional-food-around-the-world-Travlinmad-3a1504b9caf0fc5a.jpg" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 1829.56px; top: 281.942px;"><div id=":q2" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
        </div>
      
            <div style="Margin-left:20px;Margin-right:20px;Margin-top:20px">
      <div style="line-height:20px;font-size:1px">&nbsp;</div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="vertical-align:middle">
        <h1 style="Margin-top:0;Margin-bottom:20px;font-style:normal;font-weight:normal;color:#3d3b3d;font-size:30px;line-height:38px">Order Delivered!</h1>
      </div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="vertical-align:middle">
        <h3 style="Margin-top:0;Margin-bottom:12px;font-style:normal;font-weight:normal;color:#3d3b3d;font-size:17px;line-height:26px">Hello ${emailConfig.firstName} ,&nbsp;<br>
Your Order ID <b> ${emailConfig.orderDetails._id} </b> is now Delivered. Thank you for ordering through us. Have a yummy meal!</h3>
      </div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="line-height:16px;font-size:1px">&nbsp;</div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px;Margin-bottom:24px">
      <div style="line-height:8px;font-size:1px">&nbsp;</div>
    </div>
        
          </div>
        
        </div>
      </div>
  
      <div style="line-height:20px;font-size:20px">&nbsp;</div>
  
      </div>
      <div role="contentinfo"><div style="line-height:4px;font-size:4px" id="m_-1463195408468569412footer-top-spacing">&nbsp;</div><div class="m_-1463195408468569412layout m_-1463195408468569412email-flexible-footer m_-1463195408468569412email-footer" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word" id="m_-1463195408468569412footer-content">
      <div class="m_-1463195408468569412layout__inner m_-1463195408468569412left-aligned-footer" style="border-collapse:collapse;display:table;width:100%">
        
        
        
          <div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif">
      <div class="m_-1463195408468569412footer-logo" style="font-size:26px;line-height:32px;Margin-top:24px;Margin-bottom:40px;color:#7b663d;font-family:Roboto,Tahoma,sans-serif" align="center">
        <div style="margin-right:20px" align="center"><img style="border:0;display:block;height:auto;width:100%;max-width:180px" src="https://ci6.googleusercontent.com/proxy/SVDhwE1PBHW7xrEtGCHVQNSifFd-lUIGY3qVIh4gFohd-runw2gzJBOU2Wl2ADhWAG66T0VEqnf4EsT_Myj9xwaj4sQgOiaWxvXoYqB2RoEeQ1OrjAo=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131721/csfinal/LogoFooter.png" alt="" width="180" class="CToWUd" data-bit="iit"></div>
      </div>
    </div>
        
        
          <div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif;display:none">
      <div style="margin-left:0;margin-right:0;Margin-top:10px;Margin-bottom:10px">
        <div class="m_-1463195408468569412footer__share-button">
          
          
          
          
        </div>
      </div>
    </div>
        
        
          <table style="border-collapse:collapse;table-layout:fixed;display:inline-block;width:400px" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif;width:400px">
      <div style="margin-left:0;margin-right:0;Margin-top:10px;Margin-bottom:10px">
        <div class="m_-1463195408468569412email-footer__additional-info" style="font-size:12px;line-height:19px;margin-bottom:18px;margin-top:0px">
          <div><p class="m_-1463195408468569412email-flexible-footer__additionalinfo--center" style="Margin-top:0;Margin-bottom:0">MealTrain - Yummy meal guaranteed &nbsp;</p></div>
        </div>
        <div class="m_-1463195408468569412email-footer__additional-info" style="font-size:12px;line-height:19px;margin-bottom:18px;margin-top:0px">
          <div><p class="m_-1463195408468569412email-flexible-footer__additionalinfo--center" style="Margin-top:0;Margin-bottom:0">Northeastern University</p></div>
        </div>
        
        
      </div>
    </div></td></tr></tbody></table>
        
        
      </div>
    </div><div style="line-height:40px;font-size:40px" id="m_-1463195408468569412footer-bottom-spacing">&nbsp;</div></div>
      
    </td></tr></tbody></table>
  <img style="display:block!important;height:1px!important;width:1px!important;border:0!important;margin:0!important;padding:0!important" src="https://ci5.googleusercontent.com/proxy/gmjuJB9ygrUCd9JJG4ddaQ6L55mhI1KgVKzMZbeJR9B1RQU3rF82mR_UeRWo-XeRdlFFDq8YOi7_775HPzuem-HNJHF-h65lHn5jgWx3=s0-d-e1-ft#https://personalwebproject.cmail19.com/t/y-o-ndthha-l/o.gif" width="1" height="1" border="0" alt="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:W2ZhbHNlLDJd"><div class="yj6qo"></div><div class="adL">
</div></div> `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}

export async function sendOrderReadyEmail(emailConfig) {
  const mailOptions = {
    from: "mealtrian.service@gmail.com",
    to: `${emailConfig.email}`,
    subject: `MealTrain Order Prepared! ${emailConfig.orderDetails._id}`,
    html: `<div class="m_-1463195408468569412main" style="margin:0;padding:0">

    <table class="m_-1463195408468569412wrapper" style="border-collapse:collapse;table-layout:fixed;min-width:320px;width:100%;background-color:#f5f6f8" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
      <div role="banner">
        <div class="m_-1463195408468569412preheader" style="Margin:0 auto;max-width:560px;min-width:280px;width:280px;width:calc(28000% - 167440px)">
          <div style="border-collapse:collapse;display:table;width:100%">
          
            <div class="m_-1463195408468569412snippet" style="display:table-cell;Float:left;font-size:12px;line-height:19px;max-width:280px;min-width:140px;width:140px;width:calc(14000% - 78120px);padding:10px 0 5px 0;color:#999;font-family:sans-serif">
              
            </div>
          
          
          </div>
        </div>
        <div class="m_-1463195408468569412header" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px)" id="m_-1463195408468569412emb-email-header-container">
        
          <div class="m_-1463195408468569412logo" style="font-size:26px;line-height:32px;Margin-top:24px;Margin-bottom:40px;color:#41637e;font-family:sans-serif;Margin-left:20px;Margin-right:20px" align="center">
            <div align="left" id="m_-1463195408468569412emb-email-header"><img style="display:block;height:auto;width:100%;border:0;max-width:278px" src="https://ci5.googleusercontent.com/proxy/-07roZr0shCKGO-oOUOmCb6VX5oz4UHrFs6Y9ubIAUfyfhfSlxjll0oSilyfA8Tpno-J6m-_I5DHzY0Q159aOdvTWhT9rhawsEbvq104Wow=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131722/csfinal/Logo.png" alt="" width="278" class="CToWUd" data-bit="iit"></div>
          </div>
        
        </div>
      </div>
      <div>
      <div class="m_-1463195408468569412layout m_-1463195408468569412one-col m_-1463195408468569412fixed-width m_-1463195408468569412stack" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word">
        <div class="m_-1463195408468569412layout__inner" style="border-collapse:collapse;display:table;width:100%;background-color:#ffffff">
        
          <div class="m_-1463195408468569412column" style="text-align:left;color:#717a8a;font-size:16px;line-height:24px;font-family:sans-serif">
        
        <div style="font-size:12px;font-style:normal;font-weight:normal;line-height:19px" align="center">
          <img style="border:0;display:block;height:auto;width:100%;max-width:900px" alt="" width="600" src="https://ci3.googleusercontent.com/proxy/i8xMuVRhdgtgHwH8j6dK4smygHp5ZQxoeWATMqcvYuEUKZpbzjQYU2fNz1ZLattKZIfbEqOUlEmeYcvD_VvEtQeft-a0-5e1cYJbNkJaZm23zW2tQiC91LOt8z4j2kKYtr0UVJJdQ_oLbKfqjsTHlQmvlfw8pYub4GRdREyT_h_Pmlbv1USf9FY=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131722/csfinal/traditional-food-around-the-world-Travlinmad-3a1504b9caf0fc5a.jpg" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 1829.56px; top: 281.942px;"><div id=":q2" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
        </div>
      
            <div style="Margin-left:20px;Margin-right:20px;Margin-top:20px">
      <div style="line-height:20px;font-size:1px">&nbsp;</div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="vertical-align:middle">
        <h1 style="Margin-top:0;Margin-bottom:20px;font-style:normal;font-weight:normal;color:#3d3b3d;font-size:30px;line-height:38px">Your Order is Ready!</h1>
      </div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="vertical-align:middle">
        <h3 style="Margin-top:0;Margin-bottom:12px;font-style:normal;font-weight:normal;color:#3d3b3d;font-size:17px;line-height:26px">Hello ${emailConfig.firstName},&nbsp;<br>
Your Order ID <b> ${emailConfig.orderDetails._id} </b> is now ready and will reach you soon. See you soon with an yummy meal!</h3>
      </div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px">
      <div style="line-height:16px;font-size:1px">&nbsp;</div>
    </div>
        
            <div style="Margin-left:20px;Margin-right:20px;Margin-bottom:24px">
      <div style="line-height:8px;font-size:1px">&nbsp;</div>
    </div>
        
          </div>
        
        </div>
      </div>
  
      <div style="line-height:20px;font-size:20px">&nbsp;</div>
  
      </div>
      <div role="contentinfo"><div style="line-height:4px;font-size:4px" id="m_-1463195408468569412footer-top-spacing">&nbsp;</div><div class="m_-1463195408468569412layout m_-1463195408468569412email-flexible-footer m_-1463195408468569412email-footer" style="Margin:0 auto;max-width:600px;min-width:320px;width:320px;width:calc(28000% - 167400px);word-wrap:break-word;word-break:break-word" id="m_-1463195408468569412footer-content">
      <div class="m_-1463195408468569412layout__inner m_-1463195408468569412left-aligned-footer" style="border-collapse:collapse;display:table;width:100%">
        
        
        
          <div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif">
      <div class="m_-1463195408468569412footer-logo" style="font-size:26px;line-height:32px;Margin-top:24px;Margin-bottom:40px;color:#7b663d;font-family:Roboto,Tahoma,sans-serif" align="center">
        <div style="margin-right:20px" align="center"><img style="border:0;display:block;height:auto;width:100%;max-width:180px" src="https://ci6.googleusercontent.com/proxy/SVDhwE1PBHW7xrEtGCHVQNSifFd-lUIGY3qVIh4gFohd-runw2gzJBOU2Wl2ADhWAG66T0VEqnf4EsT_Myj9xwaj4sQgOiaWxvXoYqB2RoEeQ1OrjAo=s0-d-e1-ft#http://i1.cmail19.com/ei/y/D9/68F/8D0/131721/csfinal/LogoFooter.png" alt="" width="180" class="CToWUd" data-bit="iit"></div>
      </div>
    </div>
        
        
          <div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif;display:none">
      <div style="margin-left:0;margin-right:0;Margin-top:10px;Margin-bottom:10px">
        <div class="m_-1463195408468569412footer__share-button">
          
          
          
          
        </div>
      </div>
    </div>
        
        
          <table style="border-collapse:collapse;table-layout:fixed;display:inline-block;width:400px" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="m_-1463195408468569412column" style="text-align:left;font-size:12px;line-height:19px;color:#999;font-family:sans-serif;width:400px">
      <div style="margin-left:0;margin-right:0;Margin-top:10px;Margin-bottom:10px">
        <div class="m_-1463195408468569412email-footer__additional-info" style="font-size:12px;line-height:19px;margin-bottom:18px;margin-top:0px">
          <div><p class="m_-1463195408468569412email-flexible-footer__additionalinfo--center" style="Margin-top:0;Margin-bottom:0">MealTrain - Yummy meal guaranteed &nbsp;</p></div>
        </div>
        <div class="m_-1463195408468569412email-footer__additional-info" style="font-size:12px;line-height:19px;margin-bottom:18px;margin-top:0px">
          <div><p class="m_-1463195408468569412email-flexible-footer__additionalinfo--center" style="Margin-top:0;Margin-bottom:0">Northeastern University</p></div>
        </div>
       
      </div>
    </div></td></tr></tbody></table>
        
        
      </div>
    </div><div style="line-height:40px;font-size:40px" id="m_-1463195408468569412footer-bottom-spacing">&nbsp;</div></div>
      
    </td></tr></tbody></table>
  <img style="display:block!important;height:1px!important;width:1px!important;border:0!important;margin:0!important;padding:0!important" src="https://ci5.googleusercontent.com/proxy/gmjuJB9ygrUCd9JJG4ddaQ6L55mhI1KgVKzMZbeJR9B1RQU3rF82mR_UeRWo-XeRdlFFDq8YOi7_775HPzuem-HNJHF-h65lHn5jgWx3=s0-d-e1-ft#https://personalwebproject.cmail19.com/t/y-o-ndthha-l/o.gif" width="1" height="1" border="0" alt="" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:W2ZhbHNlLDJd"><div class="yj6qo"></div><div class="adL">
</div></div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
}
