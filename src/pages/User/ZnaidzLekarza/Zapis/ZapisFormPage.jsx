import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./ZapisFormPage.module.css";
import imgName from "@assets/img/simple-line-i.svg";
import imgType from "@assets/img/Vector14.svg";
import phoneImg from "@assets/img/ph_phone-light.svg";
import visitorImg from "@assets/img/Vector15.svg";
import { pageConfig } from "../../../../config/config";
import { useForm } from "react-hook-form";
import usePostAppointment from "../../../../api/hooks/PatientHooks/usePostAppointment";

function ZapisFormPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm();
  const { mutate, isPending } = usePostAppointment();

  // Add state validation
  if (!state) {
    console.log("No state available");
    navigate("/");
    return null;
  }

  const { doctor, clinic, appointment, visitDetails } = state;

  console.log(appointment);
  // Add validation for required data
  if ((!doctor || !clinic || !appointment, !visitDetails)) {
    console.log("Missing required data");
    navigate("/");
    return null;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pesel: "",
    comment: "",
    file: null,
    acceptTerms: false,
    acceptMarketing: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = () => {
    const appointmentData = {
      doctorId: doctor.id,
      serviceId: visitDetails.serviceId,
      clinicId: clinic.id,
      date: appointment.date,
      timeSlot: appointment.startTime,
      firstVisit: visitDetails.isFirstVisit,
      visitType: visitDetails.type,
      description: formData.comment,
    };

    mutate(appointmentData, {
      onSuccess: () => {
        navigate("/zapis-done");
      },
    });
  };

  return (
    <div className={styles.zapisFormPage}>
      {/* Add loading state */}
      {!state ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Informacje o wizycie</h1>
          <div className={styles.zapisPageLeft}>
            <div className={styles.zapisPageLeftTimeBlock}>
              <p>{appointment.date}</p>
              <p className={styles.zapisPageLeftTimeText}>
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
            <div className={styles.infoblock}>
              <div className={styles.infoblockNameBlock}>
                <div className={styles.zapisPageLeftNameBlock}>
                  <img src={imgType} alt="Doctor" />
                  <div>
                    <p>{doctor.name}</p>
                    <p className={styles.zapisPageLeftType}>
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className={styles.zapisPageLeftNameBlock}>
                  <img src={visitorImg} alt="Visit" />
                  <div>
                    <p>Typ wizyty:</p>
                    <p className={styles.zapisPageLeftType}>
                      {visitDetails.type}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.infoblockPhoneBlock}>
                <div className={styles.zapisPageLeftAddressBlock}>
                  <img src={imgName} alt="Location" />
                  <div>
                    <p>{clinic.name}</p>
                    <p className={styles.zapisPageLeftCity}>{clinic.address}</p>
                  </div>
                </div>
                <div className={styles.zapisPageLeftAddressBlockBtnPhone}>
                  <a href={`tel:${doctor.phone}`}>
                    <img src={phoneImg} alt="Phone" />
                    {doctor.phone}
                  </a>
                </div>
              </div>
            </div>
            <hr style={{ margin: "20px 0" }} />
            <div className={styles.zapisPageLeftTimeBlock}>
              <p>
                {visitDetails.service}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formBlock}>
              <h1>Rejstracja wizytu</h1>
              <div className={styles.inputsBlock}>
                <div className={styles.inputsBlockLeft}>
                  <div>
                    <p>Imię</p>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Podaj swoje imię"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <p>Nazwisko</p>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Podaj swoje nazwisko"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <p>Telefon</p>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Podaj numer telefonu"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <p>Pesel</p>
                    <input
                      type="text"
                      name="pesel"
                      placeholder="Podaj numer pesel"
                      value={formData.pesel}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.textareaBlock}>
                  <p>Komentarz</p>
                  <textarea
                    name="comment"
                    placeholder="Wpisz komentarz"
                    value={formData.comment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.checkboxBlock}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                />
                <span className={styles.checkmark}></span>
                <p>
                  <span>*</span> Zgadzam się, żeby MyLekarz przetwarzał moje
                  dane medyczne w celu korzystania z usług.
                </p>
                <Link
                  to={pageConfig.patient.policy.personalData}
                  style={{ color: "#3e36b0" }}
                >
                  Dowiedz się więcej
                </Link>
              </label>
            </div>

            <div className={styles.btnBlock}>
              <button
                type="button"
                className={styles.btnBlockBack}
                onClick={() => window.history.back()}
              >
                Anuluj
              </button>
              <button
                type="submit"
                className={styles.btnBlockContinue}
                disabled={isPending}
              >
                {isPending ? "Przetwarzanie..." : "Kontynuj"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default ZapisFormPage;
