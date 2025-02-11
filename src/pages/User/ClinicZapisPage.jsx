import { useState } from "react";
import styles from "./style/ClinicZapisPage.module.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import DropdownStas from "../../components/Dropdown/DropdownStas";
import { useForm } from "react-hook-form";
import AppointmentCard from "./AppointmentCard";
import { pageConfig } from "../../config/config";
import useGetDoctorServices from "../../api/hooks/ServicesHooks/useGetDoctorServices";

function ClinicZapisPage() {
  const {id} = useParams();
  const {data: services, isLoading} = useGetDoctorServices(id);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  
  const servicesMap = {};
  const visitTypeOptions = services?.map(item => {
    const optionText = `${item.service.name}, ${item.service.price} zł`;
    servicesMap[optionText] = item.service.id;
    return optionText;
  }) || [];

  
  const handleServiceSelect = (value) => {
    setSelectedServiceId(servicesMap[value]);
  };

  const { state } = useLocation(); 
  const { control, register, getValues } = useForm();

  const [selectedRadio, setSelectedRadio] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!state) {
    navigate(-1);
    return null;
  }

  console.log(state)
  const visitTypeOptions2 = ["prywatna", "NFZ"];

  const validateForm = () => {
    const service = getValues("service");
    const type = getValues("type");
    const newErrors = {};

    if (!service) {
      newErrors.service = "Wybierz serwis";
    }
    if (!type) {
      newErrors.type = "Wybierz typ wizyty";
    }
    if (!selectedRadio) {
      newErrors.radio = "Wybierz odpowiedź";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
  };

  
  const handleLinkClick = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }

   
    const currentService = getValues("service");
    const currentType = getValues("type");

    
    if (!currentService || !currentType || !selectedServiceId) {
      e.preventDefault();
      setErrors({
        ...errors,
        form: "Please fill in all required fields"
      });
      return;
    }

    
    const visitDetails = {
      service: currentService,
      serviceId: selectedServiceId,
      type: currentType,
      isFirstVisit: selectedRadio === "Tak"
    };

    
    e.currentTarget.state = {
      ...state,
      visitDetails
    };
  };

  return (
    <div className={styles.clinicZapisPage}>
      <div className={styles.leftBlock}>
        <AppointmentCard state={state} />
      </div>
      <div className={styles.zapisPageRight}>
        <h1>Wybierz opcje wizyty</h1>
        <div className={styles.zapisPagePriceBlock}>
          <p>Typ wizyty</p>
          <div className={styles.dropdownContainer}>
            <DropdownStas
              control={control}
              placeholder={"Serwis"}
              options={visitTypeOptions}
              {...register("service", {
                required: true,
                message: "Pole jest wymagane",
                onChange: (e) => handleServiceSelect(e.target.value)
              })}
            />
            {errors.service && <span className={styles.error}>{errors.service}</span>}
          </div>
        </div>
        <div className={styles.zapisPagePriceBlock}>
          <p>Rodzaj wizyty</p>
          <div className={styles.dropdownContainer}>
            <DropdownStas
              control={control}
              placeholder={"Typ wizyty"}
              options={visitTypeOptions2}
              {...register("type", {
                required: true,
                message: "Pole jest wymagane",
              })}
            />
            {errors.type && <span className={styles.error}>{errors.type}</span>}
          </div>
        </div>
        <div className={styles.choiceBlock}>
          <p>Czy to Twoja pierwsza wizyta u tego specjalisty?</p>
          <div>
            <label>
              <input
                type="radio"
                checked={selectedRadio === "Tak"}
                onChange={() => setSelectedRadio("Tak")}
              />
              Tak
            </label>
            <label>
              <input
                type="radio"
                name="choice"
                checked={selectedRadio === "Nie"}
                onChange={() => setSelectedRadio("Nie")}
              />
              Nie
            </label>
          </div>
          {errors.radio && <span className={styles.error}>{errors.radio}</span>}
        </div>
        <div className={styles.btnBlock}>
          <button
            type="button"
            className={styles.btnBlockBack}
            onClick={handleGoBack}
          >
            Anuluj
          </button>
          <Link
            to={pageConfig.patient.ZapisFormPage}
            state={{
              ...state,
              visitDetails: {
                service: getValues("service"),
                serviceId: selectedServiceId,
                type: getValues("type"),
                isFirstVisit: selectedRadio === "Tak",
              },
            }}
            onClick={handleLinkClick}
            className={styles.btnBlockContinue}
          >
            Kontynuj
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ClinicZapisPage;
