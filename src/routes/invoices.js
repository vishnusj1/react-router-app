import { getInvoices } from "./data";
import { NavLink, Outlet, useSearchParams,useLocation, } from "react-router-dom";

const Invoices = () => {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices.map((invoice) => (
          <QueryNavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </QueryNavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};

function QueryNavLink({ to, ...props }) {

  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}
export default Invoices;
