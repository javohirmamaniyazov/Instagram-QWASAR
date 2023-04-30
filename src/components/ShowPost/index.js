import React, { useState, useEffect, useRef } from 'react';
import Actions from './Actions';
import Header from './Header';
import Image from './Image';
import Footer from './Footer';
import Comments from './Comments';
import '../../App.css';

const Post = ({ content }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    return (
        <div className={`App_${theme}`}>
            <div className="rounded col-span-4  mb-16">
                <Header username={content.username} avatarSrc={content.avatarSrc} />
                <Image src={content.imageSrc} caption={content.caption} />
                <Actions
                    docId={content.docId}
                    totalLikes={content.likes.length}
                    likedPhoto={content.userLikedPhoto}
                    handleFocus={handleFocus}
                />
                <Footer caption={content.caption} username={content.username} />
                <Comments
                    docId={content.docId}
                    comments={content.comments}
                    posted={content.dateCreated}
                    commentInput={commentInput}
                />
            </div>
        </div>
    );
};

export default Post;