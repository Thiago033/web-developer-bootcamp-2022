// fakeRequestPromise('google.com/api/page1')
//     .then(() => {
//         console.log("SUCSESS (PAGE 1)");
//         return fakeRequestPromise('google.com/api/page2');
//     })
//     .then(() => {
//         console.log("SUCSESS (PAGE 2)");
//         return fakeRequestPromise('google.com/api/page3');
//     })
//     .then(() => {
//         console.log("SUCSESS (PAGE 3)");
//     })
//     .catch(() => {
//         console.log("REQUEST FAILED!");
// })