import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import '../AllUsersPage/userSearch.css'

function UserSearchRow({ user }) {

    const history = useHistory();

    const dispatch = useDispatch();

    const userDetails = (id) => {
        history.push('/userdetails')
        dispatch({ type: "FETCH_USER_DETAILS", payload: id })
    }

    const useStyles = makeStyles({
        paper: {
          margin: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "fit-content",
          padding: "2rem",
          textAlign: "center",
        },
      });
    
      const classes = useStyles();

    return (
        <div className="profileCard" key={user.id}>
            <Paper className={classes.paper}>
                <img style={{ height: 250, width: 250, borderRadius: "50%" }} src={user.profile_pic}></img>
                <h2>{`${user.first_name} ${user.last_name}`}</h2>
                {user.city ? <p>{`${user.city},${user.state}`}</p> : <p>{user.state}</p>}
                <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={() => userDetails(user)}>Learn More</Button>
            </Paper>
        </div>
    )
}
export default UserSearchRow;