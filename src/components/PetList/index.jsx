import "./pet-list.css";
import PetCard from "../PetCard";

export default function PetList({ pets }) {
  return (
    <section className="pets">
      <h2>Esperando por você</h2>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          name={pet.name}
          species={pet.species}
          age={pet.age}
          size={pet.size}
          emoji={pet.emoji}
        />
      ))}
    </section>
  );
}
