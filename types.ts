import { ReactNode } from 'react';

export enum Category {
  ANAK = 'Kesehatan Anak',
  LANSIA = 'Lansia',
  PENYAKIT_UMUM = 'Penyakit Umum',
  GAYA_HIDUP = 'Gaya Hidup',
  DARURAT = 'P3K & Darurat'
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string; // FontAwesome class
  component: ReactNode;
}

export interface FoodItem {
  name: string;
  status: 'aman' | 'batasi' | 'hindari';
  desc: string;
}
