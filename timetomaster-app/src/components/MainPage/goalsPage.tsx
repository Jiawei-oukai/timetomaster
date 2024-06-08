import styles from './goalsPage.module.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { getAllGoalByEmail, searchGoal } from '../../services/goal-service';
import { useAuth } from '@/app/AuthContext';
import Header from './components/header/header';
import TypeSelector from './components/typeSelector/typeSelector';
import GoalCard from './components/goalCard/goalCard';
import CreateGoalModal from './components/goalModal/createGoalModal';
import EditGoalModal from './components/goalModal/editGoalModal';

import Goal from '@/models/goal';
import Record from '@/models/record';

export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal>();

  const [selectedTab, setSelectedTab] = useState('Goals');

  // Display modal to edit goal
  const handleEdit = (goal: Goal) => {
    setCurrentGoal(goal);
    setEditModalOpen(true);
  };

  // Create new goal
  const handleCreate = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
    setCreateModalOpen(false);
  };

  // Update a goal
  const handleSave = async () => {
    fetchAllGoals();
    setEditModalOpen(false);
  };

  // Delete a goal
  const handleDelete = React.useCallback(async () => {
    if (!currentGoal) { return; }
    setGoals(goals.filter((goal) => goal._id !== currentGoal._id));
    setEditModalOpen(false);
  }, [currentGoal, goals]);

  // Fetch All goals
  const goalCards = goals.map((goal) =>
    <GoalCard
      key={goal._id}
      goal={goal}
      onEdit={() => handleEdit(goal)}
    ></GoalCard>);

  const fetchAllGoals = useCallback(() => {
    if (user) {
      getAllGoalByEmail(user.email).then((items) => {
        setGoals(items);
      });
    }
  }, [user]);


  useEffect(() => {
    fetchAllGoals();
  }, [fetchAllGoals, editModalOpen]);

  // search goal based on type progess/completed
  const [activeButton, setActiveButton] = useState('All');

  const handleButtonClick = async (buttonLabel: string) => {
    setActiveButton(buttonLabel);
    const items = await searchGoal<Goal>(buttonLabel);
    setGoals(items);
  };

  return (
    <div className={styles.pageContainer}>
      <Header selectedTab={selectedTab} />

      <main className={styles.mainContent}>
        <div className={styles.selectorContainer}>
          <TypeSelector activeButton={activeButton} onButtonClick={handleButtonClick} />
          <div className={styles.addButton}>
            <div className={styles.innerCircle}>
              <span className={styles.plusSign} onClick={() => setCreateModalOpen(true)}>+</span>
            </div>
          </div>
        </div>

        <div className={styles.goalList}>{goalCards}</div>
      </main>

      <footer className="footer">
        <div className={styles.footContent}>copyright@ 2023 northeastern university</div>
      </footer>

      <CreateGoalModal  // NEW
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditGoalModal
        isOpen={editModalOpen}
        goal={currentGoal || null}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>


  );
}
