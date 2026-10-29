import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import KhaltiCheckout from "khalti-checkout-web";
import { Route } from "react-router-dom";
import { getRequest, homeurl, postRequest } from '../../../services/http.service';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { getTodayDateString, getSeatName } from '../../../helpers/utilities';

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

export function BookTicket() {
    var occupied = [];
    const { showId, showTimeId } = useParams();
    const [movie, setMovie] = useState();
    const [showTimes, setShowTimes] = useState([]);

    const [foodItems, setFoodItems] = useState([]);
    const [foodCart, setFoodCart] = useState();

    const [slot, setSlot] = useState(showTimeId);

    const [selectedMovie, setSelectedMovie] = useState([]);
    //useState(movies[showId-1])
    const [selectedSeats, setSelectedSeats] = useState([])

    const navigate = useNavigate();


    if(!slot){
        alert("Please select the time slot too...");
    }

    useEffect(() => {

        getRequest('/movie-detail/'+showId).then((movie) => {
            setMovie(movie.data.movie)
            let date = getTodayDateString();
            let shows;
            Object.keys(movie.data.shows).map((o, i) => {
                if(o == date) {
                    shows = movie.data.shows[o];
                }
            })
            setShowTimes(shows);
        })
        getRequest(`/seats/${showId}/${slot}`).then((response) => {
            setSelectedMovie(response.data)
        })
        getRequest(`/food`).then((response) => {
            setFoodItems(response.data.result)
        })
    }, []);

    selectedMovie.map((val) => {
        occupied.push(val.occupied)
    })

    const addSeat = () => {
        var json = localStorage.getItem("token");
        //console.log('here');

        if (json) {
            var data = JSON.parse(json);
            if (data) {
                var userId = data.user.id;
            }
        }

        // console.log("userId: ", userId);

        let movie_amt = selectedSeats.length * 300 ;
        let food_amt = 0;
        if(foodCart){
            foodCart.map((o) => {
                food_amt += o.amount;
            });
        }

        let total_amt = movie_amt + food_amt;

        // let checkout =  new KhaltiCheckout(config);
        // checkout.show({amount: total_amt * 100 });

        if(!slot){
            alert("Please select the time");
        } else {
            postRequest("/book-seat", {
                Seates: selectedSeats,
                showId: showId,
                userId: userId,
                foodItems: foodCart,
                slotId: slot
            }).then((response) => {
                if(response.status === 200 && response.data.status){
                    let confirm = window.confirm("Your order has been booked. Do you want to proceed with the payment?");
                    if(confirm){

                        // console.log("Result: ", response.data.result)
                        let config = {
                            // replace this key with yours
                            "publicKey": "test_public_key_161073bd2b334634a2c7b5a5ebe1942a",
                            "productIdentity": response.data.result.insertId,
                            "productName": "Movie Booking Ticket",
                            "productUrl": `${homeurl}/movie/${showId}`,
                            "eventHandler": {
                                onSuccess(payload) {
                                    payload.user_id = userId
                                    // hit merchant api for initiating verfication
                                    postRequest('/payment-success', payload, true)
                                    .then((response) => {
                                        if(response.data.status) {
                                            alert(response.data.msg);
                                            navigate("/dashboard");
                                        } else {
                                            alert("Could not update the payment information at this moment but your movie has been booked.")
                                            navigate("/dashboard");
                                        }
                                    })
                                    .catch((server_error) => {
                                        console.log("Error: ", server_error);
                                    })
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


                        let checkout = new KhaltiCheckout(config);
                        // checkout.show({ amount: total_amt * 100 });
                        // for the above test account, the total amt should be less than 200
                        checkout.show({ amount: total_amt });
                    } else {
                        navigate("/dashboard")
                    }
                } else {
                    alert("Error while placing your order. Please try again or request admin for the support.");
                }
            })
            .catch((err) => {
                console.log("Errs: ", err)
            })
    
        }



        

        // postRequest("/api/book-seat", {
        //     Seates: selectedSeats,
        //     showId: showId,
        //     userId: userId,
        // }).then((response) => {
        //     <Route exact path="/dashboard" />
        // });


    };


    const addFoodItem = (food_id, qty, price) => {
        price = Number(price);
        qty = Number(qty);

        let current_cart = {
            food_id: food_id,
            qty: qty,
            amount: (price*qty)
        };

        let final_result = foodCart || [];;

        if(foodCart && foodCart.length){
            let index = null;
            final_result.map((item, i) => {
                if(item.food_id == food_id){
                    index = i;
                }
            });

            if(index === null){
                final_result.push(current_cart);
            } else {
                if(qty <= 0){
                    final_result.splice(index, 1);                    
                } else {
                    final_result[index].qty = qty;
                    final_result[index].amount = price * qty;    
                }
            }
        } else {
            final_result = [current_cart];
        }

        setFoodCart(final_result);
    }

    return (

        <Container fluid>
            <Row className="mt-5">
                
                <Col sm={12} className="movies">
                    {
                        movie ? 
                            <iframe width="100%" height="700px" src={movie.trailer} title={movie.name} frameBorder="0" allowFullScreen></iframe>            
                            :''
                    }
                </Col>
                <Col sm={12}>
                    <h4 className='text-left text-white'>{movie?.name}</h4>
                </Col>
                <hr />
                <Col sm={12}>
                    <Row>
                        {
                            showTimes ? 
                                showTimes.map((o, i) => (
                                    <Col sm={2} className="text-center" key={i}>
                                        <button className='btn btn-sm btn-success' onClick={(e) => {setSlot(o.id)}}>
                                            {o.showingTime}
                                        </button>
                                    </Col>
                                ))
                            
                            : <></>
                        }
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
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
                        
                    </div>
                </Col>

                <Col sm={6} className="py-5">
                    <h4>Order Food: </h4>
                    <hr />
                    {
                        foodItems ? <>
                            {
                                foodItems.map((food, i) => (
                                    <Row key={i} className="m-3">
                                        <Col sm={2}>{i+1}. </Col>
                                        <Col sm={5} className="text-left">
                                            {food.itemName}
                                        </Col>
                                        <Col sm={5}>
                                            <input type="number" className="form-control form-control-sm" min="0" defaultValue="0" onChange={(e) => {addFoodItem(food.id, e.target.value, food.price)}}/>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </> : <></>
                    }
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col sm={6} className="offset-sm-3 d-grid">
                    <Button size='lg' variant='success' className='btn-sm btn-book' onClick={() => { addSeat() }}>Book Ticket</Button>
                </Col>
            </Row>
        </Container>
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
        <div className="container-fluid Cinema">
            <div className="screen" />

            <div className="seats">
                {seats.map((seat, ind) => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = movie.includes(seat)//movie.occupied.includes(seat)
                    return (
                        <span
                            tabIndex={seat}
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
                        >
                            {
                                getSeatName(ind)
                            }
                        </span>
                    )
                })}
            </div>
        </div>
    )
}