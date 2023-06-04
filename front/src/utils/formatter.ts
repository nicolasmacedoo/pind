export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const quantityFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
})

export function cpfFormatter(cpf: string) {
  cpf = cpf.replace(/\D/g, '') // Remove tudo que não é dígito
  cpf = cpf.substring(0, 11) // Limita o CPF a 11 dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sétimo e o oitavo dígitos
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca um hífen entre o décimo e o décimo primeiro dígitos
  return cpf
}

export function phoneFormatter(phone: string) {
  phone = phone.replace(/\D/g, '')
  phone = phone.substring(0, 11)
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2')
  phone = phone.replace(/(\d{5})(\d)/, '$1-$2')
  return phone
}

export function cepFormatter(cep: string) {
  cep = cep.replace(/\D/g, '') // Remove tudo que não é dígito
  cep = cep.substring(0, 8) // Limita o CEP a 8 dígitos
  cep = cep.replace(/^(\d{5})(\d)/, '$1-$2') // Coloca um hífen antes dos 3 últimos dígitos
  return cep
}
