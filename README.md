# Online Connect 4 <img src="https://i.imgur.com/t5az9Me.png" align="right" width="12%">

Play Connect 4 online with friends

## Features
* Users can have private 1v1 matches with other users by creating or joining a room.
* The User can exchange messages via chat once they are connected.
* Users can play connect 4 locally without connecting to a room.

## Instructions

### Creating a room
To create a room, first give yourself a username (if this is null, then it will default to 'Guest'), and click `Create Room`.

This will generate a room with an unique ID, to invite another user, simply give them the ID.

### Joining a room
To join a existing room, first give yourself a username (if this is null, then it will default to 'Guest'), enter the room ID that is given to you, and click `Join Room`.

If the room exists and it is not full, you will be allow in.

### Staring a match
To start a match, once the room has hit capacity (2 players), the game will automatically starts, whoever goes first will be yellow and the other will be red.
The game will end once a winner is found.

### Leaving a match
To leave, simply click the `Leave Room` button or refresh the page. This will automatically disconnect you from the room and route you back to the homepage. Please keep in mind that this will also disconnect the other user as well. The match will also end if you leave midgame.

## Website

### Frontend
https://connect4-41333.web.app/

Built using React and SASS

### Backend
https://charptr0-connect-4-backend.herokuapp.com/

Built using Express and Socket.io

## Screenshots
![image](https://user-images.githubusercontent.com/70610982/186554273-128e6561-b352-4198-88e2-9972ee66bb38.png)

![image](https://user-images.githubusercontent.com/70610982/186554320-c76259c4-ae9b-4890-aa1b-9d3bde649cbf.png)

![image](https://user-images.githubusercontent.com/70610982/186554364-b73c827f-a0f4-495e-bd8c-324394a53809.png)
