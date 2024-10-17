import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation content for different languages
const resources = {
  en: {
    translation: {
      title: 'Full Stack Developer',
      login: 'Admin Login',
      contact: 'Contact',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'Email',
      send: 'Send',
      cancel: 'Cancel',
      name: 'Name',
      password: 'Password',
      resume: 'Resume',
      send_resume: 'Recieve resume',
      about: 'About',
      skills: 'Skills', 
      experience: 'Experience',
      intro: "Hello, I'm passionate about building efficient, scalable web and mobile applications.With expertise in ReactJS, NodeJS, and modern web technologiesI love at solving complex challenges and delivering highperformance solutions in Agile environments.Let's collaborate and make an impact together!"
    },
  },
  de: {
    translation: {
      title: 'Fullstack-Entwickler',
      login: 'Admin-Anmeldung',
      contact: 'Kontakt',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'E-Mail',
      ssend: 'Senden',
      cancel: 'Abbrechen',
      name: 'Name',
      password: 'Passwort',
      resume: 'Lebenslauf',
      send_resume: 'Lebenslauf erhalten',
      about: 'Über',
      skills: 'Fähigkeiten', 
      experience: 'Erfahrung',
      intro: "Hallo, ich bin leidenschaftlich daran interessiert, effiziente und skalierbare Web- und Mobile-Anwendungen zu entwickeln. Mit Erfahrung in ReactJS, NodeJS und modernen Webtechnologien löse ich gerne komplexe Herausforderungen und liefere leistungsstarke Lösungen in agilen Umgebungen. Lassen Sie uns zusammenarbeiten und etwas bewirken!"
    },
  },
  fr: {
    translation: {
      title: 'Développeur Full Stack',
      login: 'Login Admin',
      contact: 'Contact',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      email: 'Email',
      send: 'Envoyer',
      cancel: 'Annuler',
      name: 'Nom',
      password:'Mot de passe',
      resume: 'CV',
      send_resume: 'Recevoir le CV',
      about: 'A propos',
      skills: 'Compétences', 
      experience: 'Expérience',
      intro : "Bonjour, je suis passionné par le développement d'applications web et mobiles efficaces et évolutives. Expert en ReactJS, NodeJS et technologies web modernes, j'aime résoudre des défis complexes et fournir des solutions performantes dans des environnements Agile. Collaborons pour avoir un impact ensemble !"

      
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
