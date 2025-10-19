import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from 'jwt-decode';

const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
const Careers = () => {
    const [authData, setAuthData] = useState(null);

     const gContainer = {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       marginTop: '50px'
     };

return (
       <GoogleOAuthProvider clientId={clientId}>
         <div style={gContainer}>
           <GoogleLogin
             onSuccess={(credentialResponse) => {
               setAuthData(credentialResponse);
               console.log("Success!", credentialResponse);
             }}
             onError={() => {
               console.log("Login Failed");
             }}
           />
           {authData && (
             <div>
               <p>Credential: {authData.credential}</p>
               <p>Select By: {authData.select_by}</p>
             </div>
           )}
         </div>
       </GoogleOAuthProvider>
     );
   }

export default Careers;