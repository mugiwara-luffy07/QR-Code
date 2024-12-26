import { useState } from "react"

const qrcode = () => {
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false);
  const[qrdata,setQrdata]=useState("");
  const [qrsize,setQrsize]=useState("150");

  async function generateQR(){
    setLoading(true);
    try {
      const url= `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
      setImg(url);
    } catch (error) {
      console.error("Error generating in QR Code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img).then((Response)=>Response.blob()).then((blob)=>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch ((error)=> {
      console.error("Error in Downloading QR Code", error);
  });
}
    
  return (
    
        <div className="container">
          <h1> QR CODE GENERATOR </h1>
          {img && <img src={img} className="image"/>}
          {loading && <p>Please wait...</p>}
          <div>
           <label htmlFor="dataInput" className="input-label" > Data for QR code:
          </label>
          <input type="text" id="datainput" placeholder="Enter the data for QR code " onChange={(e)=>setQrdata(e.target.value)}/>
          <label htmlFor="sizeinput" className="input-label" > Image size (e.g.,150):
          </label>
          <input type="text" value={qrsize} onChange={(e)=>setQrsize(e.target.value)} id="sizeinput" placeholder="Enter the image size" />
          <button className="generate" onClick={generateQR} disabled={loading}>Generate QR  </button>
          <button className="download" onClick={downloadQR}>Download QR code</button>
         </div>
         <p className="footer">Designed By <a href="https://github.com/mugiwara-luffy07">Sri Akash</a></p>
        </div>
  )
}

export default qrcode
