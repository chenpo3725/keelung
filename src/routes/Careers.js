import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const Careers = () => {
    const [authData, setAuthData] = useState(null);

     const gContainer = {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       marginTop: '50px'
     };
  // 登录成功回调
  const handleSuccess = async (response) => {
    console.log('登录成功，响应数据：', response);
    const { credential } = response; // credential即为访问令牌（Access Token）
/*     const payload = jwtDecode(credential); // credential 是 GoogleLogin 回傳的 JWT
    const { email, email_verified, aud, name, picture, sub } = payload;
    // 建議：檢查 aud 是否等於你的 Client ID
    if (aud !== process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    console.warn('aud mismatch');
    } */
    // 1. 存储令牌（建议使用localStorage或专用状态管理库）
    localStorage.setItem('accessToken', credential);
    const payload = {
        action: 'add',
        idToken:credential,
        name: 'name',   // 你要寫的資料（若有實際輸入欄位可改為對應 state）
        email: 'email', // 建議讓後端用 tokenInfo.email 為準
    };
    // 2. 携带令牌请求资源服务器API（示例：获取Google用户信息）
    try {
        const { data } = await axios.post(
        'https://script.google.com/macros/s/AKfycbx8CGXMrEKLaJ9-tSKm1a_Gb5Np757XWPNCh2ikmqVODIEsM7WKJRjIC4GWMkAzmc0k/exec',
        JSON.stringify(payload),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } } // 關鍵：避免預檢
        );
      setAuthData(data);
      console.log('用户信息：', data);
      // 可将用户信息存入全局状态（如Redux、Context）
    } catch (error) {
      console.error('获取用户信息失败：', error);
    }
  };

  // 登录失败回调
  const handleError = (error) => {
    console.error('登录失败：', error);
    alert('登录失败，请稍后重试');
  };

return (
       <GoogleOAuthProvider clientId={clientId}>
         <div style={gContainer}>

  <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      // 可选配置
      type="standard" // 按钮类型：standard（默认）、icon
      size="large" // 按钮大小：small、medium、large
      text="signin_with" // 按钮文本：signin_with（默认）、signup_with、continue_with
      shape="rectangular" // 按钮形状：rectangular（默认）、pill、circle、square
      theme="filled_black" // 按钮主题：filled_black（默认）、filled_blue、outline、standard
    />
           {authData && (
             <div>
               <p>Credential: {authData.name}</p>
               <p>Select By: {authData.email}</p>             </div>
           )} 
 {/*           <GoogleLogin
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
           )} */}
         </div>
       </GoogleOAuthProvider>
     );
   }

export default Careers;