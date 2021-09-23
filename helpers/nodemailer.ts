import nodemailer from "nodemailer";
import {google} from "googleapis";
// async..await is not allowed in global scope, must use a wrapper
//import Url from "url"


const refreshaccesT ="1//04oxhJiLDsWMaCgYIARAAGAQSNwF-L9IrhdobgPu37_JRD25pe4RYz_qKPLx-JURDGxP27HENUkFE3_J6gDUV_OLTHkGSJcaF0z4"

const outh2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.SECRET_CLIENT,
  "https://developers.google.com/oauthplayground",
 // expiry_date: true
  );
  //outh2Client.setCredentials({refresh_token:refreshaccesT})
export const sendEmail  = async (correos:string[])=> {
 // 
try{
  const accesToken = await outh2Client.getAccessToken((err,tokens)=>{
      if(err) return err;
      outh2Client.setCredentials({refresh_token:tokens})
  });
  const transporter = nodemailer.createTransport({
     service: 'gmail',
      auth:{
          type:"OAuth2",
          user:"angeluisdelcollado@gmail.com",
          clientId:  process.env.CLIENT_ID,
          clientSecret: process.env.SECRET_CLIENT,
          refreshToken: refreshaccesT,
          accessToken: accesToken  
          
      },
    
   
});
let info = await transporter.sendMail({
  from: '"Filial San Cristobal 👻" <angeluisdelcollado@gmail.com>', // sender address
 to: correos, // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Acabamos de publicar un nuevo evento", // plain text body
  html: "<b>Hello </b>", // html body });

 
 
})
console.log("Message sent: ", info.messageId);
}catch(err){
  console.log(err);
  return err;
}


  // send mail with defined transport object
  

//sendEmail().catch(console.error);

}