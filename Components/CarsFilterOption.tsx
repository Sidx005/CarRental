import React, { useEffect, useState } from 'react';

const CarsFilterOption = ({ carsList, setBrand,orderCarList }: any) => {
  const [brandList, setBrandList] = useState<string[]>([]);

  useEffect(() => {
    if (carsList) {
      filterCarSet();
    }
  }, [carsList]);

  const filterCarSet = () => {
    const uniqueBrands = new Set(carsList.map((car: any) => car.carBrand));
    setBrandList(["All", ...Array.from(uniqueBrands) as string[]]); // Add "All" option
  };

  return (
    <div className='mt-10 flex justify-between'>
      <div>
        <h2 className="text-[30px] font-bold">Cars Catalog</h2>
        <h2>Explore our cars you might like</h2>
      </div>

      <div className="flex gap-5">
        <select 
          onChange={(e) => orderCarList(e.target.value)} 
          className="select select-bordered w-full"
        >
            
            <option disabled selected >Price</option>
          <option value={-1}>Min to Max</option>
          <option value={1}>Max to Min</option>
        </select>
      </div> <div className="flex gap-5">
        <select 
          onChange={(e) => setBrand(e.target.value)} 
          className="select select-bordered w-full"
        >
            <option disabled selected >Manufactural</option>
          {brandList.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CarsFilterOption;
