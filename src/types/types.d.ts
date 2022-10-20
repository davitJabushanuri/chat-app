export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}
