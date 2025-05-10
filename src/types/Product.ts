export interface Product {
    id: number;
    name: string;
    price: number | string;
    image: string;
    rating: number;
    reviews: number;
    brand: string;
    category: string;
    color: string;
    size: string[];
    description: string;
    discount?: number;
    freeShipping?: boolean;
    returnAvailable?: boolean;
}

export interface CartItem extends Omit<Product, 'size'> {
    quantity: number;
    size: string;
    color: string;
}
