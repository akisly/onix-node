
import mongoose from 'mongoose';
import connections from '../../config/connection';
import { IBook } from './interface';

const BooksSchema: mongoose.Schema = new mongoose.Schema(
    {
        code3: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            trim: true,
        },
        titleLength: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'booksmodel',
        versionKey: false,
    },
);

export default connections.model<IBook>('BooksModel', BooksSchema);
