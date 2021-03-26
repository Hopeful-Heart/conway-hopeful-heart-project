import { useSelector } from 'react-redux';
import './userDetails.css';

function UserDetails() {
    const user = useSelector(store => store.userSearch.userDetailsReucer);
    return (
        <div className="detailsDiv container">
            <div className="detailsInfo">
                <h2>{`${user.first_name} ${user.last_name}`}</h2>
                <img src={user.profile_pic} style={{ maxWidth: 225, maxHeight: 225, borderRadius: "50%" }}></img>
                <h4>{user.email} | {user.phone}</h4>
                <h4>{`${user.state}, ${user.city}`}</h4>
                <h2>{user.child_first_name}</h2>
                {user.child_first_name === '' || user.child_last_name === '' || user.second_photo === '' || user.story === '' || user.special_sentiment === '' || user.birthday === null || user.memorial_date === null ? <p>No Child Information</p> :
                    <>
                        <h1>{`${user.child_first_name}'s Story`}</h1>
                        <p>{user.birthday}</p>
                        <p>{user.memorial_date}</p>
                        <img src={user.second_photo} />
                        <p>{user.story}</p>
                    </>
                }
                <button>Connect</button>
            </div>
        </div>
    )
}
export default UserDetails