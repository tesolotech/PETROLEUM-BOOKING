# Node APP: PETROLEUM BOOKING

#### Discription : This is simple node js application. which profile below functionality :

     > Signup user
     > Login user
     > JWT token
     > API token
     > User may with multiple role like pump-manage, customer
     > User can upload profile pic
     > We have specific route for all of this functionality.

####

# TECHNOLOGY/ LIBRARY DETAILS

###### DATABASE : Mongodb Atlas

###### LANGULAGE : Javascript(Node)

###### FRAMEWORK : Mongoose, Express, Multer

## API URLS

#### User signup

     > URL: '/api/signup'
     > Payload : {"name":"","email":"","password":"","profile_pic":"","userRole":"","deleted":false,"blocked": false}
     > Method : POST

#### User Login

     > URL : '/api/login'
     > Payload : {"email":"","password":""}
     > Method : POST

#### Get all User list

     > URL : '/api/users'
     > Payload : nothing
     > Method : GET

#### Upload user profile pic

     > URL : '/api/uploadFiles'
     > Payload : {File: File, "userId": ""}
     > Method : POST

#### Place new order

     > URL : '/api/order'
     > Payload : {"type": "Petrol/diesal/gas", "userId": "", "quantity": "", "rate": "", "vehicles_type": "","total": "Can we calculated autometically", "discount": "",}
     > Method : POST

#### Get specific order of user

     > URL : '/api/orders/:userId'
     > Payload : Nothing
     > Method : GET

## Project Specifications

**POSTMAN API TESTING AND DATABASE VIEWS**

### PORT : 3000

### JWT authentication token with expries time

### API KEY authentication

### .env Contains all confidential info of project

```
**Commands**
- install: `npm install`
- run: `npm start`
```
