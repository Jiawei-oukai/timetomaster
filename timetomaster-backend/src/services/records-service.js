import Record from "../models/records.js";
import Goal from "../models/goal.js";
import moment from 'moment';

//Fetch all records
export const search = async (params) => {
    const records = Record.find(params).exec();
    return records;
}

// Fetch all records for a specific user by user ID
export const getByUserId = async (userId) => {
    return Record.find({ userId }).exec();
}

// Fetch a records by id
export const getById = async (id) => {
    console.log(id);
    const records = Record.findById(id).exec();
    return records;
}

// Create a new record and update the corresponding goal
export const save = async (newRecord) => {
    const record = new Record(newRecord);

    try {
        await record.save(record);

        const goal = await Goal.findOne({ _id: record.goalId });
        if (goal) {
            goal.investedHours += record.Time;
            goal.progress = Math.min(goal.investedHours / goal.totalHours, 1);

            await goal.save();
        } else {
            console.warn("Goal not found for the given goalId:", record.goalId);
        }

        return record; 
    } catch (error) {
        console.error("An error occurred while saving the record and updating the goal:", error);
        throw error;
    }
};


// Update an existing records
export const update = async (id, updatedRecord) => {
    const records = await Record.findByIdAndUpdate(id, updatedRecord, { new: true }).exec();
    return records;
}

// Delete a records
export const remove = async (id) => {
    const records = await Record.findByIdAndDelete(id).exec();
    return records;
}

export const searchAllByGid = async (gid) => {
    return Record.find({
        goalId: gid
    });
}

export const searchDailyTimeByGoalId = async (gid) => {
    const records = await Record.find({ goalId: gid });

    const dailyTime = {};

    records.forEach(record => {
        const date = record.recordsDate.toISOString().split('T')[0]; // 将日期转换为YYYY-MM-DD格式
        if (!dailyTime[date]) {
            dailyTime[date] = {
                goalId: gid,
                goalName: record.goalName,
                recordsDate: date,
                totalHours: 0
            };
        }
        dailyTime[date].totalHours += record.Time;
    });

    return Object.values(dailyTime);
}

export const searchWeeklyTimeByGoalId = async (gid) => {
    const goalRecord = await Record.findOne({ goalId: gid });
    const goalName = goalRecord ? goalRecord.goalName : "Unknown Goal";

    const weeklyTime = Array.from({ length: 8 }, () => ({
        goalId: gid,
        goalName, 
        recordsDate: "",
        totalHours: 0
    }));

    const today = new Date();
    today.setDate(today.getDate() - today.getDay() + 1);
    today.setHours(0, 0, 0, 0); 

    for (let i = 0; i < 8; i++) {
        const monday = new Date(today);
        monday.setDate(today.getDate() - 7 * i);
        weeklyTime[i].recordsDate = monday.toISOString().split('T')[0];
    }

    const records = await Record.find({ goalId: gid });
    records.forEach(record => {
        const recordDate = new Date(record.recordsDate);
        const weeksAgo = Math.floor((today - recordDate) / (1000 * 60 * 60 * 24 * 7));
        if (weeksAgo <= 7) { 
            console.log('Matching record:', record); 
            if (weeksAgo >= 0 && weeksAgo < weeklyTime.length) {
                weeklyTime[weeksAgo].totalHours += record.Time;
            } else {
                console.warn('Invalid index:', weeksAgo);
            }
        }
    });

    return weeklyTime.reverse(); 
}


export const searchMonthlyTimeByGoalId = async (gid) => {
    const records = await Record.find({ goalId: gid });

    const goalName = records[0] ? records[0].goalName : "Unknown Goal";

    const monthlyTime = Array.from({ length: 6 }, () => ({
        goalId: gid,
        goalName,
        recordsDate: "",
        totalHours: 0
    }));

    const today = moment();

    for (let i = 0; i < 6; i++) {
        monthlyTime[i].recordsDate = today.clone().subtract(i, 'months').format('YYYY-MM');
    }

    records.forEach(record => {
        const recordDate = moment(record.recordsDate);
        const monthsDifference = today.diff(recordDate, 'months');

        if (monthsDifference >= 0 && monthsDifference < 6) {
            monthlyTime[monthsDifference].totalHours += record.Time;
        }
    });

    return monthlyTime.reverse();
};


export const searchAllByUid = async (uid) => {
    return Record.find({
        userId: uid
    });
}

export const searchDailyTimeByUId = async (uid) => {
    const records = await Record.find({ userId: uid });

    const dailyTime = {};

    records.forEach(record => {
        const date = record.recordsDate.toISOString().split('T')[0]; // 将日期转换为YYYY-MM-DD格式
        if (!dailyTime[date]) {
            dailyTime[date] = {
                recordsDate: date,
                totalHours: 0
            };
        }
        dailyTime[date].totalHours += record.Time;
    });

    return Object.values(dailyTime);
}


moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week
    },
});

export const searchWeeklyTimeByUId = async (uid) => {
    const weeklyTime = Array.from({ length: 8 }, () => ({
        recordsDate: "",
        totalHours: 0,
    }));

    const today = moment();
    const currentSunday = today.clone().day(0);

    for (let i = 0; i < 8; i++) {
        const sunday = currentSunday.clone().add(i, 'days').subtract(i, 'weeks');
        weeklyTime[i].recordsDate = sunday.format('YYYY-MM-DD');
    }

    const records = await Record.find({ userId: uid });
    records.forEach((record) => {
        const recordDate = moment(record.recordsDate);

        for (let i = 0; i < 8; i++) {
            const startOfWeek = moment(weeklyTime[i].recordsDate); 
            const endOfWeek = moment(weeklyTime[i].recordsDate).add(6, 'days'); 

            if (recordDate.isSameOrAfter(startOfWeek) && recordDate.isSameOrBefore(endOfWeek)) {
                weeklyTime[i].totalHours += record.Time;
            }
        }
    });

    return weeklyTime.reverse();
};

export const searchMonthlyTimeByUId = async (uid) => {
    const records = await Record.find({ userId: uid });

    const monthlyTime = Array.from({ length: 6 }, () => ({
        recordsDate: "",
        totalHours: 0
    }));

    const today = moment();

    for (let i = 0; i < 6; i++) {
        monthlyTime[i].recordsDate = today.clone().subtract(i, 'months').format('YYYY-MM');
    }

    records.forEach(record => {
        const recordDate = moment(record.recordsDate);
        const monthsDifference = today.diff(recordDate, 'months');

        if (monthsDifference >= 0 && monthsDifference < 6) {
            monthlyTime[monthsDifference].totalHours += record.Time;
        }
    });

    return monthlyTime.reverse();
};

// Fetch goals by due date
export const searchByDate = async (date) => {
    const targetDate = new Date(date);
    const startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);
    console.log(startDate +" "+ endDate);
  
    return Record.find({
      recordsDate: {
        $gte: startDate,
        $lte: endDate
      }
    });
  };
  
