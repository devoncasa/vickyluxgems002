import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { GoogleGenAI } from '@google/genai';

// Centralized AI instance creation for secure and efficient use of the API key from environment variables.
// In a Vite environment, client-side environment variables must be prefixed with VITE_ and accessed via import.meta.env.
const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY;
let geminiInstance: GoogleGenAI | null = null;

if (API_KEY) {
    try {
        geminiInstance = new GoogleGenAI({ apiKey: API_KEY });
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
    }
} else {
    console.warn("Vicky LuxGems AI Features Disabled: VITE_GEMINI_API_KEY environment variable not set.");
}

interface AppContextType {
    isAdminPanelOpen: boolean;
    setIsAdminPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    products: Product[];
    addProduct: (newProduct: Product) => void;
    deleteProduct: (productId: string) => void;
    gemini: GoogleGenAI | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    
    const addProduct = (newProduct: Product) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };
    
    const deleteProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    };

    return (
        <AppContext.Provider value={{ 
            isAdminPanelOpen, 
            setIsAdminPanelOpen,
            products,
            addProduct,
            deleteProduct,
            gemini: geminiInstance
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};