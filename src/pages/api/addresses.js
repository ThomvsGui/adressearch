import { mw } from "@/api/mw";
import { createAddress, readAddresses } from "@/db/crud";

const handle = mw(async (req, res) => {
  try {
    console.log("Request method:", req.method);

    if (req.method === "GET") {
      console.log("Reading addresses");
      const addresses = await readAddresses();
      res.send(addresses);
      return;
    }

    if (req.method === "POST") {
      console.log("Creating a new address");
      console.log(req.body)
      const values = req.body
      const newAddress = await createAddress(values);
      res.send(newAddress);
      return;
    }

    console.log("Method not found");
    res.status(404).send({ error: "Not found" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "Server error" });
  }
});

export default handle;
