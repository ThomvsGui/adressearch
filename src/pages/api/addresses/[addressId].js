import { mw } from "@/api/mw"
import { deleteAddress, readAddress, updateAddress } from "@/db/crud"

const handle = mw(async (req, res) => {
  const { addressId } = req.query

  if (req.method === "GET") {
    const address = await readAddress(addressId)

    if (!address) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(address)

    return
  }

  if (req.method === "PATCH") {
    const addressData = req.body
    console.log(addressData)
    const updatedAddress = await updateAddress(addressId, { addressData })

    if (!updatedAddress) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(updatedAddress)

    return
  }

  if (req.method === "DELETE") {
    const addressToBeDelete = await deleteAddress(addressId)

    if (!addressToBeDelete) {
      res.status(404).send({ error: "Not found" })

      return
    }

    res.send(addressToBeDelete)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
