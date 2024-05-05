import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/Header';

const extractUniqueValues = (addresses, key) => {
  const uniqueValues = [...new Set(addresses.map((address) => address[key]))];
  return uniqueValues.filter((value) => value);
};

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/addresses');
    return {
      props: { initialAddresses: response.data },
    };
  } catch (error) {
    return { props: { initialAddresses: [] } };
  }
};

const AddressesPage = ({ initialAddresses }) => {
  const [addresses] = useState(initialAddresses);
  const [filteredAddresses, setFilteredAddresses] = useState(initialAddresses);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [additionalFilter, setAdditionalFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(null);
  const [starFilter, setStarFilter] = useState(null);
  const [barPriceFilter, setBarPriceFilter] = useState(null);

  useEffect(() => {
    let updatedAddresses = addresses;

    if (selectedCategory) {
      updatedAddresses = updatedAddresses.filter(
        (address) => address.category === selectedCategory
      );

      if (additionalFilter) {
        switch (selectedCategory) {
          case 'Restaurant':
            updatedAddresses = updatedAddresses.filter(
              (address) => address.restaurantType === additionalFilter
            );
            break;
          case 'Musée':
            updatedAddresses = updatedAddresses.filter(
              (address) => address.currentArtStyle === additionalFilter
            );
            break;
          case 'Bar':
            updatedAddresses = updatedAddresses.filter(
              (address) => address.barType === additionalFilter
            );
            break;
          case 'Parc':
            updatedAddresses = updatedAddresses.filter(
              (address) => address.parkType === additionalFilter
            );
            break;
        }
      }

      if (priceFilter !== null) {
        updatedAddresses = updatedAddresses.filter(
          (address) => address.price === priceFilter
        );
      }

      if (selectedCategory === 'Restaurant' && starFilter !== null) {
        updatedAddresses = updatedAddresses.filter(
          (address) => address.stars === starFilter
        );
      }

      if (selectedCategory === 'Bar' && barPriceFilter !== null) {
        updatedAddresses = updatedAddresses.filter(
          (address) => address.price === barPriceFilter
        );
      }
    }

    setFilteredAddresses(updatedAddresses);
  }, [selectedCategory, additionalFilter, priceFilter, starFilter, barPriceFilter, addresses]);

  const additionalFilterOptions = () => {
    if (!selectedCategory) return [];

    switch (selectedCategory) {
      case 'Restaurant':
        return extractUniqueValues(addresses, 'restaurantType');
      case 'Musée':
        return extractUniqueValues(addresses, 'currentArtStyle');
      case 'Bar':
        return extractUniqueValues(addresses, 'barType');
      case 'Parc':
        return extractUniqueValues(addresses, 'parkType');
    }

    return [];
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/4 p-4">
          <select
            className='w-full p-2 border rounded-md text-black font-mono'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=''>Toutes les catégories</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Musée'>Musée</option>
            <option value='Bar'>Bar</option>
            <option value='Parc'>Parc</option>
          </select>

          {selectedCategory && (
            <>
              <select
                className='mt-4 w-full p-2 border rounded-md text-black font-mono'
                value={additionalFilter}
                onChange={(e) => setAdditionalFilter(e.target.value)}
              >
                <option value=''>Tous les {selectedCategory}s</option>
                {additionalFilterOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {selectedCategory === 'Bar' && (
                <>
                  <input
                    type='number'
                    className='mt-4 w-full p-2 border rounded-md text-black font-mono'
                    value={barPriceFilter || ''}
                    onChange={(e) => setBarPriceFilter(parseInt(e.target.value) || null)}
                    placeholder='Prix moyen'
                  />
                </>
              )}

              {selectedCategory === 'Restaurant' && (
                <>
                  <input
                    type='number'
                    className='mt-4 w-full p-2 border rounded-md text-black font-mono'
                    value={priceFilter || ''}
                    onChange={(e) => setPriceFilter(parseInt(e.target.value) || null)}
                    placeholder='Prix moyen'
                  />
                  <input
                    type='number'
                    className='mt-4 w-full p-2 border rounded-md text-black font-mono'
                    value={starFilter || ''}
                    onChange={(e) => setStarFilter(parseInt(e.target.value) || null)}
                    placeholder="Nombre d'étoiles"
                  />
                </>
              )}
            </>
          )}
        </div>

        <div className='w-1/2 p-4 ml-20'>
          {filteredAddresses.length === 0 ? (
            <p>Aucune adresse trouvée</p>
          ) : (
            <ul className='space-y-4'>
              {filteredAddresses.map(({ _id, name }) => (
                <li key={_id} className='p-4 border rounded-md hover:bg-gray-100 text-center bg-white text-black font-mono'>
                  <Link href={`/addresses/${_id}`} className='text-lg font-semibold'>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;
