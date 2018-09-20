import fin1 from './../assets/projects/finitely/finite.ly.1.png';
import fin2 from './../assets/projects/finitely/finite.ly.2.png';


export default [
  {
    title: `Finite.ly`,
    links: {
      github: ``,
      hosted: `http://finite.ly`,
      gitlab: `https://gitlab.com/Bradack/finite.ly`
    },
    technologies: [
      `React`,
      `Redux`,
      `Socket.io`,
      `PostgresSQL`,
      `Node.js`
    ],
    images: [
      fin1,
      fin2,
    ],
    description: `Finite.ly is a (count down) timer web application with an emphasis towards power users, with gamers being the most likely demographic. It functions as a single page website with an emphasis on being an interactive web application. The frontend is designed with the React framework while a Socket.IO interface connects it to a Node.js backend supported by a PostgreSQL server running off of AWS's relational database service.`,
    notes: `Finite.ly is a project I first had brief thoughts of years ago when looking for a program that could gracefully handle multiple timers at once. It grew with the idea of offering an application that could not only manage a number of simultaneous timers gracefully to also aiming to provide support and functionality for cyclic occurances, most of all those that don't align with a 24-hour schedule. I have plans of moving the application into the React Native area as well, targetting mobile and, if possible, desktop clients.`
  },

  {
    title: `Caldendesk/Coolendesk`,
    links: {
      github: ``,
      hosted: ``,
      gitlab: ``
    },
    technologies: [
      `React Native`,
      `Node.js`,
      `PostgresSQL`,
      `Git`
    ],
    images: [
      ``
    ],
    description: `Calendesk (I don't think we ever settled on a final name we were all happy with) was a group project developed while at DevMountain with a team of three other growing developers. Calendesk was aimed to provide, effectively, a mixture of trello-style 'card' organization that was, itself, organized onto a daily schedule calender. The primary focus of this project was learning and implementing React native and learning to work as a team both socially and through practicing further with Git and project organization. The backend was a lightweight Node.js server `,
    notes: `This thing was definitely an adventure... Of the five groups my cohort split into four decided to make React Native apps and I am proud to say that of those four our group was the only one to stick through to the end and develop a presentable project. I'm very thankful to my teammates for sticking through it despite how rough it was at times, both those that had the enthusiasm to and determination to make it work and those that were patient enough to keep with it when things looked unlikely. Learning the dev tools of CRNA, Expo, and the Android Studio wasn't nearly as easy as I had expected.`
  },

  // {
  //   title: ``,
  //   links: {
  //     github: ``,
  //     hosted: ``,
  //     gitlab: ``
  //   },
  //   technologies: [
  //     ``
  //   ],
  //   images: [
  //     ``
  //   ],
  //   description: ``,
  //   notes: ``
  // },
]



