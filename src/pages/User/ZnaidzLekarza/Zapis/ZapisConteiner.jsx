import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../../../data/store";
import { sendNewOrder } from "./../../../../helpers/apiService";
import LoadingPage from "./LoadingPage";
import ZapisDone from "./ZapisDone";
import ZapisFormPage from "./ZapisFormPage";
import ZapisPage from "./ZapisPage";

function ZapisConteiner({ zapisState, isLoggedIn }) {
  const [data, setData] = useState(zapisState);
  const [typWizyty, setTypWizyty] = useState(
    "Konsultacja ginekologiczna • 290,00 zł"
  );
  const [rodzajWizyty, setRodzajWizyty] = useState("Prywatna");
  const [selectedRadio, setSelectedRadio] = useState("null");
  const [activePageName, setActivePageName] = useState("ZapisPage");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formDataObj, setFormDataObj] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { doctorCard } = useStore();
  useEffect(() => {
    const doctor = doctorCard.find((item) => item.id == id);
    const dataDoctor = {
      idDoctor: zapisState.idDoctor ?? id,
      date: zapisState.date ?? "18.05.2024",
      time: zapisState.time ?? "13:00",
      allData: doctor,
    };
    setData(
      dataDoctor || {
        idDoctor: id,
        date: "18.05.2024",
        time: "13:00",
        allData: {},
      }
    );
  }, [id, doctorCard, zapisState]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/");
    }
  }, [navigate, isLoggedIn]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const changeActivePage = (name) => {
    setActivePageName(name);
  };

  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(":").map(Number);
    const newMins = mins + minutes;
    const newHours = hours + Math.floor(newMins / 60);
    const finalMins = newMins % 60;
    return `${String(newHours).padStart(2, "0")}:${String(finalMins).padStart(
      2,
      "0"
    )}`;
  };

  const endTime = data.time ? addMinutes(data.time, 15) : "";

  const addZapisFc = async (name, surName, phone, pesel, file, comments) => {
    setActivePageName("ZapisDone");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surName", surName);
    formData.append("phone", phone);
    formData.append("pesel", pesel);
    formData.append("file", selectedFile);
    formData.append("comments", comments);
    formData.append("typWizyty", typWizyty);
    formData.append("rodzajWizyty", rodzajWizyty);
    formData.append("selectedRadio", selectedRadio);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("idDoctor", data.idDoctor);
    formData.append("nameDoctor", data.name);
    setFormDataObj({
      name: name,
      surName: surName,
      phone: phone,
      pesel: pesel,
      comments: comments,
      file: file,
    });
    try {
      const result = await sendNewOrder(formData);
      console.log("Form submitted successfully:", result);
      setActivePageName("ZapisDone");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      {data.idDoctor !== undefined ? (
        (activePageName === "ZapisPage" && (
          <ZapisPage
            zapisState={zapisState}
            data={data}
            typWizyty={typWizyty}
            setTypWizyty={setTypWizyty}
            rodzajWizyty={rodzajWizyty}
            setRodzajWizyty={setRodzajWizyty}
            selectedRadio={selectedRadio}
            setSelectedRadio={setSelectedRadio}
            changeActivePage={changeActivePage}
            endTime={endTime}
          />
        )) ||
        (activePageName === "ZapisFormPage" && (
          <ZapisFormPage
            zapisState={zapisState}
            data={data}
            typWizyty={typWizyty}
            rodzajWizyty={rodzajWizyty}
            selectedRadio={selectedRadio}
            endTime={endTime}
            changeActivePage={changeActivePage}
            addZapisFc={addZapisFc}
            handleFileUpload={handleFileUpload}
          />
        )) ||
        (activePageName === "loading" && <LoadingPage />) ||
        (activePageName === "ZapisDone" && (
          <ZapisDone
            data={data}
            typWizyty={typWizyty}
            rodzajWizyty={rodzajWizyty}
            selectedRadio={selectedRadio}
            endTime={endTime}
            changeActivePage={changeActivePage}
            addZapisFc={addZapisFc}
            handleFileUpload={handleFileUpload}
            formDataObj={formDataObj}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
export default ZapisConteiner;
