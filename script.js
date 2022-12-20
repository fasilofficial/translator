const from = document.getElementById("from");
const to = document.getElementById("to");
const button = document.getElementById("button");
const source = document.getElementById("source");
const target = document.getElementById("target");
const icon = document.getElementById("icon");

const rapidAPIKey = config.RapidAPIKey

icon.addEventListener("click", () => {
	let temp = source.value
	source.value = target.value	
	target.value = temp
})

button.addEventListener("click", () => {
	const encodedParams = new URLSearchParams();
	encodedParams.append("q", from.value);
	encodedParams.append("target", `${target.value}`);
	encodedParams.append("source", `${source.value}`);
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'Accept-Encoding': 'application/gzip',
			'X-RapidAPI-Key': rapidAPIKey,
			'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		},
		body: encodedParams
	};
	fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
		.then(response => response.json())
		.then(response => {
			to.value = response?.data?.translations[0]["translatedText"];
			console.log(response)
		})
		.catch(err => console.error(err));
})