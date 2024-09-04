import Env from "@/config/Env";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomNumber(): number {
  const min = 2000;
  const max = 20000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function bytesToMB(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function getS3ImageUrl(path: string): string {
  return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${path}`
} // got this url from supabase storage of image


export function capitializeFirst(data: string): string {
  return `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
} // method to captalize the first letter of word, ex. "aman" => "Aman"
