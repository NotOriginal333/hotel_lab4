import React, {useEffect, useState} from "react";
import Card from "./utils/card";
import "./styles/CottageList.css";
import {useNavigate} from 'react-router-dom';

const CottageList = () => {
    const [cottages, setCottages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const pageSize = 20;
    const navigate = useNavigate();

    const fetchCottages = async (page) => {
        try {
            const response = await fetch(`/api/resort/cottages/?page=${page}&page_size=${pageSize}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setCottages(prevCottages => [...prevCottages, ...data]);
                setHasMore(data.length === pageSize);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.error("Error fetching cottages:", error);
        }
    };

    useEffect(() => {
        fetchCottages(currentPage);
    }, [currentPage]);

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleMoreInfo = (id) => {
        navigate(`/cottages/${id}`);
    };

    return (
        <div className="cottage-list">
            <div className="cottage-container">
                {cottages.map((cottage) => (
                    <Card
                        key={cottage.id}
                        title={cottage.name}
                        body={`Category: ${cottage.category}, Capacity: ${cottage.total_capacity},
                         Price: ${cottage.price_per_night}`}
                        onMoreInfo={() => handleMoreInfo(cottage.id)} // Handle navigation
                    />
                ))}
            </div>
            {hasMore && (
                <button className="load-more" onClick={loadMore}>
                    Show More
                </button>
            )}
        </div>
    );
};

export default CottageList;
