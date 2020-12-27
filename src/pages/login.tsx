import { useRef } from "react";
import Link from "next/link";

interface loginProps {
   message: string,
}

const Login = () => {
   const emailRef = useRef<HTMLInputElement>();
   const passwordRef = useRef<HTMLInputElement>();

   //cookieの作成
   const handleLogin = async () => {
      const res = await fetch(`http://localhost:3000/api/signin`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
         })
      });
      const resp = (await res.json()) as loginProps;
      alert(resp.message);
   };

   return (
      <div>
         <input placeholder="email" ref={emailRef} type="text" />
         <input placeholder="password" ref={passwordRef} type="password" />
         <button onClick={handleLogin}>Login</button>
         <div>
            <Link href="/people">
               <a>People</a>
            </Link>
            <hr />
            <Link href="/vehicles">
               <a>vehicle</a>
            </Link>

         </div>
      </div>
   )
};

export default Login;