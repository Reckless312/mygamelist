# Mygamelist

A web application that allows users to track and manage their gaming library.

## Dependencies

### Setup & Configuration

Configure the server via the [mygamelist-server](https://github.com/Reckless312/mygamelist-server) repository.

```bash
cp .env.template .env
```

*Note: Update the backend API and Steam API endpoints in `.env` as needed.*

## Application Overview

### Home Page

![img.png](home_page.png)

*Showcases the games from the past years.*

### Search Page

![img_1.png](search_page.png)

*Contains the whole library of available games.*

### Game Page

![img_2.png](game_page.png)

*Information about the game, with options to add to the user's personal list and mark as a favorite.*

### Personal List

![img_3.png](list.png)

*Tracked games for the current user.*

### Profile Page

![img_4.png](profile.png)

*Stats about the user and personal favorites.*

### Login Page

![img_5.png](login_page.png)

*Simple login or authentication with Steam.*

## System Specifications

* **Frontend:** Next.js, http-cookies, shadcn/ui
* **Backend:** Express.js, Sequelize