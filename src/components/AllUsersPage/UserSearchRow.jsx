import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import '../AllUsersPage/userSearch.css'

function UserSearchRow({ user }) {

    const history = useHistory();

    const dispatch = useDispatch();

    const userDetails = (id) => {
        history.push('/userdetails')
        dispatch({ type: "FETCH_USER_DETAILS", payload: id })
    }

    return (
        <div className="profileCard" key={user.id}>
            <img style={{ maxHeight: 250, maxWidth: 250, borderRadius: "50%" }} src={user.profile_pic}></img>
            <h2>{`${user.first_name} ${user.last_name}`}</h2> 
            <p>{`${user.city},${user.state}`}</p>
            <button onClick={() => userDetails(user)}>Learn More</button>
        </div>
    )
}
export default UserSearchRow;