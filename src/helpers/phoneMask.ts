const formatPhoneWithMask = (phone: string): any => {
  return phone
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d{5})/, "($1)$2-") // captura 2 grupos de numero o primeiro de 2 e o segundo de 4, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(-\d{4})\d+?$/, "$1"); // captura 4 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export default formatPhoneWithMask;
