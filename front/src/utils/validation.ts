function calculateDigit(cpfArray: Array<string>): number {
  let total = 0
  let multiplier = cpfArray.length + 1
  cpfArray.forEach((digit) => {
    total += parseInt(digit) * multiplier
    multiplier--
  })
  const rest = total % 11
  return rest < 2 ? 0 : 11 - rest
}

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf.length !== 11) return false

  const cpfArray = Array.from(cpf)
  const cpfArrayWithoutLastDigit = cpfArray.slice(0, -2)
  const firstDigit = Number(cpfArray[9])
  const secondDigit = Number(cpfArray[10])
  const firstDigitCalculated = calculateDigit(cpfArrayWithoutLastDigit)
  const secondDigitCalculated = calculateDigit(
    cpfArrayWithoutLastDigit.concat(String(firstDigitCalculated)),
  )
  console.log(firstDigitCalculated)
  console.log(secondDigitCalculated)
  return (
    firstDigit === firstDigitCalculated && secondDigit === secondDigitCalculated
  )
}
