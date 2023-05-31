import React, { useState, useEffect } from "react";

const SelectDevice = () => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  useEffect(() => {
    // Yazıcıları almak için gerekli kodu buraya ekleyin
    // Örneğin, Web API'lerini kullanabilirsiniz
    // veya tarayıcı tarafından sağlanan bir yazıcı API'sini kullanabilirsiniz
    // Bu örnekte, varsayılan yazıcıları kullanacağız
    // const fetchedPrinters = window.MediaDevices();
    // console.log(fetchedPrinters, "fetchedPrinters");
    // setPrinters(fetchedPrinters);
  }, []);

  const handlePrinterSelect = (printer) => {
    setSelectedPrinter(printer);
  };

  const handleSubmit = () => {
    if (selectedPrinter) {
      // Seçilen yazıcıya test yazısını çıkarmak için gerekli kodu buraya ekleyin
      // Örneğin, Web API'lerini kullanabilirsiniz
      // veya tarayıcı tarafından sağlanan bir yazıcı API'sini kullanabilirsiniz
      // Bu örnekte, varsayılan yazıcıları kullanacağız
      // window.printer.printTestPage(selectedPrinter);
    }
  };

  return (
    <div>
      <h2>Yazıcılar</h2>
      {/* <ul>
        {printers.map((printer) => (
          <li key={printer.id} onClick={() => handlePrinterSelect(printer)}>
            {printer.name}
          </li>
        ))}
      </ul>
      <button disabled={!selectedPrinter} onClick={handleSubmit}>
        Gönder
      </button> */}
    </div>
  );
};

export default SelectDevice;

// import React, { useEffect, useState } from "react";

// function SelectDevice() {
//   const [devices, setDevices] = useState([]);
//   const [selectedDevice, setSelectedDevice] = useState("");

//   const handleDeviceChange = (event) => {
//     setSelectedDevice(event.target.value);
//   };

//   useEffect(() => {
//     const getConnectedDevices = async () => {
//       try {
//         const ports = await navigator.serial.getPorts();
//         const deviceList = ports.map((port, index) => ({
//           portNumber: index + 1,
//           portObject: port,
//         }));
//         setDevices(deviceList);
//       } catch (error) {
//         console.error("Cihaz listesi alınırken bir hata oluştu:", error);
//       }
//     };

//     getConnectedDevices();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (selectedDevice === "") {
//       console.log("Cihaz seçilmedi");
//       return;
//     }

//     try {
//       const selectedDeviceObject = devices.find(
//         (device) => device.portNumber === parseInt(selectedDevice)
//       );
//       console.log("selectedDevice Object:", selectedDeviceObject);

//       if (selectedDeviceObject) {
//         const selectedPort = devices.find(
//           (device) => device.portNumber === parseInt(selectedDevice)
//         )?.portObject;
//         console.log("eslected port", selectedPort);
//         const testData = "Test yazısı";
//         selectedPort.writable
//           .write(new TextEncoder().encode(testData))
//           .then(() => {
//             console.log("Test yazısı başarıyla gönderildi");
//           })
//           .catch((error) => {
//             console.error("Test yazısı gönderilirken bir hata oluştu:", error);
//           });

//         console.log("Test yazısı başarıyla gönderildi");
//       } else {
//         console.log("Seçilen cihaz bulunamadı");
//       }
//     } catch (error) {
//       console.error("Test yazısı gönderilirken bir hata oluştu:", error);
//     }
//   };
//   return (
//     <div>
//       <h1>Adisyon Cihazı Seçimi</h1>

//       <form onSubmit={handleSubmit}>
//         <label>
//           Adisyon Cihazı:
//           <select value={selectedDevice} onChange={handleDeviceChange}>
//             <option value="">Cihaz Seçin</option>
//             {devices.map((device) => (
//               <option key={device.portNumber} value={device.portNumber}>
//                 Port {device.portNumber}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <button type="submit">Seçimi Onayla</button>
//       </form>
//     </div>
//   );
// }

// export default SelectDevice;

// import React, { useEffect, useState } from "react";

// function SelectDevice() {
//   const [devices, setDevices] = useState([]);
//   const [selectedDevice, setSelectedDevice] = useState("");

//   const handleDeviceChange = (event) => {
//     setSelectedDevice(event.target.value);
//   };

//   useEffect(() => {
//     const getConnectedDevices = async () => {
//       try {
//         const ports = await navigator.serial.getPorts();
//         const deviceList = ports.map((port) => port.getInfo().usbProduct);
//         setDevices(deviceList);
//       } catch (error) {
//         console.error("Cihaz listesi alınırken bir hata oluştu:", error);
//       }
//     };

//     const connectToAllDevices = async () => {
//       try {
//         const ports = await navigator.serial.getPorts();
//         for (const port of ports) {
//           await port.open({ baudRate: 9600 });
//           // Bağlantı yapıldığında yapılacak işlemleri buraya ekleyebilirsiniz
//           console.log("Porta bağlandı:", port.getInfo().usbProduct);
//         }
//       } catch (error) {
//         console.error("Cihaza bağlanırken bir hata oluştu:", error);
//       }
//     };

//     getConnectedDevices();
//     connectToAllDevices();
//   }, []);

//   return (
//     <div>
//       <h1>Adisyon Cihazı Seçimi</h1>

//       <form>
//         <label>
//           Adisyon Cihazı:
//           <select value={selectedDevice} onChange={handleDeviceChange}>
//             <option value="">Cihaz Seçin</option>
//             {devices.map((device, index) => (
//               <option key={index} value={device}>
//                 {device}
//               </option>
//             ))}
//           </select>
//         </label>
//       </form>
//     </div>
//   );
// }

// export default SelectDevice;
