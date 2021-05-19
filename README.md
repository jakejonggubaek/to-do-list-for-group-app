<h1 align="center">Team Project Manager</h1>
<p align="center"><strong>Make a to-do-list and share it with your team mates.</strong>
</p>
<br/>

<h2>About</h2>
Single page web application built with HTML, SASS, JavaScript, React, Node.js, MongoDB, Socket.io.<br/>
LIVE DEMO :https://team-to-do-manager.netlify.app
SERVER REPO(MongoDB):https://github.com/jakejonggubaek/to-do-list-for-group-app-server
SERVER REPO(Socket.io):https://github.com/jakejonggubaek/real-time-chat-socket.io/tree/master
<br/>

<h2>Purpose</h2>
This application allows users to create a private room which provides to-do-list, real time chat, and personal note so that users can
manage team project with their teammates. 
<br/>

<h2>Key features</h2>
<ul>
<li>Create Page</li>
<li>Share Page</li>
<li>Name & Password Page</li>
<li>Main Page</li>
</ul>

<br/>

<h2>Create Page</h2>
<img src="./src/assets/toDo1.png" alt="screen shot of Create page">
<p>1. Team Name: User can set the name of the room</p>
<p>2. Password: User can set password in order to make it more secure.</p>


<h2>Share Page </h2>
<img src="./src/assets/toDo2.png" alt="screen shot of Share page">
<p>1. URL container: URL has unique key.</p>
<p>2. Copy URL: Copy button so user can share it easier.</p>
<p>3. Go to your room: User can enter the room which was just created.</p>
<br/>

<h2>Name & Password Page </h2>
<img src="./src/assets/toDo3.png" alt="screen shot of Name & Password Page">
<p>1. Name: User who wants to enter the room has to set up name.</p>
<p>2. Password: User need to type correct password if the creator set up password for the room.</p>
<br/>

<h2>Main Page </h2>
<img src="./src/assets/toDo4.png" alt="screen shot of Main Page">
<p>1. Chat section: Users can have a real time chat here. - the data (connections, disconnections, and messages) are transferred through socket.io(built in server-side with node'js / express.js)</p>
<p>2. To-do-list section: Anyone can add / delete to-do-list. When all the lists are completed, users can see 'complete' sign. - the data (name of each list & status of each list) are transferred to/from MongoDB through mongoose(built in server-side with node'js / express.js)</p>
<p>3. Personal note section: User can type personal task on this section which is not share with other team mates. - the contents typed here are stored in local storage.</p>
<br/>


<h2>Features to be added in the future</h2>
<p>Scheduler</p>
<p>Reminder</p>

<h2>Copyright</h2>
This project is licensed under the terms of the MIT license.