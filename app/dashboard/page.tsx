import Cashflow from "./cashflow";
import RecentTransactions from "./transactions/recent-transactions";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ cfyear: string }>;
}) => {
  const today = new Date();
  const searchParamsValues = await searchParams;
  const cfYear = Number(searchParamsValues.cfyear ?? today.getFullYear());
  if (isNaN(cfYear)) {
    today.getFullYear();
  }
  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow year={cfYear} />
      <RecentTransactions />
    </div>
  );
};
export default DashboardPage;
