interface Course {
  id: string;
  name: string;
}

interface Cohort {
  id: string;
  name: string;
}

interface MarketingCycle {
  id: string;
  name: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinNewsLetter: boolean;
  course: Course;
  cohort: Cohort;
  marketingCycle: MarketingCycle;
  createdAt: string;
}

export interface LeadResponse {
  success: boolean;
  data: {
    items: Lead[];
    metadata: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  message: string;
}
