import { useEffect, useState, useContext } from 'react';
import { getPhotos, getUserByUserId } from '../firebase/firebaseServise';
import UserContext from '../components/UserProfile/userStatus';

export default function PhotosListener() {
    const [ photos, setPhotos ] = useState(null);
    const {
        user: { uid: userId = "" }
    } = useContext(UserContext);

    useEffect(() => {
        async function getTimeLinePhotos() {
            const [ user ] = await getUserByUserId(userId);
            let followedUserPhotos = [];
            if (user.following.length > 0) {
                followedUserPhotos = await getPhotos(userId, user.following);
            }

            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        getTimeLinePhotos();
    }, [userId])

    return { photos }
}