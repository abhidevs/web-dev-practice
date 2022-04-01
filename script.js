console.log("Person1: shows ticket");
console.log("Person2: shows ticket");

// Using Promises without Async await
const promiseWifeBringingTicks = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ticket");
  }, 3000);
});

const getPopcorn = promiseWifeBringingTicks.then((t) => {
  console.log("wife: I have the ticks");
  console.log("husband: we should go in");
  console.log("wife: no I am hungry");

  return new Promise((resolve, reject) => resolve(`${t} popcorn`));
});

const getButter = getPopcorn.then((t) => {
  console.log("husband: I got some popcorn");
  console.log("husband: we should go in");
  console.log("wife: I need butter on my popcorn");
  return new Promise((resolve, reject) => resolve(`${t} butter`));
});

getButter.then((t) => console.log(t));

// With Async await
// const preMovie = async () => {
//   const promiseWifeBringingTicks = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("ticket"), 3000);
//   });

//   const getPopcorn = new Promise((resolve, reject) => resolve("popcorn"));
//   const getButter = new Promise((resolve, reject) => resolve("butter"));

//   let ticket = await promiseWifeBringingTicks;
//   console.log(`wife: I have the ${ticket}`);
//   console.log("husband: we should go in");
//   console.log("wife: no I am hungry");

//   let popcorn = await getPopcorn;
//   console.log(`husband: I got some ${popcorn}`);
//   console.log("husband: we should go in");
//   console.log("wife: I need butter on my popcorn");

//   let butter = await getButter;
//   console.log(`husband: I got some ${butter} on popcorn`);
//   console.log("husband: Anything else darling?");
//   console.log("wife: let go we are getting late");
//   console.log("husband: thank you for the reminder");

//   return ticket;
// };

// preMovie().then((t) => console.log(`Person3: shows ${t}`));

console.log("Person4: shows ticket");
console.log("Person5: shows ticket");
