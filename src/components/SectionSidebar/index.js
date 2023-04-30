import React from 'react';
import useUser from '../../Listeners/UserListener';
import Suggestions from './FollowingUsers';
import User from './User';
import '../../Models/style.css'

const Sidebar = () => {
    const { user: { docId, username, userId, following, avatarSrc } } = useUser();


    return (
        <div className="p-5">
            <User username={username} avatarSrc={avatarSrc}/>
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </div>
    );
};

export default Sidebar;