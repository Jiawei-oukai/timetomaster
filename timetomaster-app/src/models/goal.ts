export default interface Goal {
    _id : string;
    userId: string;
    title:  string;
    totalHours: number;
    investedHours: number;
    progress: number;
    status: string;
    completionDate: string;
    expectedCompletionDate: string;
    createdAt: string;
    updatedAt: Date;
    logo: number;
};