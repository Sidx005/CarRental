import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { booking, getStoreLocations } from '@/services';

const Form = ({ car }:any) => {
    const { user } = useUser();
    const [locations, setLocations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        location: '',
        pickUpDate: '',
        dropOffDate: '',
        pickUpTime: '',
        dropOffTime: '',
        contactNumber: '',
        userName: '',
        carId: ''
    });

    // Initialize form with car ID and user data
    useEffect(() => {
        if (car?.id) {
            setFormData(prev => ({ ...prev, carId: car.id }));
        }
    }, [car]);

    useEffect(() => {
        if (user?.fullName) {
            setFormData(prev => ({ ...prev, userName: user.fullName }));
        }
    }, [user]);

    // Fetch store locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const resp = await getStoreLocations();
                setLocations(resp.storesLocations || []);
            } catch (err) {
                setError('Failed to load locations. Please try again.');
                console.error('Error fetching locations:', err);
            }
        };
        fetchLocations();
    }, []);

    const validateForm = () => {
        if (!formData.carId) {
            setError('No car selected for booking');
            return false;
        }
        if (!formData.location) {
            setError('Please select a pickup location');
            return false;
        }
        if (!formData.pickUpDate || !formData.dropOffDate) {
            setError('Please select both pickup and drop-off dates');
            return false;
        }
        if (!formData.pickUpTime || !formData.dropOffTime) {
            setError('Please select both pickup and drop-off times');
            return false;
        }
        if (!formData.contactNumber) {
            setError('Please provide a contact number');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(''); 
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await booking(formData);
            if (response?.createBooking?.id) {
                console.log('Booking successful:', response.createBooking.id);
            } else {
                throw new Error('Booking failed');
            }
            alert('Booking successful')
            setFormData(prev => ({
                location: '',
                pickUpDate: '',
                dropOffDate: '',
                pickUpTime: '',
                dropOffTime: '',
                contactNumber: '',
                carId: prev.carId, 
                userName: prev.userName
            }));
        } catch (err) {
            setError('Failed to create booking. Please try again.');
            console.error('Booking error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="font-bold text-lg block mb-2">
                        Pick-Up Location
                    </label>
                    <select
                        name="location"
                        className="w-full p-3 border rounded-md bg-gray-50"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="">Select location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location.address}>
                                {location.address}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-bold block mb-2">
                            Pick Up Date
                        </label>
                        <input
                            type="date"
                            name="pickUpDate"
                            className="w-full p-3 border rounded-md"
                            value={formData.pickUpDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div>
                        <label className="font-bold block mb-2">
                            Drop Off Date
                        </label>
                        <input
                            type="date"
                            name="dropOffDate"
                            className="w-full p-3 border rounded-md"
                            value={formData.dropOffDate}
                            onChange={handleChange}
                            min={formData.pickUpDate || new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-bold block mb-2">
                            Pick Up Time
                        </label>
                        <input
                            type="time"
                            name="pickUpTime"
                            className="w-full p-3 border rounded-md"
                            value={formData.pickUpTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="font-bold block mb-2">
                            Drop Off Time
                        </label>
                        <input
                            type="time"
                            name="dropOffTime"
                            className="w-full p-3 border rounded-md"
                            value={formData.dropOffTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="font-bold block mb-2">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        name="contactNumber"
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter your contact number"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full p-3 text-white font-bold rounded-md transition-colors
                        ${isSubmitting 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
            </div>
        </div>
    );
};

export default Form;