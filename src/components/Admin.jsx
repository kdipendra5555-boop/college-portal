import { Routes, Route } from "react-router-dom";
import ManagePapers from "./ManagePapers";
import AddCTPaper from "./AddCTPaper";
import Notes from "./Notes";


function Admin() {
  return (
    <>
    <ManagePapers/>
    <AddCTPaper/>
    <Notes/>
    </>
  );
}

export default Admin;