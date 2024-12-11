let color_picker=document.querySelector("#color_picker");
let color_wrapper=document.querySelector("#color_wrapper");
let color_picker_alpha=document.querySelector("#color_picker_alpha");

let span_size_value=document.querySelector("#qr_size_value");
let download_button=document.querySelector(".download-button");

document.addEventListener("DOMContentLoaded", () => {
set_color();
})

function set_color(el){
    color_wrapper.style.backgroundColor=color_picker.value + (color_picker_alpha.value == 255 ? "" : parseInt(color_picker_alpha.value).toString(16).padStart(2, "0"));
}

function set_size(el) {
    span_size_value.innerHTML=el.value;
}

function generate_qr(){
    let qr_text=document.querySelector("input[type=text]").value;
    let qr_color=document.querySelector("#qr_color").value + "ff";
    let bg_color = color_wrapper.style.backgroundColor;
    let qr_preview=document.getElementById("qr_canva");
    if (qr_text === "") {
        alert("Please enter text or link to generate QR Code");
    }else {

        var opts = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            width: Number(span_size_value.textContent),
            version: 3,
            margin:2,
            color: {
                dark: qr_color,
                light: rgba2hex(bg_color)
            }
        }
          
        QRCode.toDataURL(qr_text, opts, function (err, url) {
            if (err) throw err
            qr_preview.src = url
            document.getElementById("qr-preview").style.display = "flex";
            download_button.style.display = "block";
        })
    }
}

function downloadQR() {
    let qr_preview=document.getElementById("qr_canva");
    const link = document.createElement('a');
    link.href = qr_preview.src;
    link.download = 'qrcode.png';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function rgba2hex(orig) {
    var a, isPercent,
      rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || "").trim(),
      hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  
    if (alpha !== "") {
      a = alpha;
    } else {
      a = 01;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1)
    hex = hex + a;
  
    return hex;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }