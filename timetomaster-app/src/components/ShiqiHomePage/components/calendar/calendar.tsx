import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import styles from './calendar.module.scss'; // Import corresponding SCSS file
import { getByDate } from '../../../../services/record-service'
import Record from '@/models/record';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [records, setRecords] = useState<Record[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    getByDate(new Date(selectedDate).toISOString()).then((items) => {
      console.log("Calendar Records:", items);
      setRecords(items);
    });
  };

  const totalHours = records.reduce((sum, record) => sum + record.Time, 0);
  const wholeHours = Math.floor(totalHours);
  const totalMinutes = Math.round((totalHours - wholeHours) * 60);
  let formattedTotalTime = '';
  if (wholeHours > 0) {
    formattedTotalTime += `${wholeHours}h `;
  }
  if (totalMinutes > 0) {
    formattedTotalTime += `${totalMinutes}min`;
  }

  const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

  return (
    <div className={styles['page-container']}>
      <div className={styles['calendar']}>
        <div className={styles['top-bar']}>
          <div className={styles['title']}>
            <span>Calendar</span>
          </div>
        </div>
        <div className={styles['top-div']}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline={true}
          />
        </div>
        <div className={styles['bottom-div']}>
          <div className={styles['bottom-top-bar']}>
            {formattedDate}  {formattedTotalTime}
          </div>
          {records.map((record, index) => {
            const hours = Math.floor(record.Time);
            const minutes = Math.round((record.Time - hours) * 60);
            let formattedTime = '';
            if (hours > 0) {
              formattedTime += `${hours}h `;
            }
            if (minutes > 0) {
              formattedTime += `${minutes}min`;
            }
            return (
              <div key={index} className={styles['record-data-div']}>
                <p>{record.goalName}</p>
                <h2>{formattedTime}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

