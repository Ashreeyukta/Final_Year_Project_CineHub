const express = require("express");
const app = express();
const mysql = require("mysql");
const crypto = require("crypto");
const path = require("path");

const multer = require("multer");
const fs = require("fs");

// create connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "cinehub",
  password: "cinehub",
  database: "cinehub",
});
//upload comming soon movie
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

var upload = multer({ storage: storage });


/*
//c->create
*/
app.post("/api/signup", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const activeStatus = "0";
  // console.log(req.body);

  const sqlInsert =
    "INSERT INTO `user_table` (`fname`, `lname`, `email`, `password`, `activeStatus`) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [fname, lname, email, password, activeStatus],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Singup Success");
      }
    }
  );
});

app.post("/api/book-seat", (req, res) => {
  const Seates = req.body.Seates;
  const showId = req.body.showId;
  const userId = req.body.userId;
  const slotId = req.body.slotId;

  const food_order = req.body.foodItems;

  var sqlBookSeat =
    "INSERT INTO `seat_booking_table` (`bookedBy`, `seatId`, `ShowId`, `price`, `show_time_id`) VALUES ";

  // console.log(req.body);
  // res.json({
  //   result: req.body,
  //   status: true,
  //   msg: "Booked"
  // })

  if (Array.isArray(Seates)) {
    for (var i = 0; i < Seates.length; i++) {
      sqlBookSeat = sqlBookSeat.concat(
        "(" + userId + ", " + Seates[i] + "," + showId + ", 300, "+slotId+" )"
      );
      if (i < Seates.length - 1) {
        sqlBookSeat = sqlBookSeat.concat(",");
      }
    }
  }
  let total = Seates.length * 300;;



  db.query(sqlBookSeat, (err, result) => {
      // 
      if(result){
        if(food_order){
          
          food_order.map((items) => {
            total += Number(items['amount'])
          });
        }
          
          let sql_food_order = "INSERT INTO order_table (`orderBy`, `orderedDate`,`slot_id`, `orderStatus`, `total`) VALUES ";
          sql_food_order += `(${userId}, now(),${slotId}, 1, ${total})`
          db.query(sql_food_order, (err, result)=> {
            if(result) {
  
              if(food_order && food_order.length){
                let order_id = result.insertId;
              
                let order_item_sql = "INSERT INTO order_list (`orderId`, `orderdItem`, `orderedQty`) VALUES ";


                food_order.map((item, i) => {

                    order_item_sql += `(${order_id}, ${item.food_id}, ${item.qty})`

                    if(food_order.length-1 > i) {
                      order_item_sql += ",";
                    }

                })

                db.query(order_item_sql, (eror, success) => {
                    if(success) {
                        res.json({
                          result: result,
                          status: true,
                          msg: "Your order placed successfully."
                        })
                    } else {
                        res.json({
                          result: success,
                          status: false,
                          msg: "Error while placing your order."
                        })
                    }
                })
              } else {
                  res.json({
                    result: result,
                    status: true,
                    msg: "Your ticket is booked now."
                  })
              }
            } else {
              res.json({
                result: err,
                status: false,
                msg: "Could not place order for the food item"
              })
            }
          })
        }
  });
});

app.get("/api/movie", (req, res) => {
  const movieList =
    "SELECT *, 200 as price, '' as occupied FROM movie_table INNER JOIN  show_time_table ON show_time_table.movie_id = movie_table.id";
  db.query(movieList, (err, result) => {
    res.send(result);
  });
});

app.get("/api/food", (req, res) => {
  const food_sql = "SELECT * FROM food_item_table ORDER BY id DESC";
  db.query(food_sql, (err, result) => {
    res.send({
      result: result,
      status: true,
      msg: "Success"
    })
  })
})

app.post("/api/orderfood", (req, res) => {
  const orderdItem = req.body.id;
  const orderedQty = req.body.itemAmt;
  const userId = req.body.userId;
  // console.log(req.body);

  const oderUserInsert = "INSERT INTO `order_table` (`orderBY`) VALUES (?) ";
  const oderInsert =
    "INSERT INTO `order_list` (`orderId`, `orderdItem`, `orderedQty`) VALUES (?, ?, ?)";
  db.query(oderUserInsert, [userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        oderInsert,
        [result.insertId, orderdItem, orderedQty],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("sucess");
          }
        }
      );
    }
  });
});

//r->read
app.use("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelect =
    "SELECT * FROM `user_table` WHERE `user_table`.`email` = ? AND `user_table`.`password` = ?";
  // console.log(sqlSelect);

  db.query(sqlSelect, [email, password], (err, result) => {
    // console.log("User: ", result);

    if (result.length === 1) {
      console.log();
      // console.log(result[0].fname+" "+result[0].lname);
      delete result[0].password;
      res.send({
        user: result[0],
        // name: result[0].fname + " " + result[0].lname,
        // id: result[0].id,
        token: crypto.randomBytes(16).toString("base64"),
      });
    } else {
      res.send({ token: false });
    }
  });
});

app.use("/api/admin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  const adminLogin =
    "SELECT * FROM `admin_table` WHERE `admin_table`.`uname` = ? AND `admin_table`.`password` = ?";
  console.log("Query: ", adminLogin);

  db.query(adminLogin, [email, password], (err, result) => {
    if (!err) {
      if (result.length === 1) {
        res.send({
          name: result[0].uname,
          admin: result[0].id,
          token: "admin",
        });
      } else {
        res.send({ token: false });
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/api/food", (req, res) => {
  const foodSelect = "SELECT * FROM `food_item_table`";
  db.query(foodSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/userOrder", (req, res) => {
  const selectUser =
    "SELECT `user_table`.`id` as id,`order_table`.`orderedDate` as date, `order_table`.`id` as oId,fname,lname,email FROM `user_table` INNER JOIN `order_table` ON `user_table`.`id` = `order_table`.`orderBY` ORDER BY `order_table`.`orderedDate` DESC";
  db.query(selectUser, (err, result) => {
    res.send(result);
  });
});

app.get("/api/user", (req, res) => {
  const selectUser =
    "SELECT id, fname, lname , email ,registerDate as date FROM `user_table` ";
  db.query(selectUser, (err, result) => {
    res.send(result);
  });
});

app.get("/api/my-movie/:userId", (req, res) => {
  const userId = req.params.userId;
  const myMovie =
    "SELECT * FROM `show_time_table` INNER JOIN `seat_booking_table` ON `seat_booking_table`.`ShowId` = `show_time_table`.`id` INNER JOIN movie_table ON movie_table.id = show_time_table.movie_id WHERE `seat_booking_table`.`bookedBy`=" +
    userId +
    " ORDER BY `showingDate`ASC, `showingTime` ASC"; //", ORDER BY `showingDate` ASC";
  db.query(myMovie, userId, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/movie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const movieList =
    "SELECT * FROM movie_table INNER JOIN  show_time_table ON show_time_table.movie_id = movie_table.id WHERE show_time_table.movie_id = ?";
  db.query(movieList, movieId, (err, result) => {
    res.send(result);
  });
});

//Add new movie into db
app.post("/api/add-new-movie", upload.single('movie'), (req, res) => {
  const file = req.file;

  const name = req.body.name;
  const date = req.body.date;
  const trailer = req.body.trailer;
  const description = req.body.description;
  const status = req.body.status;
  let image = "";
  if (file) {
    image = file.filename;
  }
  const addNewMovie =
    "INSERT INTO `movie_table` (`name`, `description`, `trailer`, `releaseDate`, `status`, `image`) VALUES (?, ?, ?, ?, ?, ?) ";
  db.query(
    addNewMovie,
    [name, description, trailer, date, status, image],
    function (err, result) {
      if (err) {
        res.send(null);
      } else {

        // movie added
        if (status == 'showing') {
          let sql_show_times = "INSERT INTO show_time_table (`movie_id`,`showingDate`,`showingTime`) VALUES ";
          let show_date = date;

          let values = `(${result.insertId}, '${date}', "08:00"),
                          (${result.insertId}, '${date}', "11:30"),
                          (${result.insertId}, '${date}', "15:00"),
                          (${result.insertId}, '${date}', "18:30")`;

          // add show for 7 days
          let release_date = new Date(date)

          for (let i = 1; i <= 7; i++) {

            let next_date = release_date.setDate(release_date.getDate() + 1);
            next_date = new Date(next_date);
            let month = next_date.getMonth() + 1;
            if (month < 10) {
              month = "0" + month;
            }
            let day = next_date.getDate();
            if (day < 10) {
              day = "0" + day;
            }
            next_date = next_date.getFullYear() + "-" + month + "-" + day;

            values += `,(${result.insertId}, '${next_date}', "08:00"),
                          (${result.insertId}, '${next_date}', "11:30"),
                          (${result.insertId}, '${next_date}', "15:00"),
                          (${result.insertId}, '${next_date}', "18:30")`;
          }

          sql_show_times += values;
          db.query(sql_show_times, function (err, result) {
            // console.log(result);
            if (result) {
              res.send({ result: "Success" });

            } else {
              // console.log(err);
              res.status(400).send({ result: null });
            }
          })
        } else {
          res.send({ result: "Success" });
        }

      }
    }
  );
});

app.get("/api/movie-detail/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const movieList = "SELECT * FROM movie_table  WHERE id = ?";
  db.query(movieList, movieId, (err, result) => {
    if (result) {
      let show_time_query = "SELECT * FROM show_time_table WHERE movie_id = " + result[0].id;
      db.query(show_time_query, (err, shows) => {
        if (shows) {
          let show_date = [];

          show_date = shows.reduce((r, a) => {
            let date = new Date(a.showingDate);
            let month = date.getMonth() + 1;
            if (month < 10) {
              month = "0" + month;
            }
            let day = date.getDate();
            if (day < 10) {
              day = "0" + day;
            }
            date = date.getFullYear() + "-" + month + "-" + day;
            r[date] = r[date] || [];
            r[date].push(a);
            return r;
          }, Object.create(null));

          res.json({
            movie: result[0],
            shows: show_date
          })
        } else {
          res.json({
            movie: result[0],
            shows: null
          })
        }
      })
    } else {
      res.json({ result: null })
    }
  });
});

//update movie detail
app.put("/api/update-movie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const name = req.body.name;
  const date = req.body.date;
  const trailer = req.body.trailer;
  const movieUpdate =
    "UPDATE `movie_table` SET `name` = ?, `releaseDate` =? ,`trailer` = ? WHERE `movie_table`.`id` = ?";
  db.query(movieUpdate, [name, date, trailer, movieId], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
});

//Delete movie from db
//
app.delete("/api/delete-all-movie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const deleteMovie =
    "DELETE FROM `movie_table` WHERE `movie_table`.`id` = ?";
  db.query(deleteMovie, movieId, function (err, result) {
    if (err) {
      res.send(false);
    } else {
      res.send("success");
    }
  });
});

app.get("/api/order/:orderid", (req, res) => {
  const orderid = req.params.orderid;
  const orderList =
    "SELECT `order_table`.`id` as orderId, orderBy as personId, itemName, price, orderedDate as time , orderdItem as itemId , orderedQty as quantity FROM order_table inner JOIN order_list on `order_table`.`id` = `order_list`.`orderId` inner join food_item_table on food_item_table.id = order_list.orderdItem where `order_table`.`orderBy`= ? ";
  db.query(orderList, orderid, (err, result) => {
    res.send(result);
  });
});

app.get("/api/orderId/:orderid", (req, res) => {
  const orderid = req.params.orderid;
  const orderList =
    "SELECT `order_table`.`id` as orderId, orderBy as personId, itemName, price, orderedDate as time , orderdItem as itemId , orderedQty as quantity FROM order_table inner JOIN order_list on `order_table`.`id` = `order_list`.`orderId` inner join food_item_table on food_item_table.id = order_list.orderdItem where `order_table`.`id`= ? ";
  db.query(orderList, orderid, (err, result) => {
    res.send(result);
  });
});

app.get("/api/seats/:showId/:slotId", (req, res) => {
  const showId = req.params.showId;
  const slotId = req.params.slotId;
  const seatList =
    "SELECT seatId as occupied FROM `seat_booking_table` WHERE `ShowId` = ? AND `show_time_id` = ?";
  db.query(seatList, [showId, slotId], (err, result) => {
    res.send(result);
  });
});

//display comming soon movie

app.get("/api/comming-soon", (req, res) => {
  const commingMovie =
    "SELECT * FROM movie_table WHERE status = 'upcoming' ORDER BY id DESC";
  db.query(commingMovie, (err, result) => {
    res.send(result);
  });
});


app.get("/api/now-showning", (req, res) => {
  const commingMovie =
    "SELECT * FROM `movie_table` WHERE status = 'showing' ORDER BY id DESC";
  db.query(commingMovie, (err, result) => {
    res.send(result);
  });
});

app.post("/api/up-comming", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: "Please upload a file." });
  }
  const name = req.body.name;
  const date = req.body.date;
  const img = req.file.filename;
  const trailer = req.body.trailer;
  const sqlFile =
    "INSERT INTO `comming_soon` (`name`, `releasedDate`, `img`, `trailer`) VALUES (?,?,?,?) ";
  db.query(sqlFile, [name, date, img, trailer], function (err, result) {
    return res.send({ message: "File is successfully.", file });
  });
});

app.get("/file/comming-soon/:img", (req, res) => {
  const pic = req.params.img;
  fs.readFile("./uploads/" + pic, function (err, content) {
    if (err) {
      res.writeHead(400, { "Content-type": "text/html" });
      console.log(err);
      res.end("No such image");
    } else {
      res.writeHead(200, { "Content-type": "image/*" });
      res.end(content);
    }
  });
});

//display  all  movie

app.get("/api/all-movie", (req, res) => {
  const commingMovie =
    "SELECT * FROM (SELECT * FROM `movie_table` Order By id desc limit 50) sub ORDER BY id ASC";
  db.query(commingMovie, (err, result) => {
    res.send(result);
  });
});


app.post("/api/payment-success", (req, res) => {
  let data = req.body;

  let payment_table_sql = "INSERT INTO payment_table (`paidBy`, `orderId`, `paymentMethod`, `paymentTime`, `transaction_code`, `payment_token`) VALUES ";

  payment_table_sql += `(${data.user_id}, ${data.product_identity}, "Khalti", now(), '${data.idx}', '${data.token}')`;

  db.query(payment_table_sql, (err, success) => {
    if(success) {
        let order_query = "SELECT * FROM order_table WHERE id = "+data.product_identity;
        db.query(order_query, (err, result) => {

          if(err) {
            res.json({
              result: null,
              status: false,
              msg: "Order not found"
            })
          } else {
            let slot_id = result[0].slot_id;

            let update_seat_booking = "UPDATE seat_booking_table SET bookingStatus = 1 WHERE slot_id = "+slot_id;

            db.query(update_seat_booking, (upErr, upSuccess) => {

              res.json({
                result: upSuccess,
                status: true,
                msg: "Movie ticket purchased successfully."
              })
            })
          }
        })
    } else {
      res.json({
        result: null,
        status: false,
        msg: "Error while storing payment info"
      })
    }
  })


})

app.get('/api/my-tickets', (req,res) => {
  let user = (req.headers.user) ?? null;
  
  let my_ticket_query = "SELECT seat_booking_table.id as seat_booking_id, seatId as seat,showingDate as show_date, showingTime as show_time , bookedDate as booked_date, bookingStatus as payment_status, name as movie_name FROM seat_booking_table ";
  my_ticket_query += " LEFT JOIN  show_time_table ON show_time_table.id = seat_booking_table.show_time_id ";
  my_ticket_query += " LEFT JOIN movie_table ON movie_table.id = show_time_table.movie_id "
  if(user){
    my_ticket_query += " WHERE bookedBy = "+user;
  }

  console.log(my_ticket_query);

  db.query(my_ticket_query, (err, result) => {
    if(err) {
      res.status(422).json({
        result: null,
        msg: "Could not process your query",
        status: false
      })
    } else {
      res.json({
        result: result,
        msg: "Your tickets",
        status: true
      })
    }
  })

})



app.get('/api/movie-orders', (req,res) => {
  
  let my_ticket_query = "SELECT seat_booking_table.id as seat_booking_id, seatId as seat,showingDate as show_date, showingTime as show_time , bookedDate as booked_date, bookingStatus as payment_status, name as movie_name, concat(fname,' ', lname) as name FROM seat_booking_table ";
  my_ticket_query += " LEFT JOIN show_time_table ON show_time_table.id = seat_booking_table.show_time_id ";
  my_ticket_query += " LEFT JOIN movie_table ON movie_table.id = show_time_table.movie_id "
  my_ticket_query += " LEFT JOIN user_table ON user_table.id = seat_booking_table.bookedBy "


  db.query(my_ticket_query, (err, result) => {
    if(err) {
      res.status(422).json({
        result: null,
        msg: "Could not process your query",
        status: false
      })
    } else {
      res.json({
        result: result,
        msg: "Your tickets",
        status: true
      })
    }
  })

})


app.get("/api/my-food-orders", (req, res) => {
  let user = (req.headers.user) ?? null;

  let my_food_query = "SELECT seat_booking_table.id as seat_booking_id, seatId as seat,showingDate as show_date, showingTime as show_time , bookedDate as booked_date, orderStatus as payment_status, itemName as food_name FROM order_list ";

  my_food_query += " LEFT JOIN order_table ON order_table.id = order_list.orderId ";
  my_food_query += " LEFT JOIN seat_booking_table ON seat_booking_table.show_time_id = order_table.slot_id";
  my_food_query += " LEFT JOIN show_time_table ON show_time_table.id = order_table.slot_id ";

  my_food_query += " LEFT JOIN food_item_table ON food_item_table.id = order_list.orderdItem "

  if(user){
    my_food_query += " WHERE order_table.orderBY = "+user;
  }

  my_food_query += " GROUP BY order_list.orderdItem"

  console.log(my_food_query);

  db.query(my_food_query, (err, result) => {
    if(err) {
      res.status(422).json({
        result: null,
        msg: "Could not process your query",
        status: false
      })
    } else {
      res.json({
        result: result,
        msg: "Your tickets",
        status: true
      })
    }
  })
})

app.get("/api/food-orders", (req, res) => {

  let my_food_query = "SELECT seat_booking_table.id as seat_booking_id, seatId as seat,showingDate as show_date, showingTime as show_time , bookedDate as booked_date, orderStatus as payment_status, itemName as food_name, concat(fname,' ',lname) as name FROM order_list ";

  my_food_query += " LEFT JOIN order_table ON order_table.id = order_list.orderId ";
  my_food_query += " LEFT JOIN seat_booking_table ON seat_booking_table.show_time_id = order_table.slot_id";
  my_food_query += " LEFT JOIN show_time_table ON show_time_table.id = order_table.slot_id ";

  my_food_query += " LEFT JOIN food_item_table ON food_item_table.id = order_list.orderdItem "
  my_food_query += " LEFT JOIN user_table ON order_table.orderBY=user_table.id"

  my_food_query += " GROUP BY order_list.orderdItem"

  console.log(my_food_query);

  db.query(my_food_query, (err, result) => {
    if(err) {
      res.status(422).json({
        result: null,
        msg: "Could not process your query",
        status: false
      })
    } else {
      res.json({
        result: result,
        msg: "Your tickets",
        status: true
      })
    }
  })
})


app.get("/api/my-payments", (req, res) => {

  let user = (req.headers.user) ?? null;
  
  let my_ticket_query = "SELECT paymentMethod, paymentTime as payment_date, orderId as order_id, total, orderStatus as order_status, name as movie_name FROM payment_table ";
  my_ticket_query += " LEFT JOIN order_table ON order_table.id = payment_table.orderId"
  my_ticket_query += " LEFT JOIN show_time_table ON show_time_table.id = order_table.slot_id ";
  my_ticket_query += " LEFT JOIN movie_table ON movie_table.id = show_time_table.movie_id "
  if(user){
    my_ticket_query += " WHERE paidBy = "+user;
  }

  console.log(my_ticket_query);

  db.query(my_ticket_query, (err, result) => {
    if(err) {
      res.status(422).json({
        result: null,
        msg: "Could not process your query",
        status: false
      })
    } else {
      res.json({
        result: result,
        msg: "Your tickets",
        status: true
      })
    }
  })
})

app.delete("/api/tickets/:id", (req, res) => {
    let dele_query = "DELETE FROM seat_booking_table WHERE id = "+req.params.id;

    console.log(dele_query)
    db.query(dele_query, (err, success) => {

      if(success) {
        res.json({
          result: null,
          msg: "Ticket released successfulluy.",
          status: true
        })
    
      } else {
        res.json({
          result: null,
          msg: "Error releaseing tickets.",
          status: false
        })
    
      }
    })
})


module.exports = app;