import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../firebase/firebaseServise';
import SuggestedProfile from './ProfileUser';

const FollowingUsers = ({ userId, following, loggedInUserDocId }) => {
    const [ profiles, setProfiles ] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if(userId) {
            suggestedProfiles();
        }
    }, [userId])
    return !profiles ? (
        <Skeleton count={1} height={150}/>
    ) : profiles.length ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">

                </p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) =>
                    <SuggestedProfile
                        key={profile.docId}
                        profileImage={profile.avatarSrc}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                )}
            </div>
        </div>
    ) : null
};

export default FollowingUsers;