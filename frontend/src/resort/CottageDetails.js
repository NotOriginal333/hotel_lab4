import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCsrfToken} from "../utils/csrf";

const CottageDetails = () => {
    const {id: cottageId} = useParams();
    const [cottage, setCottage] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const [availabilityMessage, setAvailabilityMessage] = useState('');

    useEffect(() => {
        const fetchCottage = async () => {
            try {
                const response = await fetch(`/api/resort/cottages/${cottageId}/`);
                if (!response.ok) throw new Error('Failed to fetch cottage details');
                const data = await response.json();
                setCottage(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCottage();
    }, [cottageId]);

    const checkAvailability = async () => {
        try {
            const csrfToken = getCsrfToken();
            const response = await fetch(`/api/resort/check-availability/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({
                    cottage: cottage.id,
                    check_in: checkIn,
                    check_out: checkOut
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setAvailabilityMessage('Error checking availability');
                return;
            }

            const data = await response.json();
            console.log('Availability response:', data);
            setIsAvailable(data.available);
            setAvailabilityMessage(data.message);
        } catch (error) {
            console.error('Error checking availability:', error);
            setAvailabilityMessage('Error checking availability');
        }
    };

    const handleBooking = async () => {
        try {
            const csrfToken = getCsrfToken();
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/resort/booking/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken,
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify({
                    cottage_id: cottage.id,
                    check_in: checkIn,
                    check_out: checkOut
                })
            });

            if (response.ok) {
                alert('Booking confirmed');
            } else {
                alert('Failed to book the cottage');
            }
        } catch (error) {
            console.error('Error making booking:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (errorMessage) return <div>Error: {errorMessage}</div>;

    return (
        <div>
            <h2>{cottage.name}</h2>
            <p>Category: {cottage.category}</p>
            <p>Price per night: {cottage.price_per_night}</p>
            <p>Total Capacity: {cottage.total_capacity}</p>

            <label>Check In</label>
            <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check Out</label>
            <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
            />

            <button onClick={checkAvailability}>Check Availability</button>

            {availabilityMessage && <p>{availabilityMessage}</p>}

            <button onClick={handleBooking} disabled={isAvailable !== true}>
                Book Cottage
            </button>
        </div>
    );
};

export default CottageDetails;
