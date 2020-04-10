const csv = require("csvtojson");
const XLSX = require("xlsx");
const fs = require("fs").promises;
const path = require("path");

/**
 * The function returns a book list in the format json.
 * @function
 * @param {String} fileName
 * @returns {Promise < void >}
 */
async function getBookList(fileName) {
    try {
        const fileFormat = await getFileFormat(fileName);

        if (fileFormat === ".csv") {
            return await csvParser(fileName);
        } else if (fileFormat === ".xlsx") {
            return await xlsxParser(fileName);
        }

        return;
    } catch (error) {
        return console.error(error);
    }
}

/**
 * The function parse csv file
 * @param {String} fileName
 * @returns {Promise < void >}
 */
async function csvParser(fileName) {
    try {
        const bookList = await csv().fromFile(fileName);

        return bookList;
    } catch (error) {
        return console.error(error);
    }
}

/**
 * The function parse xlsx file
 * @param {String} fileName
 * @returns {Promise < void >}
 */
async function xlsxParser(fileName) {
    try {
        const xlsxData = await fs.readFile(path.join(process.cwd(), fileName));
        const workbook = XLSX.read(xlsxData, { type: "buffer" });
        let bookList = [];

        workbook.SheetNames.forEach(sheet => {
            bookList = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        });

        return bookList;
    } catch (error) {
        return console.error(error);
    }
}

/**
 * The function returns file format
 * @param {String} fileName
 * @returns {String}
 */
async function getFileFormat(fileName) {
    try {
        const dotIndex = fileName.lastIndexOf(".");
        const fileFormat = fileName.slice(dotIndex, fileName.length);

        return fileFormat;
    } catch (error) {
        return console.error(error);
    }
}

module.exports = {
    async up(db, client) {
        const bookList = await getBookList("books.csv");

        bookList.forEach(book => {
            db.collection("booksmodel").insertOne({
                code3: book["code3"],
                title: book["title"],
                titleLength: book["title"].length,
                description: book["description"],
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });
    },

    async down(db, client) {
        await db.collection("booksmodel").deleteMany({});
    }
};
