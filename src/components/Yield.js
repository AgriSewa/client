import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from './Loader'

const Yield = () => {
 const [yielddata,setYielddata]= useState([]);
 const [flag,setFlag] = useState(true);
  useEffect(() =>{  
    axios({
      url: '/yield',
      method: 'GET',
      headers: {
        auth: `Bearer ${localStorage.getItem("jwt")}`
      }}).then((res)=>{
      setYielddata(res.data);
      setFlag(false);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <>
    {flag==false? 

              <section>
          <div className="container ">
            <div className="row">
              <div className="col">
                {yielddata && yielddata.length>0 &&  
                <p className="h3 text-teal text-center mt-5">{`Crop Yield in ${yielddata[0].District_Name}, ${yielddata[0].State_Name}`}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-hover text-center table-danger table-striped ">
                    <thead className="thead-dark text-secondary">
                      <tr>
                        <th>Crop</th>
                        <th>Area</th>
                        <th>Production</th>
                      </tr>
                    </thead>
                    <tbody>

                        {
                        yielddata && yielddata.map((yieldd)=>{
                        return(
                            <tr key={yieldd.Crop}>
                            <td className="text-center"><strong>{yieldd.Crop}</strong></td>
                            <td className="text-center"><strong>{yieldd.Area}</strong></td>
                             <td className="text-center"><strong>{yieldd.Production}</strong></td>
                           

                          </tr>
                                )
                            })
                        }
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
       
      </section>
      :<Loader/>
 }

    </>
  )
}

export default Yield