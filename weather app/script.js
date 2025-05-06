const toggleSwitch =document.getElementById("theme-toggle");

toggleSwitch.addEventListener("change", ()=>{
    if (toggleSwitch.checked){
        document.body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled")
    }else{
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
    }
});

//open weather map api 
const apiKey = "5ca925b80b5737590a5ababfe7908369";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".main input");
const searchBtn = document.querySelector(".main button");
const weatherIcon = document.querySelector(".weather-icon");


async function weather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("Invalid City Name. Please enter a correct city name.");
        searchBox.value = "";
        document.querySelector(".weather").style.display = "none";
    }else {

        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".visibility").innerHTML = (data.visibility / 1000).toFixed(1) + "km";


        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "sunny.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "snow.png";
        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "thunder.png";
        }
        else if(data.weather[0].main == "Haze"){
            weatherIcon.src = "haze.png";
        }

        document.querySelector(".weather").style.display = "flex";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    weather(searchBox.value);
})

//****language translate
const languageToggle = document.getElementById("language-toggle");
const searchInput = document.getElementById("search-input");
const cityName = document.getElementById("city-name");
const errorMsg = document.getElementById("error-msg");

const translations = {
    en: {
        searchPlaceholder: "Search City",
        error: "Invalid City Name.\nPlease enter correct city name.",
        city: "Panadura",
        humidity: "Humidity",
        wind: "Wind Speed",
        visibility: "Visibility"
    },
    ja: {
        searchPlaceholder: "都市を検索",
        error: "無効な都市名です。\n正しい都市名を入力してください。",
        city: "パーーナドゥラ",
        humidity: "湿度",
        wind: "風速",
        visibility: "視程"
    }
};

function updateLanguage(lang) {
    const t = translations[lang];
    searchInput.placeholder = t.searchPlaceholder;
    cityName.textContent = t.city;
    errorMsg.innerHTML = t.error.replace('\n', "<br>");
    document.querySelector(".humidity-label").textContent = t.humidity;
    document.querySelector(".wind-label").textContent = t.wind;
    document.querySelector(".visibility-label").textContent = t.visibility;
    localStorage.setItem("language", lang);
}

// Load saved language on page load
const savedLang = localStorage.getItem("language") || "en";
languageToggle.value = savedLang;
updateLanguage(savedLang);

languageToggle.addEventListener("change", () => {
    const selectedLang = languageToggle.value;
    updateLanguage(selectedLang);
});
