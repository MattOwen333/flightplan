// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Grouplist from "./Grouplist";
// import Groupview from "./Groupview";
// import { Grid } from "@material-ui/core";

// import { getSomething } from "../api";

// const isLoggedIn = localStorage.getItem("token");

// const App = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     getSomething()
//       .then((response) => {
//         setMessage(response.message);
//       })
//       .catch((error) => {
//         setMessage(error.message);
//       });
//   });

//   return (
//     <div className="App">
//       <Grid container direction="column">
//         <Grid item>This is where the header will be</Grid>
//         <Grid item>This is where our content goes</Grid>
//       </Grid>
//     </div>
//   );
// };

// const App = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     getSomething()
//       .then((response) => {
//         setMessage(response.message);
//       })
//       .catch((error) => {
//         setMessage(error.message);
//       });
//   });

//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         {isLoggedIn ? <Groupview /> : <Grouplist />}
//       </Router>
//     </div>
//   );
// };

// export default App;
