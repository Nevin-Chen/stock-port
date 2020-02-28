# Stock-Port
Welcome to Stock-port, A full-stack Stock portfolio application

You can find the deployed site on [https://stock-portapp.herokuapp.com/](https://stock-portapp.herokuapp.com/)

### Getting Started
```npm install```

Stock-Port stores data using PostgreSQL, so be sure to have [PostgreSQL](https://www.postgresql.org/download/) installed before running locally.  
Run following commands on your CLI 
>psql
>createdb stock-port

```npm run start-dev```

Open up the project locally:
```http://localhost:3000/```

### Features
Stock-Port allows users to create an account and simulate stock purchases.

Users have a portfolio and a transactional view after purchasing a stock.

The color of a user's stock portfolio changes according to the stock's current performance relative to the purchasing price.

- Displays Green when current price of stock is greater than the user's purchasing price.
- Displays Green when current price of stock is lower than the user's purchasing price.
- Displays Green when current price of stock is equal to the user's purchasing price.

![Portfolio-View](https://res.cloudinary.com/dkdkftvsq/image/upload/v1582851970/Screen_Shot_2020-02-27_at_8.05.04_PM_fmpcym.png)

![Transaction-View](https://res.cloudinary.com/dkdkftvsq/image/upload/v1582851970/Screen_Shot_2020-02-27_at_8.05.11_PM_foimln.png)

### Libraries and Technologies

- [JavaScript](https://www.javascript.com)
- [Node.js](https://www.nodejs.org/en/)
- [Express.js](https://www.expressjs.com)
- [React.js](https://www.reactjs.org)
- [PostgreSQL](https://www.postgresql.org)
- [IEX Cloud API](https://iexcloud.io/)
- [Semantic UI](https://semantic-ui.com/)
