Task: https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view

_______________________________________________________________________________

How to run the app: To run this app ypu should change directory to 'todolist' and write 'npm run start' in console

_______________________________________________________________________________

Database snapshot: There is one table in database with fields:
    - todo : name of todotask
    - description : description of task
    - data : date of the task
    - userId : user's id, who added this task

_______________________________________________________________________________

Application stack:
    todolist (main folder) - there are all main files in project
        - src
            - components (components and pages)
            - context (files for database log in and log out)
            - customHooks (hook for receiving information between components)
            - styles (thare are all files with css)
        - publick