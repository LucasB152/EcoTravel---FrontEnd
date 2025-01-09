export interface Request {
  id?: string;
  userFullName: string;
  email: string;
  contactPhone: string;
  hostStatus: string;
  company?: string;
  identifier?: string;
  websiteUrl?: string;
  services: string[];
  description: string;
  files?: string[];
  motivation: string;
  terms: boolean;
}
