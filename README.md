# **Wassup! Mobile Chat App**

<img src="https://res.cloudinary.com/ds9nzjduw/image/upload/c_scale,w_985/v1660265880/CareeerFoundry%20Cuourse/Screen_Shot_2022-08-12_at_10.57.10_am_l0fa7l.png">

A mobile chat app built using React Native. It provide users with a chat interface and options to share images and their location.
<br />
<br>

## **User Stories**

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.
  <br></br>

---

<br/>

## **Project Dependencies**

- React-Native
- Expo
- Javascript
- Firebase
- Gifted Chat
- React-Lottie LottieIOS
- UUID

<br/>

## **Key Features**

- A page where users can enter their name and choose a background pattern for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

<br/>

## **Project Requirements**

- React-Native and Expo dev environment
- Users authenticated anonymously with Firebase.
- Conversations stored in the Firestore Database.
- Chat functionality with the Gifted Chat library.
- Chats stored offline
- Share images form users device library and live photos
- Send location in a map view

<br/>

## **Installation**

### Prerequesites

- Node.js and npm
- Android Studio or Xcode for iOS
- Expo
- Firebase

<br>

### Getting **Started**<br>

1. Install <a href="https://expo.io/">Expo:</a>

```bash
npm install expo-cli --global
```

2. Download the Expo App to your Device
3. Create an Expo account <a href="https://expo.io/signup">here</a>
4. Install Simulator for <a href="https://developer.apple.com/xcode/">MAC</a> or <a href="https://developer.android.com/studio">Android</a>
5. Clone repo

```bash
git clone https://github.com/simon3073/wassup_webchat.git
```

6.  Navigate to root folder via CLI
7.  Install required packages in package.json

```bash
npm i
```

8.  Run app locally

```bash
npm start
```

9. Select an option to view (Web, iOS/Android Emulator, or QR Code to use on Expo App)

<br>

**Setting up and Connecting to a Firebase Database**

1. Sign in to <a href="https://console.firebase.google.com/">Google Firebase</a> and select 'Add Project'
2. Once you have set up a new project, select **Firebase Database** from the options on the left under 'Build'
3. Select 'Start in Test Mode' (you dont have to specify rules yet), choose a region, then create a collection called 'messages'
   <img src="https://res.cloudinary.com/ds9nzjduw/image/upload/c_scale,w_673/v1660265182/CareeerFoundry%20Cuourse/firebase_messages_jzpvej.png">
4. To set up your authentication, go to Project Settings (the gear icon top-left of screen and then select the </> icon under Your apps
   <img src="https://res.cloudinary.com/ds9nzjduw/image/upload/c_scale,w_693/v1660265182/CareeerFoundry%20Cuourse/project_settings_nmjvtr.png">
5. Click Register to generate the configuration code

   <img src="https://res.cloudinary.com/ds9nzjduw/image/upload/c_scale,w_610/v1660265182/CareeerFoundry%20Cuourse/firestore_sdk_configuration_s1c33b.jpg">

6. Add this code to the firebaseDB.js file (replace the existing code)<br>
   _please note you will want to eventually add these values to an env file which is added to gitignore_

<br>
Setting up firebase Storage (for Images)

1. Sign in to <a href="https://console.firebase.google.com/">Google Firebase</a>
2. Select **Storage** from the options on the left under 'Build'
3. Click the Get Started button. This will open a popup asking you to set your cloud storage.
4. Keep everything on default and press Next, then Done.

<br/>

<br/>

---

<br/>
<h2 align="left"><i>Who am I?</i></h2>
<h3 align="left">I'm Simon Bertoli 👋 - an Old and New developer from Melbourne</h3>

- 🔭 I’m currently working on **my Full-Stack Web Development Program at Career Foundry**

- 🌱 I’m currently learning **React, Git, MongoDB**

- 👨‍💻 All of my projects are currently available at my <a href="https://github.com/simon3073" target="_blank">Github Homepage</a>, at <aand href="http://simonbertoli.com" target="_blank">simonbertoli.com</aand at <a href="https://codepen.io/simon3073" target="_blank">CodePen</a>

- 📫 How to reach me **simonbertoli@yahoo.com.au**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://codepen.io/simon3073" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codepen.svg" alt="@simon3073" height="30" width="40" /></a>
<a href="https://linkedin.com/in/simon-bertoli-5a73893" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="simon-bertoli-5a73893" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/</a<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/</a<a href="https://git-scm.com/" target="_blank" rel="noreferrer"<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/</a<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/</a<a href="https://www.adobe.com/in/products/illustrator.html" target="_blank" rel="noreferrer"<img src="https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" alt="illustrator" width="40" height="40"/</a<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/</a<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/</a<a href="https://nodejs.org" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/</a<a href="https://www.photoshop.com/en" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" alt="photoshop" width="40" height="40"/</a<a href="https://www.php.net" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40"/</a<a href="https://reactjs.org/" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/</a<a href="https://sass-lang.com" target="_blank" rel="noreferrer"<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/</a<a href="https://www.adobe.com/products/xd.html" target="_blank" rel="noreferrer"<img src="https://cdn.worldvectorlogo.com/logos/adobe-xd.svg" alt="xd" width="40" height="40"/</a<a href="https://zapier.com" target="_blank" rel="noreferrer"<img src="https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg" alt="zapier" width="40" height="40"/</a</p>
