export interface ForRemovingUser {
  removeUser(id: string): Promise<void>;
}