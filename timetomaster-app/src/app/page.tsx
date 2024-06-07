"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginIdentifier from "@/components/felixHome/component/login/identifier";
import LoginForm from "@/components/felixHome/component/login/login";
import SignupIdentifier from "@/components/felixHome/component/register/identifier";
import CreaterCustomerForm from "@/components/felixHome/component/register/register";
import GoalPage from "../components/ShiqiHomePage/mainPage"
import StatisticsPage from "../components/ShiqiHomePage/statisticsPage"
import GoalsPage from "../components/ShiqiHomePage/goalsPage"

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoalPage />} />
        <Route path="/home" element={<GoalPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/login/identifier" element={<LoginIdentifier />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register/identifier" element={<SignupIdentifier />} />
        <Route path="/register" element={<CreaterCustomerForm />} />

      </Routes>
    </BrowserRouter>
  );
}
