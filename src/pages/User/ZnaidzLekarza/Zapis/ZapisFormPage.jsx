import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./ZapisFormPage.module.css";
import imgName from "@assets/img/simple-line-i.svg";
import imgType from "@assets/img/Vector14.svg";
import phoneImg from "@assets/img/ph_phone-light.svg";
import visitorImg from "@assets/img/Vector15.svg";
import { pageConfig } from "../../../../config/config";
import { useForm } from "react-hook-form";
import usePostAppointment from "../../../../api/hooks/PatientHooks/usePostAppointment";
import useGetUserInfo from "@api/hooks/UserHooks/useGetUserInfo";
import InputError from "../../../../components/UI/InputError/InputError";

function ZapisFormPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data: user } = useGetUserInfo();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      pesel: "",
      comment: "",
      acceptTerms: false,
    },
  });

  const { mutate, isPending } = usePostAppointment();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        pesel: user.pesel,
        comment: "",
        acceptTerms: false,
      });
    }
  }, [user, reset]);

  if (!state) {
    console.log("No state available");
    navigate("/");
    return null;
  }

  const { doctor, clinic, appointment, visitDetails } = state;

  if ((!doctor || !clinic || !appointment, !visitDetails)) {
    console.log("Missing required data");
    navigate("/");
    return null;
  }
  console.log(visitDetails.type);

  const onSubmit = () => {
    const appointmentData = {
      doctorId: doctor.id,
      serviceId: visitDetails.serviceId,
      clinicId: clinic.id,
      date: appointment.date,
      timeSlot: appointment.startTime,
      firstVisit: visitDetails.isFirstVisit,
      visitType: visitDetails.type,
      description: getValues("comment"),
    };

    mutate(appointmentData, {
      onSuccess: () => {
        navigate(pageConfig.patient.zapisDone, {
          state: {
            formDataObj: {
              comment: getValues("comment"),
              file: null,
            },
            doctor: {
              name: doctor.name,
              specialty: doctor.specialty,
              phone: doctor.phone,
            },
            clinic: {
              name: clinic.name,
              address: clinic.address,
            },
            visitDetails: {
              type: visitDetails.type,
              service: visitDetails.service,
            },
            date: appointment.date,
            time: appointment.startTime,
            endTime: appointment.endTime,
          },
        });
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
              <p>{visitDetails.service}</p>
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
                      
                      {...register("firstName", {
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/,
                          message: "Nieprawidłowy format imienia",
                        },
                      })}
                      placeholder="Podaj swoje imię"
                    />
                    <InputError errorField="firstName" formState={formState} />
                  </div>
                  <div>
                    <p>Nazwisko</p>
                    <input
                      
                      {...register("lastName", {
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/,
                          message: "Nieprawidłowy format nazwiska",
                        },
                      })}
                      placeholder="Podaj swoje nazwisko"
                    />
                    <InputError errorField="lastName" formState={formState} />
                  </div>
                  <div>
                    <p>Telefon</p>
                    <input
                      {...register("phone", {
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^\+?[0-9]{9,12}$/,
                          message: "Nieprawidłowy format numeru telefonu",
                        },
                      })}
                      placeholder="Podaj numer telefonu"
                    />
                    <InputError errorField="phone" formState={formState} />
                  </div>
                  <div>
                    <p>Pesel</p>
                    <input
                      
                      {...register("pesel", {
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Nieprawidłowy format PESEL",
                        },
                      })}
                      placeholder="Podaj numer pesel"
                    />
                    <InputError errorField="pesel" formState={formState} />
                  </div>
                </div>

                <div className={styles.textareaBlock}>
                  <p>Komentarz</p>
                  <textarea
                    {...register("comment", {
                      maxLength: {
                        value: 500,
                        message:
                          "Komentarz nie może być dłuższy niż 500 znaków",
                      },
                    })}
                    placeholder="Wpisz komentarz"
                  />
                </div>
              </div>
            </div>

            <div className={styles.checkboxBlock}>
              <label
                className={`${styles.checkboxContainer} ${
                  formState.acceptTerms ? styles.error : ""
                }`}
              >
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    required: true,
                  })}
                />
                <span className={styles.checkmark}></span>
                <p className={formState.errors.acceptTerms ? styles.errorText : ""}>
                  <span>*</span> Zgadzam się, żeby MyLekarz przetwarzał moje
                  dane medyczne w celu korzystania z usług.
                </p>
                <Link
                  to={pageConfig.patient.policy.personalData}
                  state={{ page: "2" }}
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
