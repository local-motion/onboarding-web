### Running Graphql queries

Install `graphql-cli`
```
npm install -g graphql-cli
```



Create and add to `.env`-file
```
ID_TOKEN=abcdef12345
```

Run using
```
graphql --dotenv .env --project onboarding query <pick-a-query>.gql
```