export type Course = {
  id: number;
  title: string;
  thumbnail: string | null;
  total_hours: number;
  creator_name: string;
  creator_id?: number;
};

export type Chapter = {
  id: number;
  title: string;
  video_url: string | null;
  video_duration: number;
  order: number;
};

export type Section = {
  id: number;
  title: string;
  order: number;
  chapters: Chapter[];
};

export type CourseDetail = {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  total_hours: number;
  requirements: string;
  sections: Section[];
  is_published: boolean;
  creator_name?: string;
};
