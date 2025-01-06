export interface FilteredQuery {
  [str: string]: string | Array<string>;
}
export interface Posting {
  id: string;
  companyId: string;
  companyName?: string;
  freight?: {
    equipmentType?: string;
    fullPartial?: string;
    lengthFeet?: number;
    weightPounds?: number;
    comments?: Array<{
      comment: string;
    }>;
  };
  lane?: {
    origin?: {
      placeId?: number;
      location?: {
        lat: number;
        lon: number;
      };
      city?: string;
      county?: string;
      postalCode?: string;
      stateProv?: string;
    };
    destination?: {
      placeId?: number;
      location?: {
        lat: number;
        lon: number;
      };
      city?: string;
      county?: string;
      postalCode?: string;
      stateProv?: string;
    };
  };
}

export interface PostingApiResponse {
  postings: Posting[];
}
export interface TruncatedPosting {
  companyName?: string;
  freight?: {
    weightPounds?: number | null;
    equipmentType?: string | null;
    fullPartial?: string | null;
    lengthFeet?: number | null;
  };
}
export type CompanyApiResponse = TruncatedPosting[];
export type PostingValidator = (posting: Posting) => boolean;
export interface ValidatorOptions {
  queryTransformer?: (srcVal?: string) => undefined | string | number | boolean;
  postTransformer?: (srcVal?: string) => undefined | string | number | boolean;
}
