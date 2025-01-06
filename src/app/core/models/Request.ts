export interface Request {
  fullName: string;
  email: string;
  phone: string;
  status: string;
  company?: string;
  identifier?: string;
  website?: string;
  services: string[];
  description: string;
  motivation: string;
  terms: boolean;
}
