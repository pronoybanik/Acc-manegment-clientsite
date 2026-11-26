export type HomepageProduct = {
  _id: string;
  brand?: {
    name?: string;
    _id?: string;
  };
  price: number;
  category: string;
  description: string;
  imageURLs: string;
  name: string;
  unit: string;
};

export type HomepageBrand = {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  image?: string;
};
