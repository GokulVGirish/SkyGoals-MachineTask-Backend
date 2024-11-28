import ICustomer from "./customer";

interface IRepository {
  fetchCustomers({
    page,
    limit,
    search,
    filterField,
    filterValue
  }: {
    page: number;
    limit: number;
    search: string;
    filterField: string;
    filterValue: string;
  }): Promise<{customers:ICustomer[],totalPage:number}>;
}
export default IRepository;
