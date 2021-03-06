import React, { Component } from 'react';
import  { Parallax } from 'react-parallax';
import { Link, Events, scrollSpy } from 'react-scroll';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Carousel from 'nuka-carousel';

import Project from './components/Project.js';

import './reset.css';
import './App.css';

import logo from './data/logos.js';
import NOTES from './data/notes.js';
import projects from './data/projectData.js';


import bgLanding from './assets/bgs/beach-clouds-dawn-754122.jpg';
import bgAbout from './assets/bgs/ocean_bg2.jpg';
import bgTechnologies from './assets/bgs/ocean-1845110_1920.jpg';
import bgProjects from './assets/bgs/aquarium-jellyfishes-underwater-20790.jpg';
import bgContacts from './assets/bgs/aquatic-beautiful-biology-920157.jpg';

const PARALLAX_STRENGTH = -200;
const SCROLL_DURATION = 300;

class App extends Component {
  constructor() {
    super();
    this.state = {
      techComment: '',
      showTechNotePopup: false,
      pageScrolling: '',
      navMenuDisplay: '',
      scrollLock: 'false',
    }
  }

  techNoteElement = null;

  componentDidMount() {
    this.techNoteElement = document.querySelector('tech-note-popup');
    /*------------------------------------------------------------------------------
    -----React-scroll setup---------------------------------------------------------
    ------------------------------------------------------------------------------*/
    Events.scrollEvent.register('begin');
    Events.scrollEvent.register('end');
    scrollSpy.update();
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  /*------------------------------------------------------------------------------
  -----Displays the fancy svg element divider for use in the Technologies area----
  ------------------------------------------------------------------------------*/
  renderDivider() {
    return (
      <div className='svg-divider'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 420 12' width= '100%'>
          <path className='svg-divider' d="M147.938.907c-4.691.385-24.52 4.58-130.563 5.062H-.219c3.122 0 5.79.025 8.781.031-2.99.01-5.66.031-8.78.031h17.593c131.84.599 130.217 7.197 132.406 4.438 4.552-3.467 10.301-4.096 14.469-4.438h.531c-.063 0-.123-.027-.187-.031.063 0 .124-.027.187-.031h-.531c-4.168-.342-9.917-.971-14.469-4.437-.428-.54-.702-.72-1.844-.625zm122.78 0c-.448.06-.651.265-.937.625-4.552 3.466-10.3 4.095-14.469 4.437h-.687c.113.01.228.023.344.031-.064 0-.125.027-.188.031h.531c4.168.342 9.917.971 14.47 4.438 2.188 2.759.566-3.84 132.406-4.438h17.593c-3.121 0-5.79-.025-8.781-.031 2.99-.01 5.66-.031 8.781-.031h-17.594C287.546 5.449 273.714.506 270.72.907zm-16.093 5.062h-.219c-.29-.017-.543-.021-.812-.031-4.576-.67-8.813-4.906-8.813-4.906-4.087 3.986-8.677 4.803-9.625 4.937h-.375s.16.028.188.031c-.028 0-.188.031-.188.031h.375c.948.135 5.538.952 9.625 4.938 0 0 4.257-4.25 8.844-4.906.259-.01.503-.015.781-.031-.073 0-.145-.026-.219-.031.146-.011.292-.028.438-.031zm-19.844.062L234.72 6l.062-.031h-.125c-9.914-4.936-14.918-4.937-24.875-4.937s-14.96 0-24.875 4.937h-.125l.063.031-.063.031h.125c9.914 4.935 14.919 4.938 24.875 4.938 9.957 0 14.962 0 24.875-4.938zm-50 0s-.16-.028-.187-.031c.028 0 .187-.031.187-.031h-.375c-.948-.135-5.537-.952-9.625-4.937 0 0-4.236 4.235-8.812 4.906-.27.01-.522.014-.813.03.074 0 .146.027.219.032-.073.01-.145.028-.219.03.278.017.522.022.781.032 4.588.656 8.844 4.906 8.844 4.906 4.088-3.986 8.677-4.803 9.625-4.937h.375z"/>
        </svg>
      </div>
    )
  }

  /*------------------------------------------------------------------------------
  -----Handles the logic for displaying the popups for the Technologies area------
  ------------------------------------------------------------------------------*/
  selectTechnology(e, note) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      techComment: note,
      showTechNotePopup: true,
      scrollLock: true,
    })
    disableBodyScroll(this.techNoteElement, {reserveScrollBarGap: true});
  }
  
  closePopup() {
    this.setState({
      techComment: '',
      showTechNotePopup: false
    })
    enableBodyScroll(this.techNoteElement)
  }

  /*------------------------------------------------------------------------------
  -----Renders the popup to display notes in the Technologies area----------------
  ------------------------------------------------------------------------------*/
  showTechNotePopup() {
    if(this.state.showTechNotePopup) {
      return (
        <div className='technologies-note-popup technologies-theme' id='tech-note-popup' onClick={() => this.closePopup()}>
          <div className='technologies-note-popup-card card'>
            {this.state.techComment}
          </div>
        </div>
      )
    }
  }


  /*------------------------------------------------------------------------------
  -----Handles the css animations of opening and closing the menu-----------------
  ------------------------------------------------------------------------------*/
  toggleNavMenu() {
    if(this.state.navMenuDisplay !== 'nav-slide-in') {
      this.setState({navMenuDisplay: 'nav-slide-in'});
    } else {
      this.setState({navMenuDisplay: 'nav-slide-out'});
    }
  }

  displayNavMenuItem(str) {
    return (
      <div style={{width: '100%'}} onClick={() => this.toggleNavMenu()}>
        <div className='nav-menu-link-fade'>
          <div/><div/><div/>
        </div>
        <div className='nav-menu-link-main'>
          {str}
        </div>
      </div>
    )
  }

  /*------------------------------------------------------------------------------
  -----Generates the list of project components to be fed into the carousel-------
  ------------------------------------------------------------------------------*/
  generateProjectList() {
    let formattedProjects = [];
    projects.forEach((project, index) => {
      formattedProjects.push((
        <Project project={project} key={index}/>
      ))
    });

    return formattedProjects;
  }


  render() {
    return (
      <div
        className='main'
        style={{
          overflow: this.state.scrollLock ? 'hidden' : 'scroll'
        }}>

        {this.showTechNotePopup()}

        {/*-----------------------------------------------------------------------------
        -----NAVIGATION MENU------------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <div className='nav-menu-container'>
          <div className='nav-menu-icon' onClick={() => this.toggleNavMenu()}>
            &#9776;
          </div>

          <div className='nav-menu-links'>

            <Link className={`nav-menu-link landing-theme ${this.state.navMenuDisplay}`} to='landing' spy={true} smooth={true} duration={SCROLL_DURATION}>
              {this.displayNavMenuItem('Landing')}
            </Link>
            <Link className={`nav-menu-link about-theme ${this.state.navMenuDisplay}`} to='about' spy={true} smooth={true} duration={SCROLL_DURATION}>
              {this.displayNavMenuItem('About')}
            </Link>
            <Link className={`nav-menu-link technologies-theme ${this.state.navMenuDisplay}`} to='technologies' spy={true} smooth={true} duration={SCROLL_DURATION}>
              {this.displayNavMenuItem('Technologies')}
            </Link>
            <Link className={`nav-menu-link projects-theme ${this.state.navMenuDisplay}`} to='projects' spy={true} smooth={true} duration={SCROLL_DURATION}>
              {this.displayNavMenuItem('Projects')}
            </Link>
            <Link className={`nav-menu-link contacts-theme ${this.state.navMenuDisplay}`} to='contacts' spy={true} smooth={true} duration={SCROLL_DURATION}>
              {this.displayNavMenuItem('Contacts')}
            </Link>
          </div>
        </div>

        {/*-----------------------------------------------------------------------------
        -----PAGE LANDING---------------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Parallax
          strength={PARALLAX_STRENGTH}
          bgImage={bgLanding}>

          <div className='section landing-contents landing-theme' id='landing'>
            <div className='landing-title card'>
              <h1>Bradack Barnard</h1>
              <h4>Full-Stack Web Developer</h4>
            </div>
          </div>

        </Parallax>
        
        <div className='blur-border'>
          <div />
        </div>
        
        {/*-----------------------------------------------------------------------------
        -----ABOUT SECTION--------------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Parallax
          strength={PARALLAX_STRENGTH}
          bgImage={bgAbout}>

          <div className='section about-theme' id='about'>
            <div className='section-title card'>
              <h2>ABOUT</h2>
            </div>
            <div className='about-contents section-contents card'>
              <h5>Salutations!</h5>
              <p>I'll give you the benefit of the doubt that you already saw my name above. Blowing my own horn and talking about myself has never been a strong point of mine but here goes!</p>
              <p>I have been a huge fan of computers from a young age, everything about them from software to hardware has awed me and held a certain addictive quality. A high school course in QBasic assured me that I had both the mindset for it and, more importantly, loved programming. Meanwhile a course in maintenance lead me to an appreciation towards hardware and troubleshooting; things that have proved to be invaluable skills for this day and age. Despite A+ and Net+ certification, however, the bulk of my passion has always rested in the coding side of computer systems.</p>
              <p>I find comfort in the languages' syntax, the structures, the absolute qualities of it all. People often find frustration in how computers work, often accusing them of being wrong, while I have always found fascination in how they almost faultlessly do exactly as they are told. Sometimes we just have to figure out exactly what we, or someone else, has told it to do. The problem solving, the puzzles and the struggles, the abstract models and ideas, the fact that there is always something more to learn... All of it makes programming such an enjoyable activity and provides so many wonderful challenges and room for growth.</p>
            </div>
          </div>

        </Parallax>
        
        <div className='blur-border'>
          <div />
        </div>

        {/*-----------------------------------------------------------------------------
        -----TECHNOLOGIES SECTION-------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Parallax
          strength={PARALLAX_STRENGTH}
          bgImage={bgTechnologies}>

          <div className='section technologies-theme disable-selection' id='technologies'>
            
            <div className='section-title card'>
              <h2>TECHNOLOGIES</h2>
            </div>
            <div className='section-contents technologies-contents'>
              
              <div className={`technologies-groups`}>
            {/*-----------------------------------------------------------------------------
            -----FRONTEND TECHNOLOGIES CARD-------------------------------------------------
            ------------------------------------------------------------------------------*/}
                <div className='technologies-group card'>
                  <div className='technologies-row'>
                    <img src={logo.html} alt='HTML5' onClick={e => this.selectTechnology(e, NOTES.HTML)} />
                    <img src={logo.css} alt='CSS3' onClick={e => this.selectTechnology(e, NOTES.CSS)} />
                    <img src={logo.js} alt='Javascript' onClick={e => this.selectTechnology(e, NOTES.JS)} />
                  </div>

                  <div className='technologies-row'>
                    <img src={logo.react} alt='React' onClick={e => this.selectTechnology(e, NOTES.REACT)} />
                    <img src={logo.redux} alt='Redux' onClick={e => this.selectTechnology(e, NOTES.REDUX)} />
                    <img src={logo.android} alt='React Native' onClick={e => this.selectTechnology(e, NOTES.RN)} />
                  </div>

                  {this.renderDivider()}
                  <h5>Frontend</h5>

                </div>
            {/*-----------------------------------------------------------------------------
            -----BACKEND TECHNOLOGIES CARD--------------------------------------------------
            ------------------------------------------------------------------------------*/}
                <div className='technologies-group card'>

                  <div className='technologies-row'>
                    <img src={logo.postgressql} alt='PostgreSQL' onClick={e => this.selectTechnology(e, NOTES.SQL)} />
                    <img src={logo.aws} alt='Amazon Web Services' onClick={e => this.selectTechnology(e, NOTES.AWS)} />
                    <img src={logo.auth} alt='Auth 0' onClick={e => this.selectTechnology(e, NOTES.AUTH0)} />
                  </div>

                  <div className='technologies-row'>
                    <div style={{background: '#202020', borderRadius:'5px', width: '100%', height: '100%'}} onClick={e => this.selectTechnology(e, NOTES.NODE)} >
                      <img src={logo.nodejs} alt='Node J S' style={{padding: '2px'}}/>
                    </div>
                    <div style={{
                        borderRadius: '100px',
                        overflow: 'hidden'}}
                        onClick={e => this.selectTechnology(e, NOTES.JWT)}>
                      <img src={logo.jwt} alt='J W T' style={{height:'auto', width:'180%', maxWidth: 'none', maxHeight: 'none'}} />
                    </div>
                    <img src={logo.socketio} alt='Socket I O' onClick={e => this.selectTechnology(e, NOTES.SIO)} />
                  </div>

                  {this.renderDivider()}
                  <h5>Backend</h5>
                  
                </div>
            {/*-----------------------------------------------------------------------------
            -----TOOLS TECHNOLOGIES CARD----------------------------------------------------
            ------------------------------------------------------------------------------*/}
                <div className='technologies-group card'>
                  <div className='technologies-row'>
                    <img src={logo.vscode} alt='V S Code' onClick={e => this.selectTechnology(e, NOTES.VSC)} />
                    <img src={logo.postman} alt='Postman' onClick={e => this.selectTechnology(e, NOTES.POSTMAN)} />
                  </div>
                  <div className='technologies-row'>
                    <img src={logo.github} alt='GitHub' onClick={e => this.selectTechnology(e, NOTES.GITHUB)} />
                    <img src={logo.git} alt='Git' onClick={e => this.selectTechnology(e, NOTES.GIT)} />
                    <img src={logo.gitlab} alt='GitLab' onClick={e => this.selectTechnology(e, NOTES.GITLAB)} />
                  </div>
                  <div className='technologies-row'>
                    <img src={logo.windows} alt='Windows' onClick={e => this.selectTechnology(e, NOTES.WIN)} />
                    <img src={logo.ubuntu} alt='Ubuntu' onClick={e => this.selectTechnology(e, NOTES.UBUNTU)} />
                  </div>
                  {this.renderDivider()}
                  <h5>Tools</h5>
                </div>
              </div>

              <div className='technologies-comment card'>
                Hey there! Curious for more? Click on any of the technologies above for some (very) informal musings and opinions just based off my experiences.
              </div>
            </div>
          </div>
        </Parallax>
        
        <div className='blur-border'>
          <div />
        </div>

        {/*-----------------------------------------------------------------------------
        -----PROJECTS SECTION-----------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Parallax
          strength={PARALLAX_STRENGTH}
          bgImage={bgProjects}>

          <div className='section projects-theme' id='projects'>
            <div className='section-title card'>
              <h2>PROJECTS</h2>
            </div>
            <div className='projects-contents section-contents'>
              <Carousel
              // framePadding={'10px'}
              // transitionMode={'fade'}
              slidesToShow={1}
              renderTopLeftControls={({previousSlide}) => (
                <button className='carousel-button carousel-button-project' onClick={previousSlide}>Prev</button>
              )}
              renderTopRightControls={({nextSlide}) => (
                <button className='carousel-button carousel-button-project' onClick={nextSlide}>Next</button>
              )}
              renderBottomCenterControls={() => null}
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
              // autoplay={true}
              // wrapAround={true} 
              dragging={true}
              swiping={true}
              >
                {this.generateProjectList()}
              </Carousel>
              {/* <Project project={projects[0]}/> */}
            </div>
          </div>

        </Parallax>
        
        <div className='blur-border'>
          <div />
        </div>

        {/*-----------------------------------------------------------------------------
        -----CONTACTS SECTION-----------------------------------------------------------
        ------------------------------------------------------------------------------*/}
        <Parallax
          strength={PARALLAX_STRENGTH}
          bgImage={bgContacts}>

          <div className='section contacts-theme' id='contacts'>
            <div className='section-title card'>
              <h2>CONTACTS & LINKS</h2>
            </div>
            <div className='contacts-contents section-content'>
              <div className='contacts-main-card card'>
                <div className='contacts-column'>
                  <h6>Phone:</h6>
                  <h6><a href='tel:801-901-0427'>(801) 901-0427</a></h6>
                  <br />
                  <h6>Email:</h6>
                  <h6><a href='mailto:Bradack.Barnard@gmail.com'>Bradack.Barnard@gmail.com</a></h6>
                </div>
                <div className='contacts-column'>
                  <h6>LinkedIn:</h6>
                  <h6><a href='https://www.linkedin.com/in/BradackBarnard/'>BradackBarnard</a></h6>
                  <br />
                  <h6>GitHUB:</h6>
                  <h6><a href='https://www.github.com/Bradack'>Bradack</a></h6>
                </div>
              </div>
            </div>
          </div>
          
        </Parallax>

      </div>
    )
  }
}



export default App;
