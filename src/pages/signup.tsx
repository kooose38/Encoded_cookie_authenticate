import { useRef, useState } from "react";

const Signup = () => {
   const nameRef = useRef<HTMLInputElement>();
   const emailRef = useRef<HTMLInputElement>();
   const passwordRef = useRef<HTMLInputElement>();

   const [data, setData] = useState();

   //新規作成
   const handleLogin = async () => {
      const res = await fetch(`http://localhost:3000/api/signup`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
         })
      });
      const resp = await res.json();

      setData(resp);
   };

   return (
      <div>
         <h1>Create Account!</h1>
         <input placeholder="name" ref={nameRef} type="text" />
         <input placeholder="email" ref={emailRef} type="text" />
         <input placeholder="password" ref={passwordRef} type="password" />
         <button onClick={handleLogin}>Login</button>
         {
            data && <pre>{JSON.stringify(data, null, 4)}</pre>
         }
      </div>
   )
};

export default Signup;