export class DeleteProductInOrder extends Error {
  constructor() {
    super('Produto usado em pedido não pode ser excluido')
  }
}
