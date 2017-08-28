Small Restful API
=================

This small project allows sellers to manage their stock (**cars**). In a few words, there are two models and they are related by its ID (**ObjectId**).


Table of Contents
-----------------

* [Getting Started](#getting-started)
* [Peform Requests](#peform-requests)


Getting Started
---------------

### Prerequisites

- Node.js (**v6.0.0** recommended or **higher**) with NPM.
- MongoDB.

### Installation

```
# Global dependency for development (optional).
npm install -g nodemon

# Clone the repo from Github.
git clone git@github.com:vihuvac/small-rest-api.git
cd small-rest-api

# Install the project dependencies.
npm install

# Start everything up with nodemon.
nodemon app
```


Peform Requests
---------------

There are a lot of alternatives in order to perform Restful API Requests through a Rest Client. [Postman](https://www.getpostman.com/postman "Postman Official Website") is a very good alternative for that.

The project listens on port **3000** by default, so all the request may be performed through: http://localhost:3000.

> **Heads up**!
>
> This is a very basic and simple Restful API that's why some request may not need a user validation.
> There is not a user interface as an admin dashboard in order to manage the stock.

### Users

Request Type | Request URL                                     | Task Description                                                                | Additional Info
------------ | ----------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------
**GET**      | ```http://localhost:3000/users```               | Get all the users.                                                              |
**GET**      | ```http://localhost:3000/users/{userId}```      | Get a single user (by its ID *MongoDB*).                                        | MongoDB ID example: ```59a20fbfc82c4edd1b56360a```
**GET**      | ```http://localhost:3000/users/{userId}/cars``` | Get all the cars belonging to a user (by its ID *MongoDB*).                     | MongoDB ID example: ```59a20fbfc82c4edd1b56360a```
**POST**     | ```http://localhost:3000/users```               | Create a single user.                                                           | The **header** and **body** uses the **JSON** format, e.g: ```{ "firstName": "John", "lastName": "Doe", "email": "john.doe@fsociety.com" }```.
**POST**     | ```http://localhost:3000/users/{userId}/cars``` | Create a car for a single user (by its ID *MongoDB*).                           | The **header** and **body** uses the **JSON** format, e.g: ```{ "make": "Audi", "model": "R8", "year": 2012 }```. MongoDB ID example: ```59a20fbfc82c4edd1b56360a```
**PUT**      | ```http://localhost:3000/users/{userId}```      | Update all the fields of a single user (by its ID *MongoDB*).                   | The **header** and **body** uses the **JSON** format. Except the field related to cars, all the fields are required in order to update the user doc, e.g: ```{ "firstName": "Jonathan", "lastName": "Ive", "email": "john.doe@fsociety.com" }```. MongoDB ID example: ```59a20fbfc82c4edd1b56360a```
**PATCH**    | ```http://localhost:3000/users/{userId}```      | Update one or a mix of fields belonging to a single user (by its ID *MongoDB*). | The **header** and **body** uses the **JSON** format. Through this method is possible to update just a single field or a mix of fields, e.g: ```{ "email": "jonathan.ive@apple.com" }```. MongoDB ID example: ```59a20fbfc82c4edd1b56360a```
**DELETE**   | ```http://localhost:3000/users/{userId}```      | Delete a single user (by its ID *MongoDB*).                                     | The **header** uses the **JSON** format. MongoDB ID example: ```59a20fbfc82c4edd1b56360a```

---

### Cars

Request Type | Request URL                                   | Task Description                                                               | Additional Info
------------ | --------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------
**GET**      | ```http://localhost:3000/cars```              | Get all the cars.                                                              |
**GET**      | ```http://localhost:3000/cars/{carId}```      | Get a single car (by its ID *MongoDB*).                                        | MongoDB ID example: ```59a20fcdc82c4edd1b56360b```
**POST**     | ```http://localhost:3000/cars```              | Create a single car.                                                           | The **header** and **body** uses the **JSON** format, e.g: ```{ "make": "BMW", "model": "X6", "year": 2017, "seller": "59a20fbfc82c4edd1b56360a" }```.
**PUT**      | ```http://localhost:3000/cars/{carId}```      | Update all the fields of a single car (by its ID *MongoDB*).                   | The **header** and **body** uses the **JSON** format. Except the field related to users, all the fields are required in order to update the car doc, e.g: ```{ "make": "Toyota", "model": "New Prius", "year": 2015 }```. MongoDB ID example: ```59a20fcdc82c4edd1b56360b```
**PATCH**    | ```http://localhost:3000/cars/{carId}```      | Update one or a mix of fields belonging to a single car (by its ID *MongoDB*). | The **header** and **body** uses the **JSON** format. Through this method is possible to update just a single field or a mix of fields, e.g: ```{ make": "New Toyota }```. MongoDB ID example: ```59a20fcdc82c4edd1b56360b```
**DELETE**   | ```http://localhost:3000/cars/{carId}```      | Delete a single car (by its ID *MongoDB*).                                     | The **header** uses the **JSON** format. MongoDB ID example: ```59a20fcdc82c4edd1b56360b```

Done!
