document.addEventListener("DOMContentLoaded", async function () {

    var original = await GetBytes();
    var original_array_buffer = _base64ToArrayBuffer(original);
    var original_bytes_array = _arrayBufferToBytesArray(original_array_buffer);
    document.querySelector("#original").innerHTML = original_bytes_array.join();

    var received = await PostBytes(original);
    var received_array_buffer = _base64ToArrayBuffer(received);
    var received_bytes_array = _arrayBufferToBytesArray(received_array_buffer);

    document.querySelector("#received").innerHTML = received_bytes_array.join();
});

function _arrayBufferToBytesArray(buffer)
{
    var dataView = new DataView(buffer);
    var bytes = [];
    for (var i = 0; i < dataView.byteLength; i++)
    {
        bytes.push(dataView.getUint8(i));
    }

    return bytes;
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }

    return bytes.buffer;
}

async function GetBytes() {
    let url = '/api/bytes';

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    })
    let data = await response.json();

    return data;
}

async function PostBytes(original) {
    let url = '/api/bytes';

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/octet-stream'
        },
        body: original
    })

    let data = await response.json();

    return data;
}
