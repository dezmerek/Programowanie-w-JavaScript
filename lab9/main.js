function pobierzPogode() {
    const API_KEY = `f06f748cb174f38b78906946a08bab92`;
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${'Krakow'}&units=metric&appid=${API_KEY}`
    ).then((res) => res.json())
    .then(data => {
      console.log(data)
    });
  }
  pobierzPogode();