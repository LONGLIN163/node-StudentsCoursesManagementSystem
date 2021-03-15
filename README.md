node-StudentsCoursesManagementSystem
===================================

The Project focus on the interaction between front-end and back-end, common user and and administator（CMS）with restful routing&api, robust front-end and back-end validation , login&logout(session), database persistence and all CRUD operations .etc. The techs cover mongodb&mongoose , express, ejs , uderscore.js, jquery&jqGrid, ajax, bootstrap .etc.

### Set up database

Create an empty database,for example "scdb", then connect it:

```bash
mongod --dbpath "C:\scdb"

```

```bash
mongoose.connect('mongodb://localhost/scdb',...)
```

### Run

```bash
node app.js

```

### Set up database

Test admin client: http://127.0.0.1:3000/admin

1. Click and go to http://127.0.0.1:3000/admin/student , then upload students excel data "testDataStudent" (in the project dir)
2. Click and go to http://127.0.0.1:3000/admin/courses, then upload courses json data "CoursesJSON" (in the project dir)

Test common user client: http://127.0.0.1:3000/
3. Download student info from students page.  
4. Use initial students info(from download) to login, the change the password.

Test from both side.

