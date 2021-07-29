console.log(`Client side javascript file is loaded!`);

const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
const messageOne = document.querySelector(`#message-1`);
const messageTwo = document.querySelector(`#message-2`);

weatherForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const location = search.value;
  //   console.log(`Testing`, location);
  messageOne.textContent = ``;
  messageOne.textContent = `Loading...`;
  messageTwo.textContent = ``;
  //Fetch
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(`Error`);
          messageOne.textContent = data.error;
        } else {
          console.log(data.location);
          console.log(data.forecast);
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
