import PendingUserTable from "../AdminPage/pendingUserTable";
import ApprovedUserTable from "../AdminPage/approvedUserTable";

function AdminUserView({ admin, superAdmin }) {
  return (
    <div className="container">
      <br />
      <h3 style={{ textAlign: "center" }}>Pending Users</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PendingUserTable admin={admin} />
      </div>
      <br />
      <div>
        <h3 style={{ textAlign: "center" }}>Approved Users</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ApprovedUserTable admin={admin} superAdmin={superAdmin} />
        </div>
      </div>
    </div>
  );
}
export default AdminUserView;
