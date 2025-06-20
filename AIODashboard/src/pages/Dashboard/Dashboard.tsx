import { Box, Grid } from "@mui/material";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      {/* <Grid container size={{ xs: 12 }}> */}
      <Grid size={{ xs: 12 }}>
        <h1>Dashboard</h1>
      </Grid>
      {/* <Grid size={{ xs: 6 }}> */}
    </>
  );
}

//
//
// ===========INTERVIEW
// // import { Box, Grid } from "@mui/material";

// // import Button from "@mui/material/Button";
// // import { Link } from "react-router-dom";
// import {
//   // React,
//   useEffect,
//   useState,
// } from "react";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [fileredData, setFileredData] = useState([]);
//   const [searchKey, setSearchKey] = useState("");
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, []);

//   const handleSearch = (e: any) => {
//     console.log(e.target.value);
//     setSearchKey(e.target.value);
//   };

//   useEffect(() => {
//     console.log(data);
//     const filteredData = data.filter(
//       (d: any) =>
//         d.name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
//       // d
//     );
//     setFileredData(filteredData);
//     console.log(filteredData);
//   }, [searchKey]);

//   return (
//     <>
//       <input type="text" onChange={handleSearch} />
//       <div className="App">
//         {fileredData.length < 1 && data ? (
//           data.map((d: any) => (
//             <div className={"nameBox"} key={d.id}>
//               {d.name}
//             </div>
//           ))
//         ) : fileredData.length > 0 ? (
//           fileredData.map((d: any) => (
//             <div className={"nameBox"} key={d.id}>
//               {d.name}
//             </div>
//           ))
//         ) : (
//           <div>No data found</div>
//         )}
//       </div>
//     </>
//   );
// }

// // export function App(props) {
// //   return (
// //     <>
// //       <input type="text" onChange={handleSearch} />
// //       <div className="App">
// //         {fileredData.length < 1 && data ? (
// //           data.map((d) => (
// //             <div className={"nameBox"} key={d.id}>
// //               {d.name}
// //             </div>
// //           ))
// //         ) : fileredData.length > 1 ? (
// //           data.map((d) => (
// //             <div className={"nameBox"} key={d.id}>
// //               {d.name}
// //             </div>
// //           ))
// //         ) : (
// //           <div>No data found</div>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // Log to console
// console.log("Hello console");
