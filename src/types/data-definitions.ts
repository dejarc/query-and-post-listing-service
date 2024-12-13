export interface FilteredQuery {
  [str: string]: string;
}
export interface Posting {
  id: string;
  companyId: string;
  companyName?: string;
  freight: {
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
    weightPounds: number;
    comments: Array<{
      comment: string;
    }>;
  };
  lane: {
    origin: {
      placeId: number;
      location: {
        lat: number;
        lon: number;
      };
      city: string;
      county: string;
      postalCode: string;
      stateProv: string;
    };
    destination: {
      placeId: number;
      location: {
        lat: number;
        lon: number;
      };
      city: string;
      county: string;
      postalCode: string;
      stateProv: string;
    };
  };
}

export interface PostingApiResponse {
  postings: Posting[];
};
export interface TruncatedPosting {
  companyName: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
};
export interface ApiError {
  message: string;
  statusCode: number;
  context?: string[];
};
export interface Validator {
  query_path: string;
  target_path: string;
  query_val: any;
  setQueryValue(src_obj: any): void;
  hasValue(target_obj: any): boolean;
};

export type CompanyApiResponse = TruncatedPosting[];
