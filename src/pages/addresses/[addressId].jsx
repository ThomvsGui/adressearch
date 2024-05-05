import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import Link from "next/link";
import Header from '@/components/Header';

export const getServerSideProps = async ({ query }) => {
  const addressId = query.addressId;
  const details = await axios.get(`http://localhost:3000/api/addresses/${addressId}`);
  const addressdata = details.data;
  return {
    props: { addressdata },
  };
};

const AddressDetails = ({ addressdata }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/addresses/${addressdata._id}`);
    router.push("/");
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <Header />
      <div className="flex flex-col items-center justify-center mt-8 space-y-4 font-mono">
        <h1 className="text-3xl font-bold">{addressdata.name}</h1>
        <p className="text-xl">Adresse : {addressdata.address}</p>
        <p className="text-xl">Ville : {addressdata.city}</p>
        <p className="text-xl">Code postal : {addressdata.postalCode}</p>
        <p className="text-xl">Pays : {addressdata.country}</p>
        <p className="text-xl">Catégorie : {addressdata.category}</p>

        {addressdata.category === "Restaurant" && (
          <div className="text-xl">
            <p>Type of restaurant : {addressdata.restaurantType}</p>
            <p>Stars : {addressdata.stars}</p>
            <p>Average price : {addressdata.price}$</p>
          </div>
        )}

        {addressdata.category === "Musée" && (
          <div className="text-xl"> 
            <p>Courant artistique : {addressdata.currentArtStyle}</p>
            <p>Type d'art : {addressdata.museumArtType}</p>
            <p>Payant ? {addressdata.isPaid ? "Oui" : "Non"}</p>
            {addressdata.isPaid && (
              <p>Prix du musée : {addressdata.museumAndParkPrice}$</p>
            )}
          </div>
        )}

        {addressdata.category === "Bar" && (
          <div className="text-xl">
            <p>Type de bar : {addressdata.barType}</p>
            <p>Prix moyen : {addressdata.price}$</p>
          </div>
        )}

        {addressdata.category === "Parc" && (
          <div className="text-xl">
            <p>Type de parc : {addressdata.parkType}</p>
            <p>Public ou privé ? {addressdata.publicOrPrivate ? "Privé" : "Public"}</p>
            <p>Payant ? {addressdata.isPaid ? "Oui" : "Non"}</p>
            {addressdata.isPaid && (
              <p>Prix du parc : {addressdata.museumAndParkPrice}$</p>
            )}
          </div>
        )}

        <div className="flex justify-start mt-6 space-x-4">
          <Button onClick={handleDelete} variant="danger">DELETE</Button>
          <Link href={`/addresses/${addressdata._id}/edit`}>
            <Button variant="primary">EDIT</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
