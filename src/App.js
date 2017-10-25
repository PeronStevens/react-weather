import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  componentDidMount(){

    ("geolocation" in navigator) ? console.log("Geolocation is available") : console.log("Geolocation is not available");

      document.getElementsByClassName('loading')[0].classList.add('show');

      navigator.geolocation.getCurrentPosition(function(position){
        
          var latitude  = position.coords.latitude,
              longitude = position.coords.longitude,
              url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon=' + longitude + '&APPID=b7abfc0c73102fb6b2cf4df7a8e14052';
                              
          axios.get(url).then(function(response){

              var iconElement     = document.getElementById('icon'),
                  iconName        = response.data.weather[0].icon,
                  iconSrc         = 'http://openweathermap.org/img/w/' + iconName + '.png',
                  condition       = response.data.weather[0].main,
                  kelvenTemp      = response.data.main['temp'],
                  fahrenTemp      = Math.round(9/5 * (kelvenTemp - 273) + 32);
                  iconElement.src = iconSrc;

              document.getElementsByClassName('loading')[0].classList.remove('show');
              document.getElementsByClassName('temp')[0].innerHTML =  "<span>" +  fahrenTemp + '&#8457;</span>';
              document.getElementsByClassName('condition')[0].innerHTML =  "<span>" +  condition + '</span>';
          })
      })    
  }

  render() {
    return (
      <div>
          <div className="left" >
            <div className="temp">  
            </div>
          </div>
          <div className="right" >
            <div className="condition">  
            </div>                
            <img id='icon' alt=' ' src='' />
          </div>
      </div>
    );
  }
}

export default App;
