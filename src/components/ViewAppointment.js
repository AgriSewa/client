import React from "react";



const ViewAppointment = () => {
  return (
    <>
      <section>
        {/* {profile.experience.length > 0 && ( */}
          <div className="container ">
            <div className="row">
              <div className="col">
                <p className="h3 text-teal text-center mt-5">Upcoming Appointments</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-hover text-center table-dark table-striped ">
                    <thead className="thead-dark text-secondary">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Expert Name</th>
                        <th>Mode</th>
                      
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {profile.experience.map((exp) => { */}
                        {/* return ( */}
                          <tr >
                            <td className="text-center">sad</td>
                            <td className="text-center">sdf</td>
                            <td className="text-center">dfg</td>
                            <td className="text-center">fdg</td>
                            <td className="text-center">
                              <a href="https://google.com" target="_blank"><button
                                className="btn btn-success btn-sm"
                              >
                                Join
                              </button></a>
                            </td>
                          </tr>
                        {/* );
                      })} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        {/* )} */}
      </section>

       
    </>
  );
};

export default ViewAppointment;
