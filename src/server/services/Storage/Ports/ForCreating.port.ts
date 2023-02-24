export interface ForCreating {
  createItem: <T>(item: T) => Promise<void>;
}
