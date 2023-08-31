import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const HOME_URL = "https://it-studio-git-main-kevalj9999.vercel.app/";
// const HOME_URL = "http://localhost:5000/";

const style1 = {
    textAlign: "center",
    paddingBottom: "2.5%"
};
 

function Main() {
    const [donor_data, setDonor] = useState([]);
    const [emailData, setemailData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: 0,
        hobbies: ''
    });
    const getApiData = async () => {
        const res = await axios.get(`${HOME_URL}`);
        console.log(res.data);
        setDonor(res.data);
    }
    useEffect(() => {
        getApiData();
    }, []);


    const deleteRow = async (e) => {
        e.preventDefault();
        const item = e.target.value;
        await axios.post(`${HOME_URL}deleteRow`, { _id: item }, { timeout: 1200 }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`${HOME_URL}submit`,{formData});
            console.log(response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
        refreshPage();
    };

    function removeData(check) {
        const tempData = emailData.filter((data) => { return (data !== check); });
        setemailData(tempData);
    }

    function checkedData(e) {
        const item = e.target.value;
        emailData.includes(donor_data[item]) ? removeData(donor_data[item]) : setemailData([...emailData, donor_data[item]]);
    }

    const sendDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${HOME_URL}email`, emailData);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
        refreshPage();
    };


    return (
        <div>
            <div className="jumbotron">
                <h1>Welcome to our Blood Donation Website</h1>
                <p>Your donation can save lives. Join us in making a difference.</p>
                <a href="#features" className="btn btn-primary btn-lg">Learn More</a>
            </div>

            <div id="features" className="features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <span className="feature-icon">&#10084;</span>
                                <h3 className="feature-heading">Donate Blood</h3>
                                <p className="feature-description">Your blood donation can help patients in need and contribute to medical treatments.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <span className="feature-icon">&#128170;</span>
                                <h3 className="feature-heading">Find Donors</h3>
                                <p className="feature-description">Easily find blood donors in your area and connect with them to arrange donations.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <span className="feature-icon">&#127974;</span>
                                <h3 className="feature-heading">Save Lives</h3>
                                <p className="feature-description">By donating blood, you can help save lives and make a positive impact on your community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popup
        trigger={<button value="" className="btn btn-dark btn-lg detail">Add details</button>} modal nested>
        {(close) => (
          <div className="pop-up">
            <button className="close" onClick={close}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
                <h1 style={style1}>New Donor</h1>
                <div className="form-group padding_b">
                <label htmlFor="name" className="heading_text">Name</label>
                <input type="text" className="form-control input" id="name" name="name" placeholder="Enter your name" onChange={handleChange} required />
                </div>
                <div className="form-group padding_b ">
                <label htmlFor="pnumber" className="heading_text">Phone Number</label>
                <input type="number" className="form-control input" id="pnumber" name="number" placeholder="Enter your phone number"onChange={handleChange}  required />
                </div>
                <div className="form-group padding_b">
                    <label htmlFor="emailid" className="heading_text">Email address</label>
                    <input type="email" className="form-control input" id="emailid" name="email" onChange={handleChange} placeholder="Enter your email" required/>
                </div>
                <div className="form-group padding_b">
                    <label htmlFor="hobbies" className="heading_text">Hobbies</label>
                    <input type="text" className="form-control input" id="hobbies" name="hobbies" onChange={handleChange} placeholder="Tell us about your hobbies" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}
      </Popup>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email ID</th>
                            <th>Hobbies</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donor_data.map((donor, index) => {
                            return (<tr key={donor._id}>
                                <td><input type={"checkbox"} value={index} onChange={checkedData}></input></td>
                                <td>{donor._id}</td>
                                <td>{donor.Name}</td>
                                <td>{donor.phone_number}</td>
                                <td>{donor.email}</td>
                                <td>{donor.hobbies}</td>
                                <td><button value={donor._id} onClick={deleteRow}>Delete</button></td>
                                <td><Popup
                                    trigger={<button value={donor._id}>Update</button>} modal nested>
                                    {(close) => (
                                    <div className="pop-up">
                                        <button className="close" onClick={close}>
                                        &times;
                                        </button>
                                        <form onSubmit={handleSubmit}>
                                            <h1 style={style1}>New Donor</h1>
                                            <div className="form-group padding_b">
                                            <label htmlFor="name" className="heading_text">Name</label>
                                            <input type="text" className="form-control input" id="name" name="name" placeholder="Enter your name" defaultValue={donor.Name} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group padding_b ">
                                            <label htmlFor="pnumber" className="heading_text">Phone Number</label>
                                            <input type="number" className="form-control input" id="pnumber" name="number" placeholder="Enter your phone number" defaultValue={donor.phone_number} onChange={handleChange}  required />
                                            </div>
                                            <div className="form-group padding_b">
                                                <label htmlFor="emailid" className="heading_text">Email address</label>
                                                <input type="email" className="form-control input" id="emailid" name="email" onChange={handleChange} defaultValue={donor.email} placeholder="Enter your email" required/>
                                            </div>
                                            <div className="form-group padding_b">
                                                <label htmlFor="hobbies" className="heading_text">Hobbies</label>
                                                <input type="text" className="form-control input" id="hobbies" name="hobbies" onChange={handleChange} defaultValue={donor.hobbies} placeholder="Tell us about your hobbies" required/>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                    )}
                                </Popup></td>
                            </tr>);
                        })}
                    </tbody>
                </table>
                <div className="text-center btn_add_details">
                    <button className="btn btn-danger btn-lg" onClick={sendDetails}>Send Details</button>
                </div>
            </div>

        </div>);
}

export default Main;