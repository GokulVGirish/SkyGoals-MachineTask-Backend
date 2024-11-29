import ICustomer from "../entities/customer";
import IRepository from "../entities/iRepository";
import Customer from "../frameworks/mongoose/customerSchema";

class customerRepository implements IRepository {
  async fetchCustomers({
    page,
    limit,
    search,
    filterField,
    filterValue,
  }: {
    page: number;
    limit: number;
    search: string;
    filterField: string;
    filterValue: string;
  }): Promise<{ customers: ICustomer[]; totalPage: number }> {
    try {
      const query: any = {};
      if (search) {
        query.$or = [
          { name_of_customer: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      if (filterField && filterValue) {
       if (filterField === "dob") {
       
         const date = new Date(
           new Date(filterValue).getTime() + (5 * 60 + 30) * 60 * 1000
         );

        
         const startOfDay = new Date(date);
         startOfDay.setHours(0, 0, 0, 0);

      
         const endOfDay = new Date(date);
         endOfDay.setHours(23, 59, 59, 999);
   

      

   
         query[filterField] = { $gte: startOfDay, $lt: endOfDay };
       } else {
         query[filterField] = filterValue;
       }
      }
      const result = await Customer.aggregate([
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
    } catch (error) {
      throw error;
    }
  }
}
export default customerRepository;
