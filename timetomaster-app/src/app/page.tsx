"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginIdentifier from "@/components/Draft/component/login/identifier";
import LoginForm from "@/components/Draft/component/login/login";
import SignupIdentifier from "@/components/Draft/component/register/identifier";
import CreaterCustomerForm from "@/components/Draft/component/register/register";
import GoalPage from "../components/MainPage/mainPage"
import StatisticsPage from "../components/MainPage/statisticsPage"
import GoalsPage from "../components/MainPage/goalsPage"

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
