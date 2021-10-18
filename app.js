var getConnection = require("./db");
const app = require("express")();

const http = require("http").Server(app);
var bodyParser = require("body-parser");

const port = 443;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var getConnection = require("./db");
const { request } = require("http");
const { add } = require("nodemon/lib/rules");
const res = require("express/lib/response");

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

//Loginasd

app.post("/login", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT * FROM users WHERE username = ? ",
      [request.body.username],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          console.log(results);
          //kullanıcı yok
          result.json("kullanıcı yok");
        } else {
          console.log("girdi amk");

          //kullanıcı var
          if (results[0].password == request.body.password) {
            result.json({ succes: true, data: {'user_id':results[0].id},'msg':'Giriş Başarılı' });
            console.log("girdi ");
          } else {
            result.json({ succes: false, data: {'user_id':null},'msg':'Giriş Başarısız' });

            // result.json("Kullanıcı Adı veya Şifre Yanlış"+ " "+ results + " " + request.body.password + "  "+ request.body.username );
            console.log(results);
          }
        }
      }
    );
  });
});

// REGISTER

app.post("/register", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO users (username,password,email) VALUES (?, ?, ?);",
      [request.body.username, request.body.password, request.body.email],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// GET USERS

app.get("/users", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query("SELECT * FROM users", function (error, messages) {
      result.json(messages);
      con.release();
    });
  });
});

// Add Favorite

app.post("/addFavorite", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO favorites (product_id,user_id) VALUES (?, ?);",
      [request.body.productId, request.body.userId],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// GET FAVORİTE
app.post("/getFavorite", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT *  FROM favorites WHERE user_id = ? ",
      [request.body.userId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          //kullanıcı yok
          result.json("Favori yok");
        } else {
          //kullanıcı var
          result.json(results);
        }
      }
    );
  });
});

// DELETE FAVORITE ITEM
app.post("/deleteFavoriteItem", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "DELETE  FROM favorites WHERE id = ? ",
      [request.body.id],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.affectedRows == 0) {
          //kullanıcı yok
          result.json("favori item olmadığından silinemedi");
        } else {
          //kullanıcı var
          result.json("silindi gardaş");
        }
      }
    );
  });
});

// ADD CART

app.post("/addCart", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO cart (product_id,user_id) VALUES (?, ?);",
      [request.body.productId, request.body.userId],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// DELETE CART

app.post("/deleteCartProduct", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    //DELETE FROM
    con.query(
      "DELETE  FROM cart WHERE id = ? ",
      [request.body.id],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.affectedRows == 0) {
          //ürün yok
          result.json("Böyle bir ürün yok");
          console.log(results.affectedRows);
        } else {
          //ürün silindi
          result.json("silindi gardaş");
          console.log(results.affectedRows);
        }
      }
    );
  });
});

// GET CART
app.get("/getCartItem", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT *  FROM cart WHERE user_id = ? ",
      [request.body.user_id],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          //kullanıcı yok
          result.json("Bu Id'e ait ürün yok");
        } else {
          //kullanıcı var
          result.json(results);
        }
      }
    );
  });
});

// ADD PRODUCT

app.post("/addProduct", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO products (productId,categoryId,productName,image,price,color,fabricType,lenght,width,other,season,warrantyPeriod) VALUES (?, ?,?, ?, ?,?,?,?,?,?,?,?);",
      [
        request.body.productId,
        request.body.categoryId,
        request.body.productName,
        request.body.image,
        request.body.price,
        request.body.color,
        request.body.fabricType,
        request.body.length,
        request.body.width,
        request.body.other,
        request.body.season,
        request.body.warrantyPeriod,
      ],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// GET PRODUCT

app.get("/getProduct", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT *  FROM products WHERE productId = ? ",
      [request.body.productId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          //kullanıcı yok
          result.json("ürün yok");
        } else {
          //kullanıcı var
          result.json(results);
        }
      }
    );
  });
});

// GET by category id Product

app.get("/getByCategoryId", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT *  FROM products WHERE categoryId = ? ",
      [request.body.categoryId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          //kullanıcı yok
          result.json("ürün yok");
        } else {
          //kullanıcı var
          result.json(results);
        }
      }
    );
  });
});

// ADD USER ADDRESS

app.post("/addUsersAddress", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO usersAddress (user_id,addressDescription,address,buildingNo,floor,flat,directions) VALUES (?, ?,?, ?, ?, ?, ?);",
      [
        request.body.user_id,
        request.body.addressDescription,
        request.body.address,
        request.body.buildingNo,
        request.body.floor,
        request.body.flat,
        request.body.directions,
      ],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// DELETE ADDRESS

app.post("/deleteUserAddress", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    //DELETE FROM
    con.query(
      "DELETE  FROM usersAddress WHERE user_id = ? ",
      [request.body.userId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.affectedRows == 0) {
          //ürün yok
          result.json("Adress yok");
          console.log(results.affectedRows);
        } else {
          //ürün silindi
          result.json("silindi gardaş");
          console.log(results.affectedRows);
        }
      }
    );
  });
});

// ADD CARD

app.post("/addCard", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
      result.json(JSON.stringify(err));
    }

    con.query(
      "INSERT INTO card (user_id,cardName,cardNumber,dayYear,CVC) VALUES (?, ?,?, ?, ?);",
      [
        request.body.user_id,
        request.body.cardName,
        request.body.cardNumber,
        request.body.dayYear,
        request.body.cvc,
      ],
      function (error, messages) {
        result.json(messages);
        con.release();
      }
    );
  });
});

// DELETE CARD

app.post("/deleteUserCard", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    //DELETE FROM
    con.query(
      "DELETE  FROM card WHERE user_id = ? ",
      [request.body.userId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.affectedRows == 0) {
          //ürün yok
          result.json("Card yok");
          console.log(results.affectedRows);
        } else {
          //ürün silindi
          result.json("silindi gardaş");
          console.log(results.affectedRows);
        }
      }
    );
  });
});

// GET CARD

app.get("/getUserCard", (request, result) => {
  getConnection((err, con) => {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT * FROM card WHERE user_id = ?",
      [request.body.userId],
      (err, results, fields) => {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          result.json("büle bir card nina");
        } else {
          result.json(results);
        }
      }
    );
  });
});

//assssssssssssssssss
app.post("/getFavorite", function (request, result) {
  getConnection(function (err, con) {
    if (err) {
    }
    console.log("con: " + con);

    con.query(
      "SELECT *  FROM favorites WHERE user_id = ? ",
      [request.body.userId],
      function (err, results, fields) {
        if (err) throw err;
        con.release();

        if (results.length == 0) {
          //kullanıcı yok
          result.json("Favori yok");
        } else {
          //kullanıcı var
          result.json(results);
        }
      }
    );
  });
});
