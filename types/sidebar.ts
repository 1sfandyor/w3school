export interface SubTutorial {
  id: string;
  title: string;
  slug: string;
  href?: string;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  href?: string;
  subTutorial?: boolean;
  subTutorials?: SubTutorial[];
  content?: React.ReactNode;
}

export interface HTMLSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface LessonsContent extends Array<HTMLSection> {}