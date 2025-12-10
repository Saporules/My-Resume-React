import React, { useRef } from 'react';
import './ResumeCover.scss';
import TechStack from '../TechStack/TechStack';
import SoftStack from '../SoftStack/SoftStack';
import Experience from '../Experience/Experience';

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
        
        <div className="cover-paragraph-wrapper">
          <p className="cover-paragraph">Seasoned <b>Front-End Developer</b> with 13+ years of experience transforming complex ideas into intuitive, high‑performance web applications. Expert in <b>JavaScript, Angular, and React</b>, with a proven record of modernizing enterprise systems and integrating <b>AI‑driven solutions</b> to accelerate development. Skilled at bridging design and engineering, delivering seamless <b>UI/UX experiences</b>, and thriving in Agile teams. Recognized for mentoring developers, guiding <b>cross‑functional collaboration</b>, and consistently delivering scalable solutions that empower businesses and delight users</p>
        </div>

        <TechStack data={data} />
        <SoftStack data={data} />
        <Experience data={data} />
      </div>
    </div>
  );
};

export default ResumeCover;

const profilePic = '/profile-pic.jpg';