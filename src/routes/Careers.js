import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

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

    // 1. 存储令牌（建议使用localStorage或专用状态管理库）
    localStorage.setItem('accessToken', credential);

    // 2. 携带令牌请求资源服务器API（示例：获取Google用户信息）
    try {
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${credential}` },
        }
      );
      console.log('用户信息：', userResponse.data);
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