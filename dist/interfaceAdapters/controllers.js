"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customersController {
    constructor(Interactor) {
        this.Interactor = Interactor;
    }
    async fetchCustomers(req, res, next) {
        try {
            const { page = "1", limit = "10", search = "", filterField = "", filterValue = "", } = req.query;
            // console.log(
            //   "page",
            //   page,
            //   "limit",
            //   limit,
            //   "search",
            //   search,
            //   "filterFIeld",
            //   filterField,
            //   "filterValue",
            //   filterValue
            // );
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const response = await this.Interactor.fetchCustomers({
                page: pageNumber,
                limit: limitNumber,
                search: search,
                filterField: filterField,
                filterValue: filterValue,
            });
            res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = customersController;
