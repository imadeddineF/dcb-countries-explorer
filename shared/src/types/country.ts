export interface RawCountry {
  names: { common: string; official: string };
  codes: { alpha_2?: string; alpha_3: string };
  flag: {
    url_png: string;
    url_svg: string;
    description?: string;
  };
  capitals?: { name: string; attributes?: { primary?: boolean } }[];
  region: string;
  subregion?: string;
  population: number;
  languages?: { name: string }[];
}

export interface CountriesResponse {
  data: {
    objects: RawCountry[];
    meta?: {
      total?: number;
      count?: number;
      limit?: number;
      offset?: number;
      more?: boolean;
    };
  };
}

export interface Country {
  code: string;
  name: string;
  officialName: string;
  flagPng: string;
  flagSvg: string;
  flagAlt?: string;
  capital?: string;
  region: string;
  subregion?: string;
  population: number;
  languages: string[];
}
