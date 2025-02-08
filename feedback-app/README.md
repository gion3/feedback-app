#### Installation and Setup

1.  Open a terminal and run `npm install` in the `.\feedback-app` directory.
2.  Open a terminal and run `npm install` in the `.\feedback-app\backend` directory.
3.  To start the server, run the command `node .\server.js` from the `.\feedback-app\backend` directory.
4.  To launch the application, run `npm start` from the `.\feedback-app` directory.

#### Features

-   The application provides separate interfaces for students and professors.
-   **Professor functionalities:**
    -   Create an activity by specifying a date, description, and duration.
    -   The application generates a unique code for each activity.
-   **Student functionalities:**
    -   Join an activity by entering the unique code.
    -   Provide feedback by selecting one of four emoticons: **happy, sad, surprised, or confused**.
-   **Real-time feedback visualization:**
    -   Professors can monitor feedback in real time.
    -   A bar chart displays all received feedback for better analysis.

#### Technologies Used

-   **Frontend:** React with Tailwind CSS for styling.
-   **Backend:** Node.js with Express.
-   **Database:** SQLite with Sequelize ORM.
