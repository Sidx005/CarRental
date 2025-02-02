import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import Modal from './Modal';

const CarsList = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  useEffect(() => {
    if (props.carsList) {
      setLoading(false);
    }
  }, [props.carsList]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
        {!loading ? (
          props.carsList.map((car: any, index: number) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setSelectedCar(car);
                (document.getElementById('my_modal_1') as any).showModal();
              }}
            >
              <CarCard car={car} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal backdrop-blur-md p-5 rounded-lg">
        {selectedCar && <Modal car={selectedCar} />}
      </dialog>
    </>
  );
};

export default CarsList;
