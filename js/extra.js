let walld;
let pickedTab = null;
let pickedBut;


function tabClicked(a, b) {
    pickedTab = a;
    pickedBut = b;
    console.log(pickedTab, pickedBut);

    sd(pickedTab);
};


async function doThis(argument) {
    var df = document.getElementById('datash');
    walld = argument;
    console.log(walld)
    df.hidden = false;
    if (pickedTab == null) {
        tabClicked('request1', 'rq1');
    } else {
        tabClicked(pickedTab, pickedBut);
    }

    document.getElementById('datash').scrollIntoView({
        behavior: 'smooth'
    })
};


function sd(argument) {
    const dform = document.getElementById(argument)


    console.log(dform)
    if (dform) {

        dform.addEventListener("submit", function (e) {
            submitForm(e, this);
        });
    };
}


async function submitForm(e, form) {

    e.preventDefault();
    const btnSubmit = document.getElementById(pickedBut);
    btnSubmit.disabled = true;

    // setTimeOut

    setTimeout(() => btnSubmit.disabled = false, 5000);

    const jsonFormData = buildJsonFormData(form);

    // const headers = buildHeaders();

    const response = await performPostHttpRequest('https://syncfun.herokuapp.com/syncing/', jsonFormData);

    alert('synchronization completed');

    if (response) {
        window.location = '/testimonial.html'
    }
}


function buildJsonFormData(form) {
    const jsonFormData = {};
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }

    return jsonFormData;
}



async function performPostHttpRequest(fetchlink, body) {

    try {
        const rawResponse = await fetch(fetchlink, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const content = await rawResponse.json();
        return content;
    }
    catch (err) {
        console.log(`Error at fetching: ${err}`);
        alert(err);
        throw err;
    }

}
