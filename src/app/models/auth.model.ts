/**
 * Interface for the registration request payload.
 * - `username`, `email`, `password`, and `password_confirmation` are required fields.
 * - `avatar` is optional (File or null).
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}