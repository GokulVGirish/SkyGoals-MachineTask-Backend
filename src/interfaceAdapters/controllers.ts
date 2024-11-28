import IControllers from "../entities/iControllers";
import IUseCases from "../entities/iUseCases";

import { NextFunction, Request, Response } from "express";

class customersController implements IControllers {
  constructor(private readonly Interactor: IUseCases) {}
  async fetchCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = "1",
        limit = "10",
        search = "",
        filterField = "",
        filterValue = "",
      } = req.query;
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
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const response = await this.Interactor.fetchCustomers({
        page: pageNumber,
        limit: limitNumber,
        search: search as string,
        filterField: filterField as string,
        filterValue: filterValue as string,
      });
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
export default customersController;
