"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import LoginIdentifier from "@/components/Draft/component/login/identifier";
import LoginForm from "@/components/Draft/component/login/login";
import SignupIdentifier from "@/components/Draft/component/register/identifier";
import CreaterCustomerForm from "@/components/Draft/component/register/register";
import GoalPage from "../components/MainPage/mainPage"
import StatisticsPage from "../components/MainPage/statisticsPage"
import GoalsPage from "../components/MainPage/goalsPage"
import LoginPage from "../components/LoginPage/login"
export default function Home() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login/identifier" element={<LoginIdentifier />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute/>} >
          <Route path="/home" element={<GoalPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/goals" element={<GoalsPage />} />          
        </Route>
        <Route path="/register/identifier" element={<SignupIdentifier />} />
        <Route path="/register" element={<CreaterCustomerForm />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
