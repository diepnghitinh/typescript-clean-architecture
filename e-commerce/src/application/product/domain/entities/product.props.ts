export interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
