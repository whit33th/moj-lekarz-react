import useGetPatientInfo from "@hooks/DoctorHooks/useGetPatientInfo";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import useGetAppointmentForUser from "../../../api/hooks/DoctorHooks/useGetAppointmentForUser";
import BlueBtn from "../../../components/Buttons/BlueBtn/BlueBtn";
import PatientMoreInfoModal from "../../../components/Modals/PatientMoreInfoModal/PatientMoreInfoModal";
import grey from "./../../../assets/img/grey.png";
import useStore from "./../../../data/store";
import styles from "./PatientInfo.module.css";

function PatientInfo() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { setModalActive, setModalContent } = useStore();

  const { data: patient, isError, isLoading } = useGetPatientInfo(id);
  const { data: patientVisits } = useGetAppointmentForUser({ patientId: id });

  if (isError || typeof id !== "string") {
    navigate("/no-patient");
  }

  const patientInfo = {
    name: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.first_name || "Brak",
    surname: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.last_name || "Brak",
    photo: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.photo || "zdrowie.png",
    gender: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.gender || "Brak",
    pesel: isLoading ? "Ładowanie..." : patient?.patient?.user?.pesel || "Brak",
    birthday: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.birthday.slice(0, 10) || "Brak",
    postCode: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.address?.post_index || "Brak",
    house: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.address?.home || "Brak",
    flat: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.address?.flat || "Brak",
    street: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.address?.street || "Brak",
    city: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.address?.city || "Brak",
    height: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.height || "Brak",
    weight: isLoading
      ? "Ładowanie..."
      : patient?.patient?.user?.weight || "Brak",
    tel: isLoading ? "Ładowanie..." : patient?.patient?.user?.phone || "Brak",
    comments: patient?.patient?.user?.comments || null,
    history: patient?.patient?.user?.history || null,
    email: isLoading ? "Ładowanie..." : patient?.patient?.user?.email || "Brak",
  };

  // const comments = patientInfo?.comments ? (
  //   patientInfo.comments.map((comment, index) => (
  //     <div key={index}>
  //       <span>{comment.name}</span>
  //       <div className={styles.commentsType}>{comment.type}</div>
  //     </div>
  //   ))
  // ) : (
  //   <div>Brak uwag</div>
  // )

  const history = patientVisits?.appointments ? (
    patientVisits?.appointments.map((visit, index) => (
      <div className={styles.visitsRecord} key={index}>
        <span>{index + 1 + "." + " " + visit.description}</span>
        <span className={styles.grey}>
          {visit.service.name + " " + visit.service.price + " zl"}
        </span>
        <span>{visit.date + " / " + visit.start_time}</span>
      </div>
    ))
  ) : (
    <div>Brak historii wizyt</div>
  );

  function handleModal() {
    setModalActive(true);
    setModalContent(<PatientMoreInfoModal patientInfo={patientInfo} />);
  }

  return (
    <div className={styles.profilDiv}>
      <div className={styles.topPhoto}>
        <img src={isLoading ? grey : patientInfo?.photo} alt="Profile" />
        <h1 style={{ margin: "0" }}>
          {isLoading ? (
            <Skeleton width={300} />
          ) : (
            patientInfo?.name + " " + patientInfo?.surname
          )}
        </h1>
        <p className={styles.grey}>
          {isLoading ? <Skeleton width={250} /> : patientInfo?.tel}
        </p>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.profilInfo}>
        <div className={styles.mainInfo}>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="name">Imię</label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientInfo?.name}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={patientInfo?.surname}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="pesel">PESEL</label>
              <input
                type="text"
                id="pesel"
                name="pesel"
                value={patientInfo?.pesel}
                readOnly
              />
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="date">Data urodzenia</label>
              <input
                type="text"
                id="date"
                name="date"
                value={patientInfo?.birthday}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="city">Miasto</label>
              <input
                type="text"
                id="city"
                name="city"
                value={patientInfo?.city}
                readOnly
              />
            </div>
            <div className={styles.row}>
              <div>
                <label htmlFor="house-nr">Nr. Domu</label>
                <input
                  type="text"
                  id="house-nr"
                  name="house-nr"
                  value={patientInfo?.house}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="flat-nr">Nr. Lokalu</label>
                <input
                  type="text"
                  id="flat-nr"
                  name="flat-nr"
                  value={patientInfo?.flat}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className={styles.oneThird}>
            <div>
              <label htmlFor="address">Adres</label>
              <input
                type="text"
                id="address"
                name="address"
                value={patientInfo?.street}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="postcode">Kod posztowy</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={patientInfo?.postCode}
                readOnly
              />
            </div>
            <div>
              <BlueBtn cb={handleModal}>Więcej informacji</BlueBtn>
            </div>
            {/* <div className={styles.row}>
              <div>
                <label htmlFor="height">Wzrost</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={patientInfo?.height}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="weight">Waga</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={patientInfo?.weight}
                  readOnly
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.rules}>
        <div className={styles.center}>
          {/* <Tabs buttons="Uwagi, Historia wizyt" activeTab={activeTab} onTabClick={handleTabClick} /> */}

          {history && <h1>Historia wizyt</h1>}
        </div>
        {/* {activeTab === "Uwagi" && comments} */}
        {history}
      </div>
    </div>
  );
}

export default PatientInfo;
