import mongoose from 'mongoose';
import BooksModel from './model';
import { IBook, IBookAggregate, IBooksService } from './interface';

class BooksService implements IBooksService {
    private booksModel: mongoose.Model<IBook>;

    constructor(booksModel: mongoose.Model<IBook>) {
        this.booksModel = booksModel;
    }

    /**
    * Gets the number of books in each country for a chart from the database.
    */
    public getChartData(): mongoose.Aggregate<IBookAggregate[]> {
        return this.booksModel.aggregate([
            {
                $group: {
                    _id: '$code3',
                    value: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    code3: '$_id',
                    value: true,
                    _id: false,
                },
            },
        ]);
    }
}

export default new BooksService(BooksModel);
