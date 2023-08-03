import React from "react";
import { Link } from 'react-router-dom'

const Dashboard = () => {
        return (
          <div style={dashboardStyle}>
            <header>
              <nav style={navStyle}>
                <div style={textContainerStyle}>
                        <p style={textStyle}>Fitbit Pro</p>
                </div>
                <li>
                  <Link to="/workoutManage" style={buttonStyle}>
                    Workout Manage
                  </Link>
                  <Link to="/cheatMealManage" style={buttonStyle}>
                    Cheat Meal Manage
                  </Link>
                </li>
                
              </nav>
            </header>
          </div>
        );
      };


const buttonStyle = {
  display: "inline-block",
  padding: "12px 35px",
  fontFamily:'Times New Roman',
  background: "black", 
  color: "#fff", 
  textDecoration: "none",
  borderRadius: "5px",
  margin: "5px",
  fontSize: "50px",
};

const dashboardStyle = {
      
        backgroundImage: "url(https://img.freepik.com/free-photo/health-club-without-people-with-exercise-equipment_637285-8446.jpg?w=740&t=st=1691009441~exp=1691010041~hmac=66d8c5542b1d4cf31d6b71f0b2f60f5603055397dc0e1c2bd31eed46a86407da)", 
        backgroundPosition: "center",
        backgroundSize: 'cover',
        opacity: 0.9,
        minHeight: "100vh", 
};

const navStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
};

const textContainerStyle = {
        textAlign: "center",
        margin: "10px",
      };
      
const textStyle = {
        fontSize: "170px",
        fontWeight: "bold",
        fontFamily: "Times New Roman",
        color: "black", 
        borderWidth: 5,
     
        
};

export default Dashboard;