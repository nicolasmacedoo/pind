import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit_measurement: string;
  userId: string
}

interface CreateProductInput {
  name: string;
  price: number;
  quantity: number;
  unitMeasurement: string;
}

interface UpdateProductInput {
  name?: string;
  price?: number;
  quantity?: number;
  unit_measurement?: string;
}

interface ProductsContextType {
  products: Product[];
  createProduct: (data: CreateProductInput) => Promise<void>;
  updateProduct: (id: string, data: UpdateProductInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsContext = createContext({} as ProductsContextType)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts() {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Erro o buscar os produtos', error)
    } 
  }

  async function createProduct(data: CreateProductInput) {
    const response = await api.post('/products', data)
    setProducts([...products, response.data])
  } 
   
  async function updateProduct(id: string, data: UpdateProductInput) {
    const response = await api.put(`/products/${id}`, data)
    console.log(response.data.product)
    const updatedProducts = products.map(product => product.id === id ? response.data.product : product)
    setProducts(updatedProducts)
  }

  async function deleteProduct(id: string) {
    await api.delete(`/products/${id}`)
    const updatedProducts = products.filter(product => product.id !== id)
    setProducts(updatedProducts)
  }

  useEffect(() => {
    fetchProducts() 
  }, [])

  return (
    <ProductsContext.Provider value={{ products ,createProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}