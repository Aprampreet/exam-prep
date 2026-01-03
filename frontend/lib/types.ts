export interface Profile {
  id: number;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  college: string | null;
  location: string | null;
  degree: string | null;
  passing_year: number | null;
}



export interface User {
  id: number;
  email: string;
  phone_number: string;
  profile: Profile | null;
}



export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}