"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customerSchema_1 = __importDefault(require("../frameworks/mongoose/customerSchema"));
class customerRepository {
    async fetchCustomers({ page, limit, search, filterField, filterValue, }) {
        try {
            const query = {};
            if (search) {
                query.$or = [
                    { name_of_customer: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ];
            }
            if (filterField && filterValue) {
                const queryValue = filterField === "dob" ? new Date(filterValue) : filterValue;
                query[filterField] = queryValue;
            }
            const result = await customerSchema_1.default.aggregate([
                {
                    $match: query,
                },
                {
                    $facet: {
                        customers: [
                            {
                                $skip: (page - 1) * limit,
                            },
                            {
                                $limit: limit,
                            },
                        ],
                        count: [
                            {
                                $count: "count",
                            },
                        ],
                    },
                },
                {
                    $unwind: "$count",
                },
                {
                    $project: {
                        customers: "$customers",
                        totalPages: "$count.count",
                    },
                },
            ]);
            if (result.length > 0) {
                const { customers, totalPages } = result[0];
                return { customers, totalPage: totalPages };
            }
            return { customers: [], totalPage: 0 };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = customerRepository;
