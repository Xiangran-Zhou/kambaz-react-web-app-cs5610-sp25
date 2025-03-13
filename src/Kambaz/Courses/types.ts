export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string; // only some courses have this
  image?: string; // optional, since your JSON doesn't include it by default
}
