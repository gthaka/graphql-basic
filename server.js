import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        hello: String
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

const quotes = [
    'There is only one happiness in life, to love and be loved.',
    'All of our technology is completely unnecessary to a happy life.',
    'The happiness of a man in this life does not consist in the absence but in the mastery of his passions.',
    'You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.',
    'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.',
    'There is no way to happiness, happiness is the way.',
    'Whoever is happy will make others happy, too.',
    'Thousands of candles can be lit from a single, and the life of the candle will not be shortened. Happiness never decreases by being shared.',
    'Happiness resides not in possessions, and not in gold, happiness dwells in the soul.',
    'Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.',
    'Independence is happiness.',
    'Action may not always bring happiness; but there is no happiness without action.',
    'Happiness depends upon ourselves.',
    'Wisdom is the supreme part of happiness.',
    'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
    'Happiness can exist only in acceptance.',
    'Happiness is found in doing, not merely possessing.',
    'There is no duty we so underrate as the duty of being happy. By being happy we sow anonymous benefits upon the world.',
    'Friends show their love in times of trouble, not in happiness.',
    'Love is the master key that opens the gates of happiness.'
];

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello Coder 👨‍💻👨🏽‍💻🎉';
    },
    quoteOfTheDay: () => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');