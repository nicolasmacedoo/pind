export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

export const quantityFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
})