import styles from "./landingpage.module.scss";
import React, { useState, useEffect } from "react";

import { getAllGoalByEmail , updateGoal, deleteGoal} from "@/services/goal-service";
import Header from "../header/header";

import goalCard from "@/components/MainPage/components/goalCard/goalCard2";
import Calendar from "@/components/MainPage/components/calendar/calendar";
import CreateGoalModal from "@/components/MainPage/components/goalModal/createGoalModal";
import GoalDetail from "@/components/MainPage/components/goalDetail/goalDetail";
import Goal from "@/models/goal";

export default function LandingPage() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [goalDetailOpen, setGoalDetailOpen] = useState(true);
  const [currentGoal, setCurrentGoal] = useState<Goal>();

  const [selectedTab, setSelectedTab] = useState("Today");

  // Display modal to edit goal
  const handleEdit = (goal: Goal) => {
    console.log("handleEdit called with goal:", goal);
    setCurrentGoal(goal);
    setGoalDetailOpen(true);
  };

  // Create new goal
  const handleCreate = () => {};

  // Fetch All goals
  const goalCards = goals.map((goal) => (
    <GoalCardMain
      key={goal._id}
      goal={goal}
      onEdit={() => handleEdit(goal)}
    ></GoalCardMain>
  ));

  const fetchAllGoals = () => {
   };

  useEffect(() => {
    fetchAllGoals();
  }, [currentGoal, goalDetailOpen]);

  return (
    <div className={styles.pageContainer}>
      <Header selectedTab={selectedTab} />

      <main className={styles.mainContent}>
        <div className={styles.selectorContainer}>
          <div className={styles.addButton}>
            <div className={styles.innerCircle}>
              <span
                className={styles.plusSign}
                onClick={() => setCreateModalOpen(false)}
              >
                X
              </span>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.goalListContainer}>
            <div className={styles.goalList}>{goalCards}</div>
          </div>
          <div className={styles.goalDetail}>
            <GoalDetail
              isOpen={goalDetailOpen}
              goal={currentGoal || null}
              onClose={() => setGoalDetailOpen(false)}
            />
          </div>
          <div className={styles.calendarContainer}>
            <Calendar />
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className={styles.footContent}>
          copyright@ 2023 northeastern university
        </div>
      </footer>

      <CreateGoalModal // NEW
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
