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
export interface User{
  id_user : number;
  first_name : string;
  last_name :string;
  role:string;
  email:string;
}
export interface ReservationAdmin {
  id_reservation: number;
  user_id: number;
  copy_id: number;
  reservation_date: string;
  pickup_date: string;
  return_date: string;
  book_label:string;
  first_name:string;
  last_name:string;
  user_email:string;
}
export interface loans{
  id_loan:number;
  user_email:string;
  book_label:string;
  loan_date:string;
  return_date: string;
  expected_return_date: string;
}