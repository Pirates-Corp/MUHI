import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, isLoading] = useState(false);
    const [user, setUser] = useState(false)

    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) Router.replace("/");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.password.value !== e.currentTarget.cpassword.value) {
            setErrorMsg("Passwords does not match")
        }else{
            setErrorMsg("")
            const body = {
                email: e.currentTarget.email.value,
                name: e.currentTarget.name.value,
                password: e.currentTarget.password.value
            };
            console.log(body)
        }
    };
    return (
        <>
          {loading && "Loading"}
          <form onSubmit={handleSubmit}>
             {errorMsg && ( <p style={{ color: "red" }}>{errorMsg}</p> )}
                <div>
                    <input id="name" type="text" required />
                    <label htmlFor="name">name</label>
                </div>
                <div>
                    <input id="email" type="email" required />
                    <label htmlFor="email">email</label>
                </div>
                <div>
                    <input id="password" type="password" required />
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <input id="cpassword" type="cpassword" required />
                    <label htmlFor="cpassword">Confirm Password</label>
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
                <div> 
                    <p>Start with Google</p>
                </div>
                <div>
                    <p>Already have an account<Link href="/login"> Login here.</Link></p>
                </div>
            </form>
        </>
    );
}