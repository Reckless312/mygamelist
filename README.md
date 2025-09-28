# Mygamelist
## A web application that allows users to track and manage their gaming library.
- Created with Next.js for its simplicity and performance.
- The main page displays the games from the past 2 years using components from "shadcn".
<img width="1876" height="930" alt="image" src="https://github.com/user-attachments/assets/41c2ee04-1d6a-4acb-b408-07b26f23ff56" /> <br/>
- The backend will be available here: https://github.com/Reckless312/mygamelist-server (will be set to public with time). It contains an express server using sequalize as an ORM. It contains information for the games, users, sessions and each users list.
- Users can access the catalog from the navigation, either by the "Games" link or the search bar.
<img width="1888" height="926" alt="image" src="https://github.com/user-attachments/assets/ffac46df-be18-4f2e-990d-fbb1eec7284c" /> <br/>
- The catalog offers the users a full look at the catalog with applicable filters to find desired items.
- Pagination is done using the infinite scroll technique, achieved by using reacts reference hook and assigning observers.
- Authentification is simply done by a username and a password, implemented with http cookies, session and hashed password in the backend.
<img width="1890" height="945" alt="image" src="https://github.com/user-attachments/assets/590c1739-c46b-43a1-861f-60a833a7ba75" /> <br/>
- Each video game has its own page thanks to Next.js navigation and routing, combined with Reach components reusability for design.
<img width="1891" height="937" alt="image" src="https://github.com/user-attachments/assets/79cfdf47-e627-4575-a361-af991a2d8dc2" /> <br/>
- From here the user can add the game to its own list, and finally select the score and status for it.
- The list will display all of the games added to it, allowing the user to filter by the status selected.
<img width="1855" height="928" alt="image" src="https://github.com/user-attachments/assets/82411df9-1ebd-4284-9271-8d47e80c1ea2" /> <br/>

## Both frontend and backend are deployed using vercel / vercel-serverless but can't be used because of the cloud database. Possible fix Oct 1.
- Environment file used, structure of the file with local api calls:
```
BACKEND_API=http://localhost:8080
API_ALL_GAMES=http://localhost:8080/api/games
API_ONE_GAME=http://localhost:8080/api/games/filter/id
API_GAMES_BY_YEAR=http://localhost:8080/api/games/filter/year
NEXT_PUBLIC_API_LOGOUT=http://localhost:8080/api/logout
NEXT_PUBLIC_API_USERNAME=http://localhost:8080/api/hq
NEXT_PUBLIC_API_REGISTER=http://localhost:8080/api/register
NEXT_PUBLIC_API_LOGIN=http://localhost:8080/api/login
NEXT_PUBLIC_API_USER_LIST=http://localhost:8080/api/list
NEXT_PUBLIC_API_ADD_ITEM_TO_LIST=http://localhost:8080/api/list/add
NEXT_PUBLIC_API_REMOVE_ITEM_FROM_LIST=http://localhost:8080/api/list/delete
NEXT_PUBLIC_API_UPDATE_STATUS_FROM_ITEM=http://localhost:8080/api/list/change-status
NEXT_PUBLIC_API_UPDATE_SCORE_FROM_ITEM=http://localhost:8080/api/list/change-score
NEXT_PUBLIC_API_GET_LIST_ITEM=http://localhost:8080/api/list/get-one
```
- With the environment file setup to a working backend, the frontend setup is done.
- Planned: Profile Page, Reviews per User, switching components from client to server where possible (only when fully moving to the deployed, httpcookie issue), adding video games tags and game development team.
