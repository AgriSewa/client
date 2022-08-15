import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import M from "materialize-css";
import axios from "axios";
const BookExpert = () => {
  const navigate = useNavigate();
  let { expid } = useParams();
  const [time, setTime] = useState();
  const [date,setDate] = useState();
  const [bookinfo, setBookinfo] = useState([]);
  const [bookinfo2, setBookinfo2] = useState([]);
  const [bookinfo3, setBookinfo3] = useState([]);

  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [date3, setDate3] = useState();

  const [currtime,setCurrtime] = useState();

  const [mode, setMode] = useState();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = (e) => {
    setTime(e.target.innerText);
    setDate(date1);
    setOpen(true);
  };
  const handleClickOpen2 = (e) => {
    setTime(e.target.innerText);
    setDate(date2);
    setOpen(true);
  };
  const handleClickOpen3 = (e) => {
    setTime(e.target.innerText);
    setDate(date3);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (mode == "" || mode == null || mode == undefined) {
      M.toast({
        html: "Please select a meeting mode!",
        classes: "#f44336 red",
      });
      return;
    }
    const config = {
      headers: {
        auth: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    await axios
      .get(`/bookslot/${date}/${time}/${mode}/${expid}`, config)
      .then((res) => {
        M.toast({
          html: "Slot booked successfully!",
          classes: "#64dd17 light-green accent-4",
        });
        navigate('/farmer/appointments')
      })
      .catch((err) => {
        M.toast({ html: "Try again!", classes: "#f44336 red" });
      });

    setOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/api/auth/login");
    }
  }, []);

  useEffect(() => {
    let temp = new Date().getTime()
    let date1 = convert(new Date(temp));
    let date2 = convert(new Date(temp + (24 * 60 * 60 * 1000)));
    let date3=  convert(new Date(temp + (24 * 60 * 60 * 1000)+(24 * 60 * 60 * 1000)));
    
    // const d = new Date();
    // console.log(d.toLocaleTimeString());
    
      axios({
        url: `/slots/${expid}`,
        method: "POST",
        data:{date1,date2,date3},
        headers: {
          "auth": `Bearer ${localStorage.getItem("jwt")}`,
        }
      })
      .then((res) => {
        console.log(res.data);
  
        
        setBookinfo(res.data.list1);
        setBookinfo2(res.data.list2);
        setBookinfo3(res.data.list3);
        setDate1(convert(new Date(res.data.list1[0].book_date)));
        setDate2(convert(new Date(res.data.list2[0].book_date)));
        setDate3(convert(new Date(res.data.list3[0].book_date)));
        let temp1=(new Date())
        setCurrtime(temp1.getHours()<=9?"0"+temp1.getHours()+":"+temp1.getMinutes():temp1.getHours()+":"+temp1.getMinutes())
      })
      .catch((err) => {
        console.log(err);
        console.log("unable to fetch");
      });

  }, []);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 col-sm-12">
            <p className="h3 text-teal text-center mt-5">Available slots</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-hover text-center table-info table-striped ">
                <thead className="thead-dark text-secondary">
                  <tr>
                    <th>Date</th>
                    <th>Choose a Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center font-weight-bold">
                      {date1}
                    </td>
                    <td className="text-center d-flex justify-content-between">
                      {bookinfo &&
                        bookinfo.length > 0 &&
                        bookinfo.map((book) => {
                          return (
                            <button
                              key={book._id}
                              className={
                                (book.booked == 1 || currtime>=book.book_time.slice(0, 5))
                                  ? "btn btn-danger btn-sm"
                                  : "btn btn-success btn-sm"
                              }
                              onClick={(e) => {
                                if (book.booked == 0 && currtime<book.book_time.slice(0, 5))
                                  handleClickOpen(
                                    e
                                  );
                                else{
                                  M.toast({
                                    html: "Cannot book slot:(",
                                    classes: "#f44336 red",
                                  });
                                }
                              }}
                            >
                              {book.book_time.slice(0, 5)}
                            </button>
                          );
                        })}
                    </td>
                  </tr>
                    

                  <tr>
                    <td className="text-center font-weight-bold">
                      {date2}
                    </td>
                    <td className="text-center d-flex justify-content-between">
                      {bookinfo2 &&
                        bookinfo2.length > 0 &&
                        bookinfo2.map((book) => {
                          return (
                            <button
                              key={book._id}
                              className={
                                book.booked == 1
                                  ? "btn btn-danger btn-sm"
                                  : "btn btn-success btn-sm"
                              }
                              onClick={(e) => {
                                if (book.booked == 0)
                                  handleClickOpen2(
                                    e
                                   
                                  );
                                else
                                  M.toast({
                                    html: "Cannot book slot :(",
                                    classes: "#f44336 red",
                                  });
                              }}
                            >
                              {book.book_time.slice(0, 5)}
                            </button>
                          );
                        })}
                    </td>
                  </tr>



                <tr>
                    <td className="text-center font-weight-bold">
                      {date3}
                    </td>
                    <td className="text-center d-flex justify-content-between">
                      {bookinfo3 &&
                        bookinfo3.length > 0 &&
                        bookinfo3.map((book) => {
                          return (
                            <button
                              key={book._id}
                              className={
                                book.booked == 1
                                  ? "btn btn-danger btn-sm"
                                  : "btn btn-success btn-sm"
                              }
                              onClick={(e) => {
                                if (book.booked == 0)
                                  handleClickOpen3(
                                    e
                                  );
                                else
                                  M.toast({
                                    html: "Cannot book slot :(",
                                    classes: "#f44336 red",
                                  });
                              }}
                            >
                              {book.book_time.slice(0, 5)}
                            </button>
                          );
                        })}
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>



      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Choose a meeting mode on ${date1} at ${time}`}
        </DialogTitle>
        <DialogContent dividers>
          <form action="#">
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"audio"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Audio</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"video"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Video</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"physical"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Physical Meet</strong>
                </span>
              </label>
            </p>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>





        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Choose a meeting mode on ${date2} at ${time}`}
        </DialogTitle>
        <DialogContent dividers>
          <form action="#">
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"audio"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Audio</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"video"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Video</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"physical"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Physical Meet</strong>
                </span>
              </label>
            </p>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>







       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Choose a meeting mode on ${date3} at ${time}`}
        </DialogTitle>
        <DialogContent dividers>
          <form action="#">
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"audio"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Audio</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"video"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Video</strong>
                </span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="group1"
                  type="radio"
                  value={"physical"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setMode(e.target.value);
                  }}
                />
                <span>
                  <strong>Physical Meet</strong>
                </span>
              </label>
            </p>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>




    </>
  );
};

export default BookExpert;
