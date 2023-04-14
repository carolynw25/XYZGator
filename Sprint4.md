# Work completed in Sprint 4
## Frontend
- Created two games: a matching game and a math game
	- Matching game: Has a timer, has matching cards, has a winning condition, saves lowest time and current time, can replay the game
	- Math Game: Has a countdown, keeps a score, and shows wrong answers and changes questions when the right answers
- Linked frontEnd to backEnd for signUp page to create new users
- Made a file to help retrieve the ID from the backend (to help get user data in the future)
- Modified LogIn and SignUp page to look neater and more centered
- Modified the Game page so it has instructions under the memory game and math game
## Backend
- Created function to get the user's ID when needed
- Updated signup function so that the password is hashed - this provides more security for the user's information
- Created functionality to receive and store the time taken to complete the memory game, and then store the record/best time (lowest time)
- Created functionality to receive and store the the score for the math game, and then store the highest score
- Modified function for updating users - now includes separate functionality for updating pieces of the user's information (usage will become more apparent when frontend adds a profile/settings page showing current user information)
	- IN PROGRESS: Updating functionality for first name, last name, and password is still in progress. First name and last name updating features are low priority since it is unlikely that the user will have change these. However, password is an issue that should be fixed as soon as possible, and this requires more hashing functionality.
- IN PROGRESS: Creating functionality for the 'forgot password' feature - involves sending a password reset link via email so that users can reset the password themselves
## Together
- Connected FrontEnd and Backend for User Signup (Now have a working login and signup)
