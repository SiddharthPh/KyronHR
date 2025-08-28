export interface CatalogItem {
  utid: string;
  rewardName: string;
  currencyCode: string;
  minValue: number;
  maxValue: number;
  countries: string[];
  fulfillmentType: string;
}

export interface Brand {
  brandKey: string;
  brandName: string;
  description: string;
  imageUrl: string;
  status: string;
  category: string;
  rewardType: string;
  items: CatalogItem[];
}

export interface Catalog {
  catalogName: string;
  totalBrands: number;
  brands: Brand[];
  categories: string[];
}

export interface CartItem {
  id: string;
  brand: Brand;
  catalogItem: CatalogItem;
  amount: number;
  recipient?: {
    name: string;
    email: string;
  };
  message?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  birthday?: string;
}

export interface BirthdayGift {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  utid: string;
  brandName: string;
  amount: number;
  message: string;
  deliveryDate: string;
  externalRefID: string;
}
