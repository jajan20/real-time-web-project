# real-time-web-project

## NS Delays

This app will give users more insights on the status of the train transportation. By combining the API provided by the NS and adding socket.io for real-time feedback users are able to check the status of the trains they need to take but can also add missing information. This information is directly available to all other users so they can act accordingly 

## Preview
![](https://raw.githubusercontent.com/jajan20/real-time-web/master/week_02/_assets/images/screenshots.png)

## Instructions
When you're experiencing a delay you can fill in three values:

- starting station
- ending station
- message(reason for delay)

Once you press the submit button the values are pushed inside an array together with a timestamp. Since it's real-time you and every other user will be able to see the delay directly.

## Table of contents

- [Instructions](#instructions)
- [Data](#data)
- [Life Cycle](#life-cycle)
- [Events](#events)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Features](#features)
- [Todo](#todo)
- [Wishlist](#wishlist)
- [Sources](#sources)
- [Roadmap](#roadmap)
- [Assignment Requirements](#assignment-requirements)

## Data
The user is able to input data which in turn is stored locally on the server. While the server is running every user that joins the app gets to see all the delays added by other users on top of the delays already added by the NS-API.

![](https://raw.githubusercontent.com/jajan20/real-time-web/master/week_02/_assets/images/datavisual.png)

## Life Cycle
![](https://raw.githubusercontent.com/jajan20/real-time-web/master/week_02/_assets/images/lifecycle.png)

## Events
When a user inputs data, we need to send it to the server and empty the input fields. Doing this without refreshing is where socket.io comes in handy. A custom event **delay** where I prevent the submit button from refreshing, adding a new date object so that new users know when the delay has been added.

```js
    delayForm.addEventListener('submit', function(event) {
        event.preventDefault()
        // console.log(delayReason.value)
        socket.emit('delay', {
            delayReason: delayReason.value,
            startStation: startStation.value,
            endStation: endStation.value,
            time: new Date().toLocaleString()
        })
        delayReason.value = ''
        startStation.value = ''
        endStation.value = ''
    })
```
## External datasource
For this project I'm using the API provided by NS. (Dutch Railways). In order to make valid requests you need to register an account. They will provide a authorisation key which u need to use with a basic auth protocol.

#### Endpoints
- Prices
- Departure times
- Delays and construction
- Geodata of every station
- Travel advice


## Installation
For this project, I used the API provided by NS.nl. In order to make it work, you'll need to request an API key which you need to set in the header for every request you make.

I also used the npm package ns-API which was created by **Franklin van de Meent**.
[source](https://www.npmjs.com/package/ns-api) can be found here.

use ``` npm install ns-API``` to install the package and use the original README to get you started.

When the app is running you can browse to the root URL and you'll get a list of all the delays currently known with the NS. While running, other people can join in and add their own delays. 

**Example**

> Let's say you're traveling a certain route, but the NS isn't aware or hasn't updated their info. As a user, you can add your own delay. Simple fill in the steps; Route -> Reason -> add. This way everyone who joins will get the delay message. 

## Dependencies
| Package   | Version |
|-----------|---------|
| EJS       | 2.5.8   |
| Express   | 4.16.3  |
| socket.io | 2.1.0   |
| ns-api    | 2.0.8   |
| dotenv    | 5.0.1   |

## Features
- [x] Getting real-time data about errors/issues with train transportation.
- [x] Adding your own problems or situation with transportation for others to see.
- [x] One user adds an issue all other users receive a notification about it. (no push notification)

## Todo
- [ ] Adding a database
- [ ] Saving user accounts
- [x] Styling
- [ ] Deploy the app
- [x] Saving delay messages added by users in a database.
- [ ] Adding the possibility of liking/disliking a delay message. (with 4 dislikes, the message is removed).
- [x] Implement all the routes available.
- [x] Adding autocomplete.

## Wishlist
- [ ] Adding a filter for correct endstation when starting station is selected.
- [ ] Adding like/dislike button
- [ ] Adding metro API data

## Sources
- [Official NS api](https://www.ns.nl/reisinformatie/ns-api)
- [npm ns-api](https://www.npmjs.com/package/ns-api)

## Assignment Requirements
* Build a Node Web App which consumes an external data source through an API and serves a frontend using routing and templating techniques.
* Create a "live" web app which reflects changes to the back-end data model in reactive front-end views, using real-time, event-based, messaging technologies like sockets or server-sent-events.
* Describe their work in a professional readme with insightful diagrams showing the life cycle of their data.

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Where do the 0️⃣s and 1️⃣s live in your project? What DB system are you using?-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a license?) 🤷 -->
