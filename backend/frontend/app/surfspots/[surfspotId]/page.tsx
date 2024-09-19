

import AddToFavourites from "@/app/components/addToFavs";
import { IsLoggedIn } from "@/app/components/auth";
import RemoveFromFavourites from "@/app/components/removeFromFavs";
import AddUserWeatherButton from "@/app/components/addUserWeather";
import { IsAdmin } from "@/app/components/auth";
import EditSurfspotModal from "@/app/components/editSurfspot";
import DeleteSurfspotModal from "@/app/components/deleteSurfspot";
import AddReviewModal from "@/app/components/addReview";
import { cookies } from "next/headers";
import DeleteReviewModal from "@/app/components/deleteReview";
import DeleteUserWeatherModal from "@/app/components/deleteUserWeather";
import EditReviewModal from "@/app/components/editReview";











export default async function surfspotPage({params}: any) {

   const surfspotId = params.surfspotId
   const admin = await IsAdmin()


   
    async function getOneSurfspot() {
    
        const response = await fetch(`http://localhost:5000/api/v1.0/surfspots/${surfspotId}`, {
            method: 'GET',
            cache: 'no-store'
        })
        const data = await response.json()
        return data;
    }
    
    
    async function getSurfspotForecast() {
    
        const response = await fetch(`http://localhost:5000/api/v1.0/surfspots/${surfspotId}/forecast`, {
            method: 'GET',
            cache:  'default'
        })
        const data = await response.json()
        return data;
    } 



   const surfspotData = await getOneSurfspot()
   const surfspotForecastData = await getSurfspotForecast()
   console.log(surfspotData)
   console.log(surfspotForecastData)

   const surfspot = surfspotData[1]
   const surfspotCondtions = surfspotData[0].hours[0]
   const surfspotForecast = surfspotForecastData[0]

   

   function groupForecastByDay(forecastData: any[]) {
    
    const groupedForecast: { [key: string]: any[] } = {};
  
    
    forecastData.forEach((hour: any) => {
      
      const date = new Date(hour.time).toLocaleDateString();
  
      
      if (groupedForecast[date]) {
        
        groupedForecast[date].push(hour);
      } else {
        
        groupedForecast[date] = [hour];
      }
    });
  
    return groupedForecast;
  }


  const groupedForecast = groupForecastByDay(surfspotForecast.hours);
  

   
  const degreesToCompass = (degrees : number) => {
    
    const val = Math.floor((degrees / 45) + 0.5);
  
    
    const compassArray = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  
    
    return compassArray[(val % 8)];
  }
  
  
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-black border-b border-black" id="surfspot-info">
        <h2>{surfspot.break_type}</h2>
        <h2>{surfspot.skill_level}</h2>
        <h2>{surfspot.rating}</h2>
        <div className="text-right ">
        {  await IsLoggedIn() && <AddToFavourites surfspot={surfspot} />}
        </div>
        <div className="text-right my-5">
        {  await IsLoggedIn() && <RemoveFromFavourites surfspot={surfspot} />}
        </div>
        <div className="text-right">
        {  await IsLoggedIn()  && await IsAdmin() &&( <EditSurfspotModal surfspot={surfspot} />)}
        {  await IsLoggedIn()  && await IsAdmin() &&( <DeleteSurfspotModal surfspot={surfspot} />)}
        </div>
        <h1 className="text-black text-2xl my-2">{surfspot.spot_name}</h1>
      </div>
      <div id="surfspotBanner">
        <img className="w-full h-80" src={surfspot.thumbnail} alt="Surfspot thumbnail" />
      </div>
      {/* current surf conditions */}
      <div className="text-center mt-8" id="currentSurfCondtions">
        <h1 className="text-2xl">Current surf conditions</h1>
        <div className="flex flex-wrap justify-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 p-4">
            <div className="border border-black rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">Wave height</h2>
              <p className="text-gray-600">Wave height: {(surfspotCondtions.waveHeight['sg'] * 3.281).toFixed(1)} ft</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 p-4">
            <div className="border border-black rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">Wind</h2>
              <p className="text-gray-600">Wind speed: {(surfspotCondtions.windSpeed['sg'] * 2.237).toFixed(1)} MPH {degreesToCompass(surfspotCondtions.windDirection['sg'])}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 p-4">
            <div className="border border-black rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">Water Temp</h2>
              <p className="text-gray-600">Water temperature: {surfspotCondtions.waterTemperature['sg'].toFixed(1)} &#8451;</p>
            </div>
          </div>
        </div>
        {/* Forecast */}
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Forecast for next 7 days</h2>
          {Object.entries(groupedForecast).map(([date, hours], index) => (
          <div key={index}>
            <h3 className="my-3 font-bold">{date}</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th>Time</th>
                <th>Wave Height (ft)</th>
                <th>Wind Speed (MPH)</th>
                <th>Wind Direction</th>
                <th>Water Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((hour: any, index: number) => (
                <tr key={index}>
                  <td>{new Date(hour.time).toLocaleTimeString('en-UK', { hour: 'numeric', minute: '2-digit', hour12: true })}</td>
                  <td>{(hour.waveHeight['sg'] * 3.281).toFixed(1)}</td>
                  <td>{(hour.windSpeed['sg'] * 2.237).toFixed(1)}</td>
                  <td>{degreesToCompass(hour.windDirection['sg'])}</td>
                  <td>{hour.waterTemperature['sg'].toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          ))}
        </div>
        {/* user weather reports */}
        <div className="my-10 text-xl font-bold border-black border-b">
          <h1>User Reports</h1>
        </div>
        <div>
          {await IsLoggedIn() && <AddUserWeatherButton surfspot={surfspot}/>}
        </div>
        {surfspot.user_weather.map((report : any, index : any) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 my-20">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-800 font-semibold">Username: {report.username}</p>
              <p className="text-gray-600 font-semibold">Time published: {report.time_published}</p>
            </div>
            <p className="text-gray-800">Wave height: {report.waveheight}</p>
            <p className="text-gray-800">Rating: {report.rating}</p>
            <p className="text-gray-800">Weather: {report.weather}</p>
            <p className="text-gray-800">Recommended board: {report.recommended_board}</p>
            <h2 className="text-gray-800 font-semibold my-3">Comment</h2>
            <p className="text-gray-800 my-3">{report.comment}</p>
            {( admin || cookies().get('user')?.value == report.username) &&  <DeleteUserWeatherModal surfspot={surfspot} user_weather={report} />}

            </div>
        ))}
      </div>
      {/* Reviews */}
      <div className="text-center">
        <div className="border-black border-b my-10">
          <h1 className="text-xl font-bold text-center">Reviews</h1>
        </div>
        { await IsLoggedIn() && < AddReviewModal surfspot={surfspot} />}
        {surfspot.reviews.map((review : any, index: any) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 my-20 text-center">
            <div className="flex justify-between items-center mb-2">
            <p className="text-gray-800 font-semibold">Username: {review.username}</p>
            <p className="text-gray-600 font-semibold">Date published: {review.date_published}</p>
          </div>
            <p className="text-gray-800">Rating: {review.rating}</p>
            <h2 className="text-gray-800 font-semibold my-3">Review</h2>
            <p className="text-gray-800 my-3">{review.review}</p>
            {( admin || cookies().get('user')?.value == review.username) &&  <DeleteReviewModal surfspot={surfspot} review={review} />}
            {( admin || cookies().get('user')?.value == review.username) &&  <EditReviewModal surfspot={surfspot} review={review} />}
          </div>
        ))}
      </div>
      {/* guider */}
      <div className="my-10">
        <h1 className="text-center text-xl font-bold  border-black border-b">Guide</h1>
        <p>{surfspot.guide}</p>
      </div>
    </div>
  );
  

  
  
  
  

}