import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../Listeners/UserListener';
import { isUserFollowingProfile, toggleFollow } from '../../firebase/firebaseServise';

const Header = ({
    user: currentUser,
    photosCount,
    followerCount,
    setFollowerCount,
    profile: {
        docId: profileDocId,
        userId: profileUserId,
        followers,
        following,
        username: profileUsername,
        avatarSrc
    }
    }) => {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                {avatarSrc ? (
                    <img
                    className="rounded-full h-40 w-40 flex"
                    alt={`${profileUsername} profilePicture`}
                    src={avatarSrc}
                    />
                ) : (
                    <Skeleton count={1} width={160} height={160}/>
                )}

            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4 flex flex-col">
                        {profileUsername}
                    </p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                        ) : (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">
                                        { photosCount }
                                    </span>
                                    {` `}
                                    posts
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">
                                        { followerCount }
                                    </span>
                                    {` `}
                                    {followerCount === 1 ? `follower` : `followers`}
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">
                                        { following.length }
                                    </span>
                                    {` `}
                                    following
                                </p>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Header;