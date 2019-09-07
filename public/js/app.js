const form = document.getElementById('form');
const longUrl = document.getElementById('longurl');
const shortUrl = document.getElementById('shorturl');
const error = document.getElementById('error');

document.querySelector('.card').classList.add('hide');
document.querySelector('.alert').classList.add('hide');
document.querySelector('.loader').classList.add('hide');


// Form submission action code
form.addEventListener('submit', (e) => {
    e.preventDefault();


    document.querySelector('.loader').classList.remove('hide');


    // make a post request to url shorter api with the longUrl obtained from the client
    const data = {
        "longUrl": longUrl.value
    }

    // Post the request after 3 seconds 
    setTimeout(function () {
        $.ajax({
            type: 'POST',
            url: "http://localhost:5000/api/url/shorten",
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            traditional: true,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                shortUrl.innerText = result.shortUrl;
                document.querySelector('.card').classList.remove('hide');
                document.querySelector('.alert').classList.add('hide');
                document.querySelector('.loader').classList.add('hide');
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log(responseData);
                error.innerText = responseData.responseText;
                document.querySelector('.alert').classList.remove('hide');
                document.querySelector('.card').classList.add('hide');
                document.querySelector('.loader').classList.add('hide');
            }
        });

    }, 3000);

    // on clicking the url open a new tab
    shortUrl.addEventListener('click', () => {
        window.open(shortUrl.innerText);
    })
});