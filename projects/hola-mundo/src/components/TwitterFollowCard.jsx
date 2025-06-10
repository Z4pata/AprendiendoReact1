import { useState } from 'react';
import '../styles/TwitterFollowCard.css';


export function TwitterFollowCard({formatUserName, userName, name, initialIsFollowing = false}) {
    const imageSrc = `https://unavatar.io/${userName}`;

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const isFollowingText = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

    const handleClick = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img src={imageSrc} alt="Avatar" className='tw-followCard-avatar'/>
                <div className='tw-followCard-info'>
                    <strong className='tw-followCard-info-name'>{name}</strong>
                    <span className='tw-followCard-info-username'>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-button-text'>{isFollowingText}</span>
                    <span className='tw-followCard-button-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    );
}