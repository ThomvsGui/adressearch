import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import Header from '@/components/Header';
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params }) => {
  const { addressId } = params;

  const response = await axios.get(`http://localhost:3000/api/addresses/${addressId}`);
  const address = response.data;

  return {
    props: { address },
  };
};

const validationSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  category: yup.string().required(),
  restaurantType: yup.string(),
  stars: yup.number(),
  price: yup.number(),
  barType: yup.string(),
  parkType: yup.string(),
  publicOrPrivate: yup.boolean(),
  museumArtType: yup.string(),
  currentArtStyle: yup.string(),
  isPaid: yup.boolean(),
  museumAndParkPrice: yup.number(),
});

const EditAddressPage = ({ address }) => {
  const router = useRouter();
  const handleSubmit = async (values) => {
    await axios.patch(`http://localhost:3000/api/addresses/${address._id}`, values);
    router.push("/")
  };

  return (
    <div>
      <Header />
      <Formik
        initialValues={address}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div className="flex justify-center">
            <Form className="w-1/3 flex">
              <FormField name="name" label="Name" placeholder="Name" />
              <FormField name="address" label="Address" placeholder="Address" />
              <FormField name="city" label="City" placeholder="City" />
              <FormField name="postalCode" label="Postal Code" placeholder="Postal Code" />
              <FormField name="country" label="Country" placeholder="Country" />
              <FormField name="description" label="Description" placeholder="Description" />

              <FormField
                as="select"
                name="category"
                label="Category"
                onChange={(e) => setFieldValue("category", e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Musée">Musée</option>
                <option value="Bar">Bar</option>
                <option value="Parc">Parc</option>
              </FormField>

              {values.category === "Restaurant" && (
                <>
                  <FormField
                    name="restaurantType"
                    label="Type de cuisine"
                  />
                  <FormField
                    name="stars"
                    label="Nombre d'étoiles"
                    type="number"
                    min={1}
                    max={3}
                  />
                  <FormField
                    name="price"
                    label="Prix moyen"
                    type="number"
                    min={1}
                    max={5}
                  />
                </>
              )}

              {values.category === "Musée" && (
                <>
                  <FormField
                    name="currentArtStyle"
                    label="Courant artistique"
                  />
                  <FormField
                    name="museumArtType"
                    label="Type d'art"
                  />
                  <FormField
                    name="isPaid"
                    type="checkbox"
                    onChange={(e) => setFieldValue("isPaid", e.target.checked)}
                  />
                  <span>Payant ?</span>
                  {values.isPaid && (
                    <FormField
                      name="museumAndParkPrice"
                      label="Prix"
                      type="number"
                      min={1}
                      max={5}
                    />
                  )}
                </>
              )}

              {values.category === "Bar" && (
                <>
                  <FormField
                    name="barType"
                    label="Type de bar"
                  />
                  <FormField
                    name="price"
                    label="Prix moyen"
                    type="number"
                    min={1}
                    max={5}
                  />
                </>
              )}

              {values.category === "Parc" && (
                <>
                  <FormField
                    name="parkType"
                    label="Type de parc"
                  />
                  <FormField
                    name="isPaid"
                    type="checkbox"
                    onChange={(e) => setFieldValue("isPaid", e.target.checked)}
                  />
                  <span>Payant ?</span>
                  {values.isPaid && (
                    <FormField
                      name="museumAndParkPrice"
                      label="Prix"
                      type="number"
                      min={1}
                      max={5}
                    />
                  )}
                </>
              )}

              <Button type="submit">Mettre à jour</Button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default EditAddressPage;
