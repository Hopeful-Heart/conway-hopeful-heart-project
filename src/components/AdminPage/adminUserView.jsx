import PendingUserTable from "../AdminPage/pendingUserTable";
import ApprovedUserTable from "../AdminPage/approvedUserTable";
import Button from '@material-ui/core/Button';

function AdminUserView({ admin, superAdmin, setDefaultAdminView, setAdminUserView }) {
  
  const resetDefaultAdminView = () => {
    setDefaultAdminView(true)
    setAdminUserView(false)
  }
  
  return (
    <div className="container">
      <Button onClick={resetDefaultAdminView} variant="contained" color="primary">Back</Button>
      <br />
      <h3 style={{ textAlign: "center" }}>Pending Users</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PendingUserTable setDefaultAdminView={setDefaultAdminView} setAdminUserView={setAdminUserView} admin={admin} />
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
          <ApprovedUserTable setDefaultAdminView={setDefaultAdminView} setAdminUserView={setAdminUserView} admin={admin} superAdmin={superAdmin}  />
        </div>
      </div>
    </div>
  );
}
export default AdminUserView;
