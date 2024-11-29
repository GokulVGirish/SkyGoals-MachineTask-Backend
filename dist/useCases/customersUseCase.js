"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customerInteractor {
    constructor(Repository) {
        this.Repository = Repository;
    }
    async fetchCustomers({ page, limit, search, filterField, filterValue, }) {
        try {
            const response = await this.Repository.fetchCustomers({
                page,
                limit,
                search,
                filterField,
                filterValue,
            });
            return { customers: response.customers, totalPage: response.totalPage };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = customerInteractor;
