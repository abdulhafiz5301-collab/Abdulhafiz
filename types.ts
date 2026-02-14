
export interface User {
  id: string;
  name: string;
  email: string;
  birthYear?: string;
  bio?: string;
  avatar?: string;
}

export type Genre = 'Sarguzasht' | 'Fantastika' | 'Detektiv' | 'Romantika' | 'Tarixiy' | 'Barchasi';

export interface Story {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  genre: Genre;
  createdAt: string;
  imageUrl?: string;
}

export interface AppState {
  currentUser: User | null;
  stories: Story[];
}
