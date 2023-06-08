![icon](/assets/images/tree-of-life-symbol-yggdrasil-image-png-favpng-XzUZyXiq8jchu7WaQWytkfTss.jpg)

Hello,
the idea of this project to train one's tree determination skill in the way of a quiz.

 * [User Experience](#user-experience)
   * [User Stories](#user-stories)
 
 * [Design](#design)
   * [Design of Settings page](#degin-of-settings-page)
   * [Design of Game page](#deign-of-game-page)
 
 * [Features](#features)
   * [General Features on Each Page](#general-features-on-each-page)
   * [Future Implementations](#future-implementations)
   * [Accessibility](#accessibility)
 
 * [Technologies Used](#technologies-used)
 
 * [Deployment & Local Development)](#deployment-local-development)
   * [Installation by user](#installation-by-user)
   * [Deployment](#deployment)
   * [Local Development](#local-development)
   * [How to add Images to Database](#how-to-add-images-to-database)
 
 * [Testing](#testing)
   * [Validator tests](#validator-tests)
     * [WC3](#wc3)
     * [Wave](#wave)
     * [Jigsaw](#jigsaw)
     * [Lighthouse](#lighthouse)
   * [User tests](#user-tests)
   * [Bugs](#nugs)
   * [Open Bugs](#open-bugs)
   * [Fixed Bugs](#fixed-bugs)
 
 * [Credits](#credits)
   * [Code Used](#code-used)
   * [Content](#content)
   * [Media](#media)

---

# User Experience
## Main purpose
The main goal of this project is to support peoples **awareness** for nature. One way of doing so is knowledge and one key point for knowledge is to recognise different species.
## User Stories
The user seeks to train his tree specie determination skills and wants to do it on a fun way without having issues of how to use the software or webpage. It must be possible to not change any setting and start a short game. He wants to be able to recoqnise species while walking around in his neighbourhood or while visit another area. 

It would be helpful to the user to use the app whenever conveniant. On desktop pc at home for big and nice pictures as well as on commuting on a mobile device.

This is not a simple task. Especially in winter there are not many hints visible to recoqnise a tree specie. Flowers and leaves have their own time and can not used for determination whole year around. Even the bark looks different on old and young trees.

The evaluation of the game play is set up rather benevolent. Even after answering wrong one can still receive a fraction of points for the answer. Only if out of two left possible answers the wrong one is choosen, then no point is given for the question. By that just by mathematical probability it is likely to receive more than half of the points. This should ensure the user to continue playing and training his skills since it feels like success.

**But the user must have interest in trees!** Otherwise he will not have fun with the game.

----

# Design
The design is build up to simplistic and without many visible features and decorations.
Most size properties are related to the available space to fit on different devices.


## Design of Settings page
Around a screen width of `300px` the settings page becomes diffucult to use on the number inputs for duration or number of questions. But so small screens are rare nowadays and mobile devices usually offer a separate input field. The design of input groups breaks on a bit more narrow screens. Starting the game is still possible. 
![screenshot min width](docu/screen_min_width.png)

On wide screens with low height there appears a similar issue. The start button goes below the lower edge. But the page is scrollable and one can still reach the button.
![screenshot min height](docu/screen_min_height.png)


## Design of Game page
The game page is build to have visually separate inputs. The positioning and the border of the answer options and the command options are different as well as the hover event on deskopt devices. That should make it intuitive for the user that the usage of both is different.

![Giving an answer](docu/game_horizontal_answer.png) ![Requesting another picture](docu/game_horizontal_next.png)

----

# Features
## General Features on Each Page
## Future Implementations
## Accessibility

----

# Technologies Used

----

# Deployment & Local Development
## Installation by user
## Deployment
## Local Development
## How to add Images to Database

----

# Testing
## Validator tests
### WC3
### Wave
### Jigsaw
### Lighthouse
## User tests
## Bugs
### Open Bugs
### Fixed Bugs

----

# Credits
## Code Used
## Content
## Media

----

## Codeanywhere Reminders

To run a frontend (HTML, CSS, Javascript only) application in Codeanywhere, in the terminal, type:

`python3 -m http.server`

A button should appear to click: _Open Preview_ or _Open Browser_.

To run a frontend (HTML, CSS, Javascript only) application in Codeanywhere with no-cache, you can use this alias for `python3 -m http.server`.


