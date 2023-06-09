import React, { useEffect, useState, useContext } from "react";
import { deletePhotoByDocId, getPhotosByPhotoId, getUserByUserId } from "../../firebase/firebaseServise";
import CloseSvg from "../NewPost/Close";
import Skeleton from 'react-loading-skeleton';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from '../../firebase/firebase';
import Menu from './Menu';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import UserPhotoModalComments from "./UserPhotoModalComments";
import "./style.css";
import FooterModal from "./Footer";
import UserContext from './userStatus';
import UserPhotoModalPost from './UserPhotoModalPost';
import { UserProfileContext } from './UserProfile';

const UserPhotoModal = ({ showModal, setShowModal, photo }) => {
    const { user: currentUser } = useContext(UserContext);
    const { getProfileInfoAndPhotos } = useContext(UserProfileContext);
    const [ post, setPost ] = useState();
    const [ user, setUser ] = useState({});
    const [ modalPost, setModalPost ] = useState(false);

    const getPhotoInformation = async () => {
        const result = await getPhotosByPhotoId(currentUser.uid, photo.photoId);
        setPost(result);
    }

    const getCurrentUser = async () => {
      if(photo.userId) {
        const [ result ] = await getUserByUserId(photo.userId);
        setUser(result);
      }
    }

    const deletePost = async () => {
      await deletePhotoByDocId(photo.docId);
      const storageRef = storage.refFromURL(photo.imageSrc);
      const fullPath = storageRef.fullPath;

      const storageImage = getStorage();
      const desertRef = ref(storageImage, fullPath);

      deleteObject(desertRef).then(() => {
          alert("Success");
      }).catch((error) => {
          alert(error.message);
      });
      setModalPost(false);
      setShowModal(false);
      getProfileInfoAndPhotos();
    }


    useEffect(() => {
        getCurrentUser();
        if(photo.photoId) {
          getPhotoInformation();
        }
    }, [photo.userId]);

    return (
        <>
          {showModal ? (
            <>
                <RemoveScrollBar />
                {modalPost && (<UserPhotoModalPost setShowModal={setModalPost} deletePost={deletePost}/>)}
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div
                      onClick={() => setShowModal(false)}
                      style={{zIndex: 10000}}
                      className="absolute top-5 right-5 cursor-pointer"
                      >
                      <CloseSvg/>
                  </div>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div
                    className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"

                  >
                    <div className="flex">
                      <div>
                        {photo.imageSrc ? (
                          <img
                          src={photo.imageSrc}
                          alt={""}
                        />
                        ) : (
                          <Skeleton count={1} height={750} width={540}/>
                        )}

                      </div>
                      <div className="px-4 py-2 relative"
                        style={{width: "600px"}}
                      >
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center pb-2 mt-1 border-b">
                                <div className="flex items-center">
                                    <div className="w-10">
                                        <img
                                            className="rounded-full cursor-pointer w-full flex mr-3"
                                            src={"/images/avatars/default.png"}
                                            alt={""}
                                        />
                                    </div>
                                    <div>
                                        <span className="ml-4">
                                            { user.username }
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-10"
                                >
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => setModalPost(true)}
                                  >
                                    <Menu/>
                                  </div>
                                </div>
                            </div>
                            <div className="mt-2 overflow-auto max-h-96">
                              {post && (
                                <UserPhotoModalComments photo={post} setShowModal={setShowModal}/>
                              )}
                            </div>
                            <div className="w-full absolute bottom-0 left-0">
                              {post && (
                                <FooterModal post={post} setPost={setPost}/>
                              )}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      );
}

export default UserPhotoModal;