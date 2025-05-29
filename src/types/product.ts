export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  stockQuantity: number;
  description?: string;
  imageUrl?: string; // base64 string or undefined
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'Electronics' 
  | 'Clothing' 
  | 'Books' 
  | 'Home' 
  | 'Sports' 
  | 'Other';

export interface ProductFormData {
  name: string;
  price: string;
  category: ProductCategory | '';
  stockQuantity: string;
  description: string;
  imageFile: File | null;
}

export interface ProductFilters {
  search: string;
  category: ProductCategory | 'All';
  minPrice: string;
  maxPrice: string;
  stockStatus: 'All' | 'In Stock' | 'Out of Stock' | 'Low Stock';
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProducts: string[];
  isFormModalOpen: boolean;
  editingProduct: Product | null;
  isDeleteDialogOpen: boolean;
  productToDelete: Product | null;
  loading: boolean;
  error: string | null;
}

export type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_FILTERED_PRODUCTS'; payload: Product[] }
  | { type: 'TOGGLE_PRODUCT_SELECTION'; payload: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'OPEN_FORM_MODAL'; payload?: Product }
  | { type: 'CLOSE_FORM_MODAL' }
  | { type: 'OPEN_DELETE_DIALOG'; payload: Product }
  | { type: 'CLOSE_DELETE_DIALOG' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
