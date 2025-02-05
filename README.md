# UnifyGiving Front End app

<p>This front end app is built with React Native and Expo to access Node.js api and a React admin dashboard web app.</p>
<br />

<!-- TABLE OF CONTENTS -->

## Table of Contents
<ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#git-flow-for-collaborators">Git Flow for Collaborators</a></li>
    <li><a href="#folders-and-files">Folders and Files</a></li>
</ol>
<br />

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With:

  * Frameworks
    * React Native
    * Expo
  * UI library
    * React-Native-Paper (https://callstack.github.io/react-native-paper/)
    * React-Native-Elements (https://reactnativeelements.com/docs) - As backup if additional materials needed.


<a href="#unifygiving-v1-front-end-app">( back to top )</a>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- git
- npm

<!-- INSTALLATION & SETUP -->

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/unifygiving/mobile-app.git
   ```
2. Install NPM packages
   ```sh
   npx expo install --npm
   ```
3. If there are any errors
   ```sh
   npx expo install --npm -- --force
   ```
   <br />

### Using Expo to run local code in the emulator
   
1. In the same terminal and directory, start the expo app using the command
   ```sh
   npx expo start
   ```
2. To start the app in android
   ```sh
   npx expo start --android
   ```
   or press "a" when expo is started and you see the QR code.
3. To start the app in IOS, press "i" after expo has started and you see the QR code.
4.  To refresh the app at any time, press "r" in the terminal.
5.  To stop the app and terminate the expo server, press "ctrl + c" on Windows or "cmd + c" on Mac.

You can test via a emulator on your pc, Visual Studio has one, or on Android Studio.
You can also test via the Expo Go app on your phone. It will communicate with the terminal server and start it for you when you run npx expo start.

As you make changes to your code and you have the expo server running, it should automatically refresh the app. 
   
<a href="#unifygiving-v1-front-end-app">( back to top )</a>

## Git Flow for Collaborators

- Upon onboarding, you'll receive access to our Trello board and Unify Giving GitHub repository. To start work, you can just navigate to the Trello board. The columns are as follows:
      <br/>
      
  1. Backlog: Contains tickets needing further details.
  2. Ready to be worked on: Tasks ready for assignment.
  3. In progress: Currently active tasks.
  4. To review: For PR submissions.
  5. Done: Approved and merged tasks.
  6. Wait for the reviewer to review your code. If everything looks fine, the reviewer will merge the pull request on GitHub, and delete your branch on GitHub. Then on your machine, you can switch back to your main branch, and delete the branch you were working on since it has been accepted and merged.
  7. If the reviewer wants you to make changes to your pull request, watch this short video for an example of how to do code reviews on GitHub https://www.youtube.com/watch?v=UpBpb0j7IKA.
     <br/>
     
- Assign yourself from 'Ready to be worked on', move to 'To review' after PR submission, and then to 'Done' upon approval. Let's collaborate efficiently! 
    <br/>
    
** For Android testing: To test, Visual Studios or Visual Studio Code provides a built-in emulator. Android Studio can be downloaded for another option that provides an emulator and a coding space.<br/>
** For IOS testing: If you have a MAC, you can download xCode to test IOS. 

<a href="#unifygiving-v1-front-end-app">( back to top )</a>

## Folders and Files
* The `.vs` folder
* The `android` folder
* The `assets` folder contains all the icons, logos and images used in the app.
* The `server-backend` folder
* The `src` folder contains the `areas` and `components` folders.
  * The `areas` folder contains the following folders:
    * `charity-screens`
    * `donor-screens`
    * `onboarding`
    * `recipient-screens`
  * The `components` folder contains the following:
    * `core` folder
    * `Colours.js`
    * `DonorRoutes.js`
    * `NavigationRoutes.js`
    * `index.ts`  

<a href="#unifygiving-v1-front-end-app">( back to top )</a>

