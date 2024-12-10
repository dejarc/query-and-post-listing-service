export type FilteredQuery = {
  [str: string]: string;
};
export type Posting = {
  id: string;
  companyId: string;
  companyName?: string;
  freight:  {
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
};

export type PostingApiResponse = {
  postings: Posting[];
};
export type TruncatedPosting = {
  companyName: string;
  freight: {
    weightPounds: number;
    equipmentType: string;
    fullPartial: string;
    lengthFeet: number;
  };
};
export type CompanyApiResponse = TruncatedPosting[];
export type ApiError = {
  message: string;
  statusCode: number;
  context?: string[]
}
