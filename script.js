// console.log("Person1: shows ticket");
// console.log("Person2: shows ticket");

// // Using Promises without Async await
// // const promiseWifeBringingTicks = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve("ticket");
// //   }, 3000);
// // });

// // const getPopcorn = promiseWifeBringingTicks.then((t) => {
// //   console.log("wife: I have the ticks");
// //   console.log("husband: we should go in");
// //   console.log("wife: no I am hungry");

// //   return new Promise((resolve, reject) => resolve(`${t} popcorn`));
// // });

// // const getButter = getPopcorn.then((t) => {
// //   console.log("husband: I got some popcorn");
// //   console.log("husband: we should go in");
// //   console.log("wife: I need butter on my popcorn");
// //   return new Promise((resolve, reject) => resolve(`${t} butter`));
// // });

// // // getColdDrinks promise
// // const getColdDrinks = getButter.then((t) => {
// //   console.log("husband: I got some butter on the popcorn");
// //   console.log("husband: now we should go in");
// //   console.log("wife: I also need some cold drinks");
// //   return new Promise((resolve, reject) => resolve(`${t} cold drinks`));
// // });

// // getColdDrinks.then((t) => console.log(t));


// // With Async await
// const preMovie = async () => {
//   const promiseWifeBringingTicks = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("ticket"), 3000);
//   });

//   const getPopcorn = new Promise((resolve, reject) => resolve("popcorn"));
//   const getButter = new Promise((resolve, reject) => resolve("butter"));
//   const getColdDrinks = new Promise((resolve, reject) =>
//     resolve("cold drinks")
//   );

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
//   console.log("wife: I also want some cold drinks");

//   // getColdDrinks promise
//   let colddrinks = await getColdDrinks;
//   console.log(`husband: I got some ${colddrinks}`);
//   console.log("husband: Anything else darling?");
//   console.log("wife: lets go we are getting late");
//   console.log("husband: thank you for the reminder");

//   return ticket;
// };

// preMovie().then((t) => console.log(`Person3: shows ${t}`));

// console.log("Person4: shows ticket");
// console.log("Person5: shows ticket");


// Convert the createPost , deletePost you wrote previously into async await completely
const posts = [
  { title: "Post One", body: "This is post one" },
  { title: "Post Two", body: "This is post two" },
];

function getPosts() {
  setTimeout(() => {
    let output = "";

    posts.forEach((post) => {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

const createAndDeletePost = async () => {
  const createPost = (post) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.push(post);
        resolve();
      }, 2000);
    });
  };

  const deletePost = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.pop();
        resolve();
      }, 1000);
    });
  };

  await createPost({ title: "Post Three", body: "This is post three" });
  getPosts();
  await deletePost();
};

getPosts();
createAndDeletePost().then(getPosts);
