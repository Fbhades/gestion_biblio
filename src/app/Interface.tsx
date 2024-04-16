export interface Book {
    id_book: number;
    label: string;
    author: string;
    slug: string;
    isbn: number;
    description: string;
    image?: string;
    category: number;
  }
export interface Category {
    id_cat: number;
    label: string;
  }
export interface Sous_Category {
    id_sous_cat: number;
    label: string;
    parent_cat: number;
}
export interface Reservation {
    id_reservation: number;
    user_id: number;
    copy_id: number;
    reservation_date: string;
    pickup_date: string;
    return_date: string;
}