import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import Header from '@/components/Header';
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  description: "",
  category: "",
  restaurantType: "",
  stars: 1,
  price: 1,
  barType: "",
  parkType: "",
  publicOrPrivate: false,
  museumArtType: "",
  currentArtStyle: "",
  isPaid: false,
  museumAndParkPrice: 0,
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

const CreateAddressPage = () => {
  const handleSubmit = async (values, { resetForm }) => {
      await axios.post("http://localhost:3000/api/addresses", values);
      console.log(values)
      resetForm();

  };

  return (
    <div>
      <Header />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div className="flex justify-center">
            <Form className="w-1/3 flex font-mono"> 
              <FormField name="name" label="Nom" placeholder="Nom" />
              <FormField name="address" label="Adresse" placeholder="Adresse" />
              <FormField name="city" label="Ville" placeholder="Ville"/>
              <FormField name="postalCode" label="Code Postal" placeholder="Code postal"/>
              <FormField name="country" label="Pays" placeholder="Pays"/>
              <FormField name="description" label="Description" placeholder="Description"/>

              <FormField
                as="select"
                name="category"
                label="Catégorie"
                onChange={(e) => setFieldValue("category", e.target.value)}
              >
                <option value="">Sélectionne une catégorie</option>
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
                  <FormField
                    name="publicOrPrivate"
                    type="checkbox"
                    onChange={(e) => setFieldValue("publicOrPrivate", e.target.checked)}
                  />
                  <span>Privé ?</span>

                  {values.isPaid && (
                    <FormField
                      name="museumAndParkPrice"
                      label="Prix"
                      type="number"
                      min={1}
                    />
                    
                  )}
                </>
              )}

              <Button type="submit">Créer</Button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default CreateAddressPage;
