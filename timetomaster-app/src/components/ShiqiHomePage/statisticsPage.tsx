import styles from './statisticsPage.module.scss';
import React, { useState, useEffect } from 'react';

import { getDailyByUid, getWeeklyByUid, getMonthlyByUid } from '../../services/record-service';

import Header from './components/header/header';
import Histogram from './components/histogram/histogram';
import PieChart from './components/pieChart/pieChart';

import DailyRecord from '@/models/record-daily';

export default function StatisticsPage() {
  const [daylyRecords, setDaylyRecords] = useState<DailyRecord[]>([]);
  const [weeklyRecords, setWeeklyRecords] = useState<DailyRecord[]>([]);
  const [monthlyRecords, setMonthlyRecords] = useState<DailyRecord[]>([]);

  const [selectedTab, setSelectedTab] = useState('Statistics');

  const fetchAllRecordsByUid = () => {
    getDailyByUid().then((items) => {
      setDaylyRecords(items);
      console.log("statis Daily Records:", items);
    });
    getWeeklyByUid().then((items) => {
      setWeeklyRecords(items);
      console.log("statis Weekly Records:", items);
    });
    getMonthlyByUid().then((items) => {
      setMonthlyRecords(items);
      console.log("statis Monthly Records:", items);
    });
  };

  // Fetch All goals
  useEffect(() => {
    fetchAllRecordsByUid();
  }, []);

  const pieData = [
    { name: 'LearnJava', value: 42 },
    { name: 'Guitar Chords', value: 13.08 },
    { name: 'Algorithm', value: 7.08 },
    { name: 'Reading', value: 1.92 },
    { name: 'Fitness', value: 1.33 },
    { name: 'Mathmatic', value: 3.42 }
  ];


  return (
    <div className={styles.pageContainer}>
      <Header selectedTab={selectedTab} />

      <main className={styles.mainContent}>
        <div className={styles.topBlock}>
          <div className={styles.overallContent}>
            <h3>75H 35min</h3>
            <p>Total Time</p>
          </div>
          <div className={styles.overallContent}>
            <h3>6 days</h3>
            <p>Steak</p>
          </div>
          <div className={styles.overallContent}>
            <h3>{daylyRecords.length}</h3>
            <p>Records</p>
          </div>
        </div>

        <div className={styles.bottomBlock}>
          <Histogram dailyRecords = {daylyRecords}
            weeklyRecords = {weeklyRecords}
            monthlyRecords= {monthlyRecords} />
          <PieChart data={pieData} />
        </div>

      </main>

      <footer className="footer">
        <div className={styles.footContent}>copyright@ 2023 northeastern university</div>
      </footer>
    </div>
  );
}
