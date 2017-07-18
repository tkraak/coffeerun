# CoffeeRun

CoffeeRun is a small shopping-cart style application from the book [Front-end Web Development: The Big Nerd Ranch Guide](https://www.bignerdranch.com/books/front-end-web-development/) that manages coffee orders for a food truck.

The app introduces the JavaScript [module pattern](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md#modules), [constructor calls](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md#constructor-or-call) as well as the [prototype property](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md#class-functions) of JavaScript functions.

## Learning & Teaching

For me personally, the application serves as a learning and teaching tool, which is the main reason for keeping complexity as low as possible (no build tools, transpilers, etc.)

## Planned Enhancements

The original code as described in the book can be found [here](https://github.com/bignerdranch/nybblr-javascript-book-walkthrough/tree/master/coffeerun). I'm thinking of the following enhancements:

- [x] pass either `window` or `exports`, which makes for easy module re-use in node
- [x] write unit tests
- [ ] remove jQuery dependency
