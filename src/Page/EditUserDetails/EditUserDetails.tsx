import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../Features/Login/LoginApi";

const EditUserDetails = () => {
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(id);
  console.log(data);

  return <div>{id}</div>;
};

export default EditUserDetails;
