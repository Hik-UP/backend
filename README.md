# **Hik'Up server**

## **Authors**

- adrien.moreau@epitech.eu

## **Architecture**

the back-end is in Node.JS with Express as a framework for a REST API, Prisma as an ORM and PostgreSQL for the databse.

### **The api**

- User's route ([documentation](./server/src/controllers/user/README.md))

## **Production deployement**

Our project uses `docker-compose`.

### **Docker compose**

Docker compose is use to build and run this project so it can be used **everywhere**.

But to make it simple use **start.sh**

To build and start the project: `$> ./start.sh`

To recreate and start the project like new: `$> ./start.sh recreate` or `$> ./start.sh re`

To clean the project: `$> ./start.sh clean` or `$> ./start.sh cl`

**WARNING!!!**

**The full command type stop ALL dockers on the machine and remove ALL the dockers data.**

**Using **`sudo docker container stop $(sudo docker container ls -aq)` **and** `sudo docker system prune -af --volumes`**.**

**User be aware!!!**

To fully recreate and start the project like new: `$> ./start.sh full_recreate` or `$> ./start.sh fre`

To fully clean the project: `$> ./start.sh full_clean` or `$> ./start.sh fcl`

If it's the first time you launch this project, you need to initialise the db like this: `$> cd server/prisma/ && npx prisma migrate dev --name init`

#### **Known issue**

if you get this error:

`Error: P1001: Can't reach database server at '172.17.0.1':'5432'`

you need to change at line 5 of start.sh the number after `sleep_time=` by an higher value.

## **Back-end *(the server)***

The Back-end (server) is available at `http://localhost:8080/` (on local env).

We used Express, Prisma and PostgreSQL. Why did we?

We decided to use Express beceause it is a framework used by more and more companies.

We choosed to use Prisma beceause we needed a good and exhaustive way to communicate with a database.

We determined to use PostgreSQL beceause it works perfectly with Prisma our ORM and is well mantained.

In the end, they are all simple and reliable, everything a good project needs.