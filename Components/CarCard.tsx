import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CarCard = (props: any) => {
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    if (props.car) {
      setCar(props.car);
    }
  }, [props.car]);

  if (!car) return null;

  return (
    <div className="group overflow-hidden relative bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:bg-gray-50 border border-gray-200 flex flex-col items-center w-80 h-auto">
      {car.image?.url ? (
        <div className="w-72 h-72 relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={car.image.url}
            height={100}
            width={100}
            objectFit='cover'
            alt={car.name || 'Car image'}
            className="group-hover:scale-105 w-full h-full object-contain   transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-full h-52 bg-gray-200 rounded-lg mb-4" />
      )}

      <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors text-center">
        {car.name}
      </h2>
      <p className="text-lg font-medium text-gray-600">${car.price}</p>

      <div className="absolute flex p-3 gap-3 text-white rounded-xl bg-gradient-to-tr from-blue-600 to-blue-300 bottom-[-100%] group-hover:bottom-6 transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2">
        <button className="p-2 h-10 w-10 flex items-center justify-center rounded-full text-white bg-gradient-to-tr from-blue-300 to-blue-600">
          +
        </button>
        <Link href={`/car/${car.id}`} className="p-2">
          Book Car
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
