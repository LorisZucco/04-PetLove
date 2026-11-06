import "./App.css";
import AdoptionForm from "./components/AdoptionForm";
import Header from "./components/Header";
import PetList from "./components/PetList";

import pets from "./data/pets";

function App() {
  return (
    <>
      <Header />

      <PetList pets={pets} />

      <AdoptionForm pets={pets} />
    </>
  );
}

export default App;
