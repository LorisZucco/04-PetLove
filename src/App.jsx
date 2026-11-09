import { useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./adoption-form.css";
import schema from "../../libs/validations";

const apiURL = "https://jsonplaceholder.typicode.com/posts";

const initialValues = {
  petId: "",
  name: "",
};

export default function AdoptionForm({ pets }) {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const petId = useWatch({ control, name: "petId" });

  const chosenPet = pets.find((pet) => {
    return pet.id == petId;
  });

  async function submitForm(data) {
    setErrorMessage("");

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok == false) {
        setErrorMessage("Não foi possível enviar os dados. Tente novamente!");
        return;
      }

      const saved = await response.json();
      console.log(saved);
    } catch (error) {
      console.log(error);
      setErrorMessage("Sem conexão com a API");
    }

    //console.log(data);
  }

  return (
    <form
      className="adoption-form"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      <h2 className="form-title">
        Quero adotar {chosenPet && `${chosenPet.article} ${chosenPet.name}`}
      </h2>

      <div className="field">
        <label htmlFor="petId">Animal</label>
        <select name="pet" id="petId" {...register("petId")}>
          <option value="">Escolha um animal</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
        {errors.petId && <p className="error">{errors.petId.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="name">Nome Completo</label>
        <input id="name" name="name" type="text" {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="whatsapp">Whatsapp</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="off"
          {...register("whatsapp")}
        />
        <p className="hint">Com DDD. Pode usar espaço, hífen e parênteses.</p>
        {errors.whatsapp && <p className="error">{errors.whatsapp.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="birthDate">Data de Nascimento</label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          {...register("birthDate")}
        />
        {errors.birthDate && (
          <p className="error">{errors.birthDate.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="housing">Moradia</label>
        <select name="housing" id="housing" {...register("housing")}>
          <option value="">Escolha uma moradia</option>
          <option value="casa-com-quintal">Casa com quintal</option>
          <option value="casa-sem-quintal">Casa sem quintal</option>
          <option value="apartamento">Apartamento</option>
        </select>
        {errors.housing && <p className="error">{errors.housing.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="reason">Por que você quer adotar?</label>
        <textarea name="reason" id="reason" {...register("reason")}></textarea>
        {errors.reason && <p className="error">{errors.reason.message}</p>}
      </div>

      <div className="field field-check">
        <input id="terms" type="checkbox" {...register("terms")} />
        <label htmlFor="terms">
          Li e concordo com o termo de adoção responsável
        </label>
        {errors.terms && <p className="error">{errors.terms.message}</p>}
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar interesse"}
      </button>
    </form>
  );
}
