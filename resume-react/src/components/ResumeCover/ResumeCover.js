import React, { useRef } from 'react';
import './ResumeCover.scss';

const ResumeCover = ({ data }) => {
  const titleRef = useRef(null);

  if (!data) {
    return null;
  }

  const { name, title, contact } = data;

  const handleMouseEnter = () => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.remove('returning');
    el.classList.add('shadowed');
  };

  const handleMouseLeave = () => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.remove('shadowed');
    el.classList.add('returning');
  };

  const handleAnimationEnd = (e) => {
    const el = titleRef.current;
    if (!el) return;
    if (e.animationName === 'shadow-in') {
      el.classList.remove('returning');
      el.classList.add('shadowed');
    }
    if (e.animationName === 'shadow-out') {
      el.classList.remove('returning');
      el.classList.remove('shadowed');
    }
  };

  return (
    <div className="resume-cover">
      <div className="cover-content">
        <h1
          ref={titleRef}
          className='cover-name shadow-dance-text'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onAnimationEnd={handleAnimationEnd}
        >
          {name}
        </h1>
        <p className='cover-fullname'>{data.fullname}</p>
        <h2 className='cover-position'>{title}</h2>
        <div className="contact-info">
            <p>{contact.location}</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a> 
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="hook-container" >
          <p className='hook-text hook-element'>{data.hook}</p>
          <div className="hook-element">
            <div className="hook-img-border">
              <img className='hook-img' src={profilePic} alt="Asaf Lopez still" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCover;

const profilePic = '/profile-pic.jpg';