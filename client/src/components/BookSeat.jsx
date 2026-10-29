/**
 * inspiration repo: https://github.com/bradtraversy/vanillawebprojects
 * movie seat booking: https://github.com/bradtraversy/vanillawebprojects/tree/master/movie-seat-booking
 * but in react 🤓
 */

import '../css/bookMovie.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "axios";
import clsx from 'clsx'
import KhaltiCheckout from "khalti-checkout-web";
import { Route } from "react-router-dom";


const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

export default function BookSeat() {
    var occupied = [];
    const { showId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState([]);//useState(movies[showId-1])
    const [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/seats/${showId}`).then((response) => {
            setSelectedMovie(response.data)
        })
    }, []);
    selectedMovie.map((val) => {
        occupied.push(val.occupied)
    })

    const addSeat = () => {
        var json = sessionStorage.getItem("token");
        if (json) {
            var data = JSON.parse(json);
            if (data) {
                var userId = data.id;
            }
        }
        let checkout = new KhaltiCheckout(config);
        checkout.show({ amount: selectedSeats.length * 300 * 100 });
        Axios.post("http://localhost:3001/api/book-seat", {
            Seates: selectedSeats,
            showId: showId,
            userId: userId,
        }).then((response) => {
            <Route exact path="/dashboard" />
        });


    };


    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": `http://localhost:3000/movie/${showId}`,
        "eventHandler": {
            onSuccess(payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
            },
            // onError handler is optional
            onError(error) {
                // handle errors
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };


    return (

        <div className="App mt-5">
            <ul className="ShowCase">
                <li>
                    <span className="seat" /> <small>Avilable</small>
                </li>
                <li>
                    <span className="seat selected" /> <small>Selected</small>
                </li>
                <li>
                    <span className="seat occupied" /> <small>Occupied</small>
                </li>
            </ul>
            <Cinema
                movie={occupied}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
            />
            <p className="info">
                You have selected <span className="count">{selectedSeats.length}</span>{' '}
                seats for the price of{' '}
                <span className="total">
                    Rs.{selectedSeats.length * 300}
                </span>
            </p>
            <button onClick={() => { addSeat() }}>Book</button>
        </div>
    )
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className="Cinema">
            <div className="screen" />

            <div className="seats">
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = movie.includes(seat)//movie.occupied.includes(seat)
                    return (
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied',
                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied ? null : e => {
                                    if (e.key === 'Enter') {
                                        handleSelectedState(seat)
                                    }
                                }
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}
