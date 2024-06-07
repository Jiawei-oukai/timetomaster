import React, { useState, useEffect } from 'react';
import styles from './goalDetail.module.scss';
import Goal from '@/models/goal';
import Record from '@/models/record';
import Image from 'next/image';

import HistogramSmall from '../histogram/histogramSmall';
import DailyRecord from '@/models/record-daily';

interface Props {
  isOpen: boolean;
  goal: Goal | null;
  onClose: () => void;
  addRecord :(goal: Goal) => void;
  dailyRecords: DailyRecord[];
  weeklyRecords: DailyRecord[];
  monthlyRecords: DailyRecord[];
}

export default function GoalDetail(props: Props) {

  const [title, setTitle] = React.useState("");
  const [goalIcon, setGoalIcon] = React.useState("");
  const [totalHours, setTotalHours] = React.useState("");
  const [expectedCompletionDate, seteEpectedCompletionDate] = React.useState<string | null>(null);
  const [daylyRecords, setDaylyRecords] = useState<DailyRecord[]>([]);
  const [weeklyRecords, setWeeklyRecords] = useState<DailyRecord[]>([]);
  const [monthlyRecords, setMonthlyRecords] = useState<DailyRecord[]>([]);


  const goalIcons = Array.from({ length: 12 }, (_, i) => require(`./goalicons/${i + 1}.png`));



  React.useEffect(() => {
    initializeModal();
  }, [props.goal]);

  const initializeModal = () => {
    if (props.goal) {
      const date = new Date(props.goal.expectedCompletionDate);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
      seteEpectedCompletionDate(localDateTime.toISOString().slice(0, 16));
      setTitle(props.goal.title);
      setTotalHours(props.goal.totalHours.toString());
      const goalIcon = goalIcons[props.goal.logo - 1];
      setGoalIcon(goalIcon);
      setDaylyRecords(props.dailyRecords);
      setWeeklyRecords(props.weeklyRecords);
      setMonthlyRecords(props.monthlyRecords);

    } else {
      const goalIcon = goalIcons[1];
      setGoalIcon(goalIcon);
            setDaylyRecords(props.dailyRecords);
      setWeeklyRecords(props.weeklyRecords);
      setMonthlyRecords(props.monthlyRecords);
    }
  };


  return (
    <div className={styles['task-detail-page']}>
      <div className={styles.container}>
        <div className={styles['top-div']}>

          <div className={styles.left}>
            <Image src={goalIcon} alt="" width={200} height={180} />
          </div>

          <div className={styles.right}>
            <div className={styles.textContainer}>
              <div className={styles.title}>{title}</div>
              <div className={styles.subtitle}>Target Time: {totalHours} hours </div>
            </div>

            <button className={styles.button} onClick={() => props.addRecord(props.goal as Goal)}>
              <div className={styles.square}>
                <div className={styles.plus}>+</div>
              </div>
              <span className={styles.buttonText} >Add Invested Time</span>
            </button>

          </div>
        </div>

        <div className={styles['time-day-record-div']}>
          <div className={styles.overallContent}>
            <h3>5.5h</h3>
            <p>Total Time</p>
          </div>
          <div className={styles.overallContent}>
            <h3>2d</h3>
            <p>Steak</p>
          </div>
          <div className={styles.overallContent}>
            <h3>3</h3>
            <p>Records</p>
          </div>
        </div>

        <div className={styles['chart-div']}>
          <HistogramSmall dailyRecords = {daylyRecords}
            weeklyRecords = {weeklyRecords}
            monthlyRecords= {monthlyRecords} />
        </div>

      </div>
    </div>
  );
};
