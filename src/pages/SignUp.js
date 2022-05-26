import React, { useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormState } from "react-hook-form";
import './SignUp.css'
import axios from "axios";

export default function SignUp() {
    const { register, watch, handleSubmit, errors} = useForm();
    const navigate = useNavigate();


    const onValid = (data) => {
        const {email, pw, nickname, type} = data;
        axios.post("http://localhost:5000/users/signup", {email, pw, nickname, type})
        .then(response => {
            console.log(response.data, "onvalid");
            alert("회원가입을 성공하였습니다.");
            navigate('/login');
        })
        .catch(error => {
            console.log(error.data, "onInvalid");
            alert("회원가입을 실패하였습니다.");
        });
    };
    
    return (
        <div className="SignUp">
            <Navbar />
            <main className="main">
            <div className="container">
                <form className="signup-form" onSubmit={handleSubmit(onValid)}>
                    <h1 className="signup-h1">SignUp</h1>
                    <label className="signup-label">id</label>
                    <input className="signup-input"
                        {...register("email", { required: "email error" } )}
                        type = "email"
                        placeholder = "email"
                        />
                    <label className="signup-label">password</label>
                    <input className="signup-input"
                        {...register("pw", { required: "pw error",
                        minLength:{
                            value:8,
                            message:"비밀번호는 8자 이상이어야 합니다,"} })}
                        type = "password"
                        placeholder = "pw"
                        />
                    {/* <label className="signup-label">check password</label>
                    <input
                        {...register("passwordCheck", { required: "password check error" })}
                        type = "password"
                        placeholder = "Password Check"
                        />  */}
                    <label className="signup-label">nickname</label>
                    <input className="signup-input"
                        {...register("nickname", { required: "nickname error" ,
                        minLength:{
                            value:2,
                            message:"닉네임은 2글자 이상이어야 합니다,"} })}
                        type = "text"
                        placeholder = "nickname"
                        />
                    <label className="signup-label">회원 유형</label>
                    <div className="memberType">
                    <div className="type-check">
                        <label htmlFor="public">
                            <input
                                {...register("type", { required: true })}
                                type="radio"
                                name="type"
                                value="public"
                                className="type-check-input"
                                id="public"
                                />{' '}
                                일반 회원
                        </label>
                    </div>
                    <div className="type-check">
                        <label htmlFor="teacher">
                            <input
                                {...register("type", { required: true })}
                                type="radio"
                                name="type"
                                value="teacher"
                                className="type-check-input"
                                id="teacher"
                                />{' '}
                                강사
                        </label>
                    </div>
                    </div>
                    <input className="signup-btn" type="submit" value="SignUp" />
                </form>
            </div>
            </main>
        </div>
    );
}