import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing } from '../../firebase/firebaseServise';
import { updateFollowedUserFollowers } from '../../firebase/firebaseServise';

const ProfileUser = ({ profileDocId, username, profileId, userId, loggedInUserDocId, profileImage }) => {
    const [ followed, setFollowed ] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

        await updateFollowedUserFollowers(profileDocId, userId, false);
    }
    console.log(profileImage)
    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <div className="w-8 h-8">
                    <img
                        className="rounded-full w-full h-full"
                        src={profileImage}
                        alt=""
                    />
                </div>
                <Link className="ml-5" to={`/${username}`}>
                    <p className="font-bold text-sm ">{ username }</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-xs font-bold text-blue-medium bg-blue-500 rounded text-white w-20 h-8"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : (
        null
    )
};

export default ProfileUser;