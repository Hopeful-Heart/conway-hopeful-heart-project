import ApprovedUserRow from '../AdminPage/approvedUserRow';

function ApprovedUserTable({ admin }) {

  return (
    <table style={{ textAlign: 'center' }}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone Number</td>
          <td>State</td>
          <td>Controls</td>
        </tr>
      </thead>
      <tbody>
        {admin.approvedUsersReducer.map(user => {
          return (
            <ApprovedUserRow
              key={user.id}
              user={user}
            />
          )
        })}
      </tbody>
    </table>
  )
}
export default ApprovedUserTable;