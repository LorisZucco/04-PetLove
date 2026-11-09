import { z } from "zod";

function cleanPhone(phone) {
  return phone
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
}

function isUnderAge(birthDate) {
  const birthYear = Number(birthDate.slice(0, 4));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  //console.log(currentYear);

  const isUnderAge = currentYear - birthYear <= 18;

  //console.log(isUnderAge);

  return !isUnderAge;

  //console.log(typeof year);
  //console.log(year);
}

const schema = z.object({
  petId: z.string().min(1, "Escolha pelo menos um pet!"),
  name: z.string().min(2, "Digite seu nome completo!"),
  email: z.email("Digite um e-mail válido!"),
  whatsapp: z
    .string()
    .overwrite(cleanPhone)
    .regex(/^\d{11}$/, "Use o DDD e os 9 dígitos"),
  birthDate: z
    .string()
    .min(1, "Informe a data de nascimento!")
    .refine(isUnderAge, "Para adotar, você precisa ter 18 ou mais anos"),
  housing: z.string().min(1, "Escolha uma moradia!"),
  reason: z.string().min(20, "Conte um pouco mais..."),
  terms: z.literal(true, "Aceite os termos!"),
});

export default schema;
