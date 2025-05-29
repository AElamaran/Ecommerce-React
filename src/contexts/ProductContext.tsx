
import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { Product, ProductState, ProductAction, ProductFilters } from '@/types/product';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'react-toastify';

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProducts: [],
  isFormModalOpen: false,
  editingProduct: null,
  isDeleteDialogOpen: false,
  productToDelete: null,
  loading: false,
  error: null,
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        selectedProducts: state.selectedProducts.filter(id => id !== action.payload),
      };
    case 'SET_FILTERED_PRODUCTS':
      return { ...state, filteredProducts: action.payload };
    case 'TOGGLE_PRODUCT_SELECTION':
      return {
        ...state,
        selectedProducts: state.selectedProducts.includes(action.payload)
          ? state.selectedProducts.filter(id => id !== action.payload)
          : [...state.selectedProducts, action.payload],
      };
    case 'CLEAR_SELECTION':
      return { ...state, selectedProducts: [] };
    case 'OPEN_FORM_MODAL':
      return { ...state, isFormModalOpen: true, editingProduct: action.payload || null };
    case 'CLOSE_FORM_MODAL':
      return { ...state, isFormModalOpen: false, editingProduct: null };
    case 'OPEN_DELETE_DIALOG':
      return { ...state, isDeleteDialogOpen: true, productToDelete: action.payload };
    case 'CLOSE_DELETE_DIALOG':
      return { ...state, isDeleteDialogOpen: false, productToDelete: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface ProductContextType {
  state: ProductState;
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  deleteSelectedProducts: () => void;
  openFormModal: (product?: Product) => void;
  closeFormModal: () => void;
  openDeleteDialog: (product: Product) => void;
  closeDeleteDialog: () => void;
  toggleProductSelection: (id: string) => void;
  clearSelection: () => void;
  clearFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialFilters: ProductFilters = {
  search: '',
  category: 'All',
  minPrice: '',
  maxPrice: '',
  stockStatus: 'All',
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [filters, setFilters] = React.useState<ProductFilters>(initialFilters);
  const [storedProducts, setStoredProducts] = useLocalStorage<Product[]>('ecommerce-products', []);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Load products from localStorage on mount
  useEffect(() => {
    if (storedProducts.length > 0) {
      dispatch({ type: 'SET_PRODUCTS', payload: storedProducts });
    }
  }, [storedProducts]);

  // Save products to localStorage when products change
  useEffect(() => {
    if (state.products.length > 0) {
      setStoredProducts(state.products);
    }
  }, [state.products, setStoredProducts]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = state.products;

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (!isNaN(minPrice)) {
        filtered = filtered.filter(product => product.price >= minPrice);
      }
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(product => product.price <= maxPrice);
      }
    }

    // Stock status filter
    if (filters.stockStatus !== 'All') {
      filtered = filtered.filter(product => {
        switch (filters.stockStatus) {
          case 'In Stock':
            return product.stockQuantity > 0;
          case 'Out of Stock':
            return product.stockQuantity === 0;
          case 'Low Stock':
            return product.stockQuantity > 0 && product.stockQuantity < 5;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [state.products, debouncedSearch, filters]);

  // Update filtered products when they change
  useEffect(() => {
    dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filteredProducts });
  }, [filteredProducts]);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    toast.success("Product added successfully!")
  }, []);

  const updateProduct = useCallback((product: Product) => {
    const updatedProduct = { ...product, updatedAt: new Date() };
    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
    toast.success('Product updated successfully!');
  }, []);

  const deleteProduct = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    toast.success("Product deleted successfully!")
  }, []);

  const deleteSelectedProducts = useCallback(() => {
    state.selectedProducts.forEach(id => {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    });
    dispatch({ type: 'CLEAR_SELECTION' });
    toast.success(`${state.selectedProducts.length} products deleted successfully!`)
  }, [state.selectedProducts]);

  const openFormModal = useCallback((product?: Product) => {
    dispatch({ type: 'OPEN_FORM_MODAL', payload: product });
  }, []);

  const closeFormModal = useCallback(() => {
    dispatch({ type: 'CLOSE_FORM_MODAL' });
  }, []);

  const openDeleteDialog = useCallback((product: Product) => {
    dispatch({ type: 'OPEN_DELETE_DIALOG', payload: product });
  }, []);

  const closeDeleteDialog = useCallback(() => {
    dispatch({ type: 'CLOSE_DELETE_DIALOG' });
  }, []);

  const toggleProductSelection = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_PRODUCT_SELECTION', payload: id });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const value: ProductContextType = {
    state,
    filters,
    setFilters,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteSelectedProducts,
    openFormModal,
    closeFormModal,
    openDeleteDialog,
    closeDeleteDialog,
    toggleProductSelection,
    clearSelection,
    clearFilters,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
