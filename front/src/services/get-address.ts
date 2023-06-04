import axios from 'axios'

interface SuccessAddress {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
  erro: boolean
}

export async function getAdressByCep(cep: string): Promise<SuccessAddress> {
  const response = await axios.get<SuccessAddress>(
    `https://viacep.com.br/ws/${cep}/json/`,
  )

  console.log(response.data)
  return response.data
}

// export async function getAdressByCep(cep: string) {
//   await axios
//     .get<AxiosResponse<SuccessAddress>>(`https://viacep.com.br/ws/${cep}/json/`)
//     .then((response) => {
//       if (!response.data) {
//         throw new Error('Cep não encontrado')
//       } else {
//         console.log(response)
//         return response.data
//       }
//     })
// }
