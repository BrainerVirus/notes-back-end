# Notes Back End

This is the alpha version of this part of the app, so for now there isn't much, but I have in mind exiting features.

## Run Locally

Clone the project

```bash
  git clone https://github.com/BrainerVirus/node-espress-ts-gpu-scraper.git
```

Go to the project directory

```bash
  cd notes-backend
```

Install dependencies

```bash
  npm i
```

Start the server in dev mode

```bash
  npm run nodemon
```

_**Note** : To run dev script you will need to make a **nodemon.json** file just like
the example below_

```
{
  "ignore": [".git", "node_modules", "dist", "build"],
  "watch": ["./src"],
  "exec": "npm run dev",
  "ext": "ts"
}
```

Start the server

```bash
  npm run start
```

## Features

- Note Creation
- Note Retrieve
- Dynamic Note Retriving

#### Get all notes

```http
  GET /note/query
```

#### Response

```
[{_id
63cdd5812c8587df7cf0edb3
content
"Testing note"
creationDate
"21/01/2022"
creationTime
"10:10:10"
__v
0, _id
63cdd8a827c9c340cfdffa2d
content
"Testing note"
creationDate
"21/01/2022"
creationTime
"10:10:10"
__v
0}]
```

#### Error Messages

| code | description                |
| :--- | :------------------------- |
| `1`  | `db connection has failed` |
| `2`  | `Internal error`           |
| `5`  | `Invalid query`            |

#### Get notes filtered by query

```http
  GET /note/query?_id=63cdd5812c8587df7cf0edb3
```

#### Response

```
[
        {"_id":"63cdd5812c8587df7cf0edb3","content":"Testing note","creationDate":"21/01/2022","creationTime":"10:10:10","__v":0}
]
```

#### Error Messages

| code | description                |
| :--- | :------------------------- |
| `1`  | `db connection has failed` |
| `2`  | `Internal error`           |
| `4`  | `Invalid query`            |

#### Create item

```http
  POST /note/create
```

#### Response

```
{ message: "Note creation succesfull" }
```

#### Error Messages

| code | description                     |
| :--- | :------------------------------ |
| `1`  | `db connection has failed`      |
| `2`  | `Internal error`                |
| `3`  | `One or more fields is missing` |
| `4`  | `Invalid query`                 |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI `

## License

[MIT](https://choosealicense.com/licenses/mit/)
