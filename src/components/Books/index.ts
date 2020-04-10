import express from 'express';
import BooksService from './service';
import { IBooksService } from './interface';

class Books {
    private booksService: IBooksService;

    constructor(booksService: IBooksService) {
        this.booksService = booksService;
    }

    /**
    * @function
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    */
    public async chart(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            return res.status(200).json({
                data: await this.booksService.getChartData()
            });
        } catch (error) {
            res.status(500).json({
                message: error.name,
                details: error.message
            });

            return next(error);
        }
    }
}

export default new Books(BooksService);
