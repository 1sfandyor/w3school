export interface HtmlElement {
  starter_tag: string
  content: string;
  end_tag: string;
}

export interface HtmlVersion {
  id: string,
  year: string;
  version: string;
};

export interface CompanyInfo {
  company: string;
  contact: string;
  country: string;
}