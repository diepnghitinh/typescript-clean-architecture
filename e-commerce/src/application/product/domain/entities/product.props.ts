export interface ProductProps {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
