import mongoose from 'mongoose';

export interface IBook extends mongoose.Document {
    code3: string;
    title: string;
    titleLength: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookAggregate {
    code3: string;
    value: number;
}

export interface IBooksService {
    getChartData(): mongoose.Aggregate<IBookAggregate[]>;
}

