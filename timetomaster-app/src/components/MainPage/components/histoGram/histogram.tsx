import styles from './histogram.module.scss';
import React from 'react';

import { ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ReferenceLine, Line } from 'recharts';
import { useState } from 'react';
import DailyRecord from '@/models/record-daily';

interface HistogramProps {
    dailyRecords: DailyRecord[];
    weeklyRecords: DailyRecord[];
    monthlyRecords: DailyRecord[];
}

export default function Histogram( props: HistogramProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('day');

    const handlePeriodChange = (newPeriod: string) => {
        setSelectedPeriod(newPeriod);
        console.log("Daily Records:", props.weeklyRecords);
    };

    const getDataForPeriod = () => {
        let records :DailyRecord[];
        switch (selectedPeriod) {
            case 'day':
                records = props.dailyRecords;
                break;
            case 'week':
                records = props.weeklyRecords;
                break;
            case 'month':
                records = props.monthlyRecords;
                break;
            default:
                records = [];
                break;
        }
    
        return records.sort((a, b) => {
            const dateA = new Date(a.recordsDate).getTime();
            const dateB = new Date(b.recordsDate).getTime();
            return dateB - dateA;
        });
    };
    
    

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                    <h2>Recent Time invested &nbsp;</h2> <p>(h)</p>
                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.buttonHighlight}
                        style={{
                            left: `${selectedPeriod === 'day' ? 5 : selectedPeriod === 'week' ? 38.33 : 71.66}%`
                        }}></div>
                    <button className={`${styles.button} ${selectedPeriod === 'day' ? styles.selected : ''}`} onClick={() => handlePeriodChange('day')}>Day</button>
                    <button className={`${styles.button} ${selectedPeriod === 'week' ? styles.selected : ''}`} onClick={() => handlePeriodChange('week')}>Week</button>
                    <button className={`${styles.button} ${selectedPeriod === 'month' ? styles.selected : ''}`} onClick={() => handlePeriodChange('month')}>Month</button>

                    <div className={styles.verticalLine} style={{ left: '33.33%' }}></div>
                    <div className={styles.verticalLine} style={{ left: '66.66%' }}></div>

                </div>

            </div>
            <div className={styles.chartContent}>
                <div className={styles.histogram}>
                    <ComposedChart
                        className={styles.customChart}
                        width={800}
                        height={400}
                        data={getDataForPeriod()}
                        margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="recordsDate" stroke="#494949" axisLine={false} tickLine={false}
                            tick={{ fontSize: 16 }}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                const month = date.getMonth() + 1;
                                const day = date.getDate();
                                return day ? `${month.toString()}-${day.toString()}` : `${month.toString()}`;
                            }}
                        >
                            <ReferenceLine y={0} stroke="#494949" />
                        </XAxis>
                        <YAxis stroke="#494949" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#f3f3f2' }}
                            formatter={(value: number) => {
                                return parseFloat(value.toFixed(2));
                            }}
                        />
                        <Bar dataKey="totalHours" fill="#d1cd8e" barSize={30}>
                            <LabelList dataKey="totalHours" position="top"
                                formatter={(value: number) => parseFloat(value.toFixed(2))}
                                fontSize={16}
                            />
                        </Bar>
                        <Line type="linear" dataKey="totalHours" stroke="#a7b798"
                            strokeWidth={2} dot={true} />
                    </ComposedChart>
                </div>
            </div>
        </div>

    );
};


// import React from 'react';
// import styles from './histogram.module.scss';
// import { ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Line, LabelList } from 'recharts';
// import { useState } from 'react';

// interface DailyRecords {
//     recordsDate: string;
//     totalHours: number;
// }
// interface WeeklyRecords {
//     dateOfSunday: string;
//     totalTime: number;
// }
// interface MonthlyRecords {
//     month: string;
//     totalTime: number;
// }

// interface HistogramProps {
//     dailyRecords: DailyRecords[];
//     weeklyRecords: WeeklyRecords[];
//     monthlyRecords: MonthlyRecords[];
// }

// export default function Histogram(props: HistogramProps) {
//     const { dailyRecords, weeklyRecords, monthlyRecords } = props;

//     const [selectedPeriod, setSelectedPeriod] = useState('day'); // 初始统计周期为日

//     const handlePeriodChange = (newPeriod: string) => {
//         setSelectedPeriod(newPeriod);
//     };
    
//     const getDataForPeriod = () => {
//         let records: DailyRecords[] | WeeklyRecords[] | MonthlyRecords[] = [];
//         let dataKey: keyof DailyRecords | keyof WeeklyRecords | keyof MonthlyRecords = "totalHours";
    
//         switch (selectedPeriod) {
//             case 'day':
//                 records = dailyRecords;
//                 break;
//             case 'week':
//                 records = weeklyRecords;
//                 dataKey = "totalTime";
//                 break;
//             case 'month':
//                 records = monthlyRecords;
//                 dataKey = "totalTime";
//                 break;
//         }
    
//         return { records, dataKey };
//     };
    

//     const { records, dataKey } = getDataForPeriod();

//     return (
//         <div className={styles.chartContainer}>
//             {/* ... Header Code ... */}
//             <div className={styles.chartContent}>
//                 <div className={styles.histogram}>
//                     <ComposedChart
//                         className={styles.customChart}
//                         width={800}
//                         height={400}
//                         data={records}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                         <XAxis dataKey="recordsDate" stroke="#494949" axisLine={false} tickLine={false} />
//                         <ReferenceLine y={0} stroke="#494949" />
//                         <YAxis stroke="#494949" axisLine={false} tickLine={false} />
//                         <Tooltip contentStyle={{ backgroundColor: '#333', color: '#f3f3f2' }} />
//                         <Bar dataKey={dataKey} fill="#d1cd8e" barSize={30}>
//                             <LabelList dataKey={dataKey} position="top" />
//                         </Bar>
//                         <Line type="linear" dataKey={dataKey} stroke="#a7b798" strokeWidth={2} dot={true} />
//                     </ComposedChart>
//                 </div>
//             </div>
//         </div>
//     );
// }