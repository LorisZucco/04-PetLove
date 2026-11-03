import "./header.css";

import { PawPrint } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div>
        <PawPrint size={36} color="#343131" strokeWidth={1.25} />
        <h1>PetLove</h1>
      </div>

      <p>Adotando melhores amigos!</p>
    </header>
  );
}
