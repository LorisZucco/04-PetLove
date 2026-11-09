import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./adoption-form.css";

function clearPhone(phone) {
  return phone
    .replaceAll("", "")
    .replaceAll("-", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
}

function isUnderAge(birthDate) {
  const year = birthDate.slice();
}

const schema = z.object({
  petId: z.string().min(1, "Escolha pelo menos um pet."),
  name: z.string().min(2, "Digite seu nome completo."),
  email: z.email("Digite um email válido"),
  whatsapp: z
    .string()
    .overwrite(clearPhone)
    .regex(/^\d{11}$/, "Use o DDD e os 9 dígitos."),
  birthDate: z.string().min(1, "informe a data de nascimento."),
  housing: z.string().min(1, "Escolha um a moradia"),
  reason: z.string().min(20, "Conte um pouco mais..."),
  terms: z.literal(true, "Aceite os termos!"),
});

export default function AdoptionForm({ pets }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  function submitForm(data) {
    console.log(data);
  }

  return (
    <form className="adoption-form" onSubmit={handleSubmit(submitForm)}>
      <h2 className="form-title">Quero adotar a Nina</h2>

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
        {errors.petId && <p className="error"> {errors.petId.message}</p>}
      </div>
      <div className="field">
        <label htmlFor="name">Nome Completo</label>
        <input id="name" name="name" type="text" {...register("name")} />
        {errors.name && <p className="error"> {errors.name.message} </p>}
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" {...register("email")} />
        {errors.email && <p className="error"> {errors.email.message}</p>}
      </div>

      <div className="field">
        <label htmlFor="whatsapp">Whatsapp</label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          {...register("whatsapp")}
        />
        <p className="hint">Com DDD, Pode usar espaço, hífen e parênteses.</p>
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
          <option value="casa-com-quintal">Casa com quinta</option>
          <option value="casa-sem-quintal">Casa sem quintal</option>
          <option value="apartamento">Apartamento</option>
        </select>
        {errors.housing && <p className="error">{errors.housing.message}</p>}
      </div>
      <div className="field">
        <label htmlFor="reason">Por que você quer adotar</label>
        <textarea name="reason" id="reason" {...register("reason")}></textarea>
        {errors.reason && <p className="error">{errors.reason.message}</p>}
      </div>

      <div className="field field-check">
        <input id="terms" type="checkbox" {...register("terms")} />
        <label htmlFor="terms">
          Li e concordo com o termo de adoção responsável.
        </label>
        {errors.terms && <p className="error">{errors.terms.message}</p>}
      </div>
      <button type="submit">Enviar interesse</button>
    </form>
  );
}
