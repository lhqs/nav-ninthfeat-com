export interface Website {
  url: string;
  title: string;
  tags: string;
  description?: string;
}

export interface SearchEngine {
  title: string;
  url: string;
}

export interface SearchCategory {
  tag: string;
  list: SearchEngine[];
}

export interface SearchData {
  data: SearchCategory[];
}

export interface WebsiteWithMetadata extends Website {
  tagArray: string[];
  favicon?: string;
  preview?: string;
  clicks?: number;
}
