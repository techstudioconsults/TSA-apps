export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  courseId: string;
  cohortId: string;
  joinNewsLetter: boolean;
  utm_source: string;
  utm_medium: string;
  utm_content: string;
  utm_term: string;
}

export interface MarketingCycle {
  data: {
    createdAt: string;
    description: string;
    endDate: string;
    id: string;
    startDate: string;
    title: string;
  };
}
