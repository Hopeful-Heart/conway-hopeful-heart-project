import PendingUserTable from "../AdminPage/pendingUserTable";
import ApprovedUserTable from "../AdminPage/approvedUserTable";
import Messaging from "../Messaging/Messaging";
import SendMessage from "../SendMessage/SendMessage";

function AdminEventView({ admin }) {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Admin Page</h1>
      <br />
      <Messaging />
      <SendMessage />
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
          <ApprovedUserTable admin={admin} />
        </div>
      </div>
    </div>
  );
}
export default AdminEventView;
