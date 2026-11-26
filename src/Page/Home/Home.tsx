import Header from "../../Components/Header/Header";
import OurServices from "../../Components/OurServices/OurServices";
import OurProducts from "../../Components/OurProducts/OurProducts";
import ClientReviews from "../../Components/ClientReviews/ClientReviews";
import {
  FeaturedKitchens,
  FoodieDifference,
  FeastBox,
  ClubBanner,
} from "../../Components/HomepageSections/HomepageSections";
import { useGetBrandQuery } from "../../Features/Brands/BrandsAPi";
import { useGetProductsQuery } from "../../Features/Products/ProductApi";

const Home = () => {
  const productsQuery = useGetProductsQuery({});
  const brandsQuery = useGetBrandQuery({});

  const products = productsQuery.data?.data?.products ?? [];
  const brands = brandsQuery.data?.data?.brands ?? [];

  return (
    <main>
      <Header />
      <OurServices />
      <OurProducts
        products={products}
        brands={brands}
        brandsLoading={brandsQuery.isLoading}
        isLoading={productsQuery.isLoading}
        isError={productsQuery.isError}
        error={productsQuery.error}
      />
      <FeastBox />
      <FeaturedKitchens
        brands={brands}
        isLoading={brandsQuery.isLoading}
        isError={brandsQuery.isError}
      />
      <FoodieDifference />
      <ClientReviews />
      <ClubBanner />
    </main>
  );
};

export default Home;
