import { create } from "zustand";
import imageblog from "@assets/img/imageblog.webp";
import doctor from "@assets/img/doctor.jpg";
import Cookies from "js-cookie";
const useStore = create((set) => ({
  todayDate: new Date().toISOString().split("T")[0],
  //role
  role: Cookies.get("role") === undefined ? "patient" : Cookies.get("role"),
  setRole: (role) => set({ role: role }),

  //userId
  userId: Cookies.get("id") === undefined ? 0 : Cookies.get("id"),
  setUserId: (userId) => set({ userId: userId }),

  // Auth state
  isAuth: Cookies.get("isAuth") === undefined ? false : Cookies.get("isAuth"),
  setIsAuth: (isAuth) => set({ isAuth: isAuth }),

  // Modal state
  isModalActive: false,
  setModalActive: (status) => set({ isModalActive: status }),
  modalContent: null,
  setModalContent: (content) => set({ modalContent: content }),
  clearModalContent: () => set({ modalContent: null }),

  // Active button states
  activeMoreInfoButtId: null,
  setActiveMoreInfoButtId: (id) => set({ activeMoreInfoButtId: id }),
  resetActiveMoreInfoButtId: () => set({ activeMoreInfoButtId: null }),

  activeDropdownId: null,
  setActiveDropdownId: (id) => set({ activeDropdownId: id }),
  // Chosen date by user. ex: in calendar
  selectedDate: new Date().toISOString().slice(0, 10),
  selectedDateInWords: new Date().toLocaleString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  setSelectedDate: (date) =>
    set({
      selectedDate: date,
      selectedDateInWords: new Date(date).toLocaleString("pl-PL", {
        // weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }),

  visitCountForMonth: 0,
  setVisitCountForMonth: (visitCount) =>
    set({ visitCountForMonth: visitCount }),

  searchActive: false,
  setSearchActive: (status) => set({ searchActive: status }),
  // Profile state
  profileState: {
    id: 0,
    userImg: "",
    userName: "Tomasz",
    userSurname: "Jankowski",
    gender: "M",
    phone: "",
    email: "",
    pesel: "",
    address: {
      city: "",
      cityCode: "",
      street: "",
      numberHouse: "",
    },
  },

  // Visits state
  visitsState: {
    plannedVisits: [
      {
        id: 0,
        date: "19.07.2023",
        time: "19:00 - 19:15",
        doctorName: "Ania Kaczmarska",
        doctorType: "Ortoped",
        clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
        clinicalAddress: "Osiedle Zwycięstwa 108",
        phone: "234 000 211",
        serviceName: "Konsultacja ginekologiczna",
        servicePrice: "290,00 zł",
      },
      {
        id: 1,
        date: "19.07.2023",
        time: "19:00 - 19:15",
        doctorName: "Ania Kaczmarska",
        doctorType: "Ortoped",
        clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
        clinicalAddress: "Osiedle Zwycięstwa 108",
        phone: "234 000 211",
        serviceName: "Konsultacja ginekologiczna",
        servicePrice: "290,00 zł",
      },
    ],
    completedVisits: [
      {
        id: 0,
        date: "19.07.2023",
        time: "19:00 - 19:15",
        doctorName: "Ania Kaczmarska",
        doctorType: "Ortoped",
        clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
        clinicalAddress: "Osiedle Zwycięstwa 108",
        phone: "234 000 211",
        serviceName: "Konsultacja ginekologiczna",
        servicePrice: "290,00 zł",
      },
      {
        id: 1,
        date: "19.07.2023",
        time: "19:00 - 19:15",
        doctorName: "Ania Kaczmarska",
        doctorType: "Ortoped",
        clinicalName: "NZOZ Poznańskie Centrum Zdrowia",
        clinicalAddress: "Osiedle Zwycięstwa 108",
        phone: "234 000 211",
        serviceName: "Konsultacja ginekologiczna",
        servicePrice: "290,00 zł",
      },
    ],
  },

  // Research results state
  stateResearchResult: {
    researchResults: [
      {
        id: 0,
        name: "Morfologia krwi",
        date: "12.12.2023",
        fileUrl: imageblog,
      },
    ],
    otherDocs: [
      {
        id: 0,
        name: "Morfologia krwi",
        date: "12.12.2023",
        fileUrl: imageblog,
      },
      {
        id: 1,
        name: "Morfologia kssrwi",
        date: "12.12.2023",
        fileUrl: imageblog,
      },
      {
        id: 2,
        name: "Morfologia krwi",
        date: "12.12.2023",
        fileUrl: imageblog,
      },
      {
        id: 3,
        name: "Morfologia krwi",
        date: "12.12.2023",
        fileUrl: imageblog,
      },
    ],
  },

  // Recipes state
  stateRecipes: {
    active: [
      {
        id: 8488,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
      {
        id: 8788,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
    ],
    disactive: [
      {
        id: 8488,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
      {
        id: 8738,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
      {
        id: 8878,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
      {
        id: 8,
        userName: "Daniel Novikov",
        date: "12.12.2023 - 12.02.2023",
        description: "lorem lorem lorem Moscow",
      },
    ],
  },
  questionsData: [
    {
      question:
        "Badania wymagające szczególnego przygotowania - test obciążenia glukozą (OGTT) i test obciążenia insuliną",
      answer:
        "Pacjent powinien przyjść na badanie na czczo, co oznacza, że nie może jeść przez co najmniej 8-12 godzin przed pobraniem pierwszej próbki krwi. Ważne jest, aby dzień wcześniej unikać alkoholu, kawy oraz intensywnego wysiłku fizycznego, ponieważ mogą one wpłynąć na wyniki.",
    },
    {
      question: "Badania wymagające pobrania krwi żylnej",
      answer:
        "Badania wymagające pobrania krwi żylnej zazwyczaj również wykonywane są na czczo, dlatego pacjent nie powinien spożywać posiłków przez minimum 8 godzin przed badaniem. Warto jednak pić wodę, aby uniknąć odwodnienia, ale należy unikać napojów słodzonych i kawy. Dzień wcześniej dobrze jest ograniczyć intensywną aktywność fizyczną i stres. W przypadku osób przyjmujących leki wskazane jest skonsultowanie się z lekarzem, czy powinny one zostać zażyte przed badaniem.",
    },
    {
      question: "Badania moczu",
      answer:
        "Zaleca się pobranie porannej porcji moczu, ze środkowego strumienia po uprzednim podmyciu się (pierwszą porcję oddaje się do ubikacji, drugą do pojemnika); pojemnik nie musi być jałowy, ważne by był zakupiony w aptece. Objętość ok. 10-20 ml (1/3 pojemnika wystarczy).",
    },
    {
      question: "Badania kału",
      answer:
        "Badania kału wymagają pobrania próbki do sterylnego pojemnika dostępnego w aptece. Należy unikać stosowania środków przeczyszczających przed badaniem, ponieważ mogą one wpłynąć na wynik. Próbkę najlepiej dostarczyć do laboratorium jak najszybciej po pobraniu, najlepiej w ciągu kilku godzin, aby zachować jej właściwe właściwości diagnostyczne.",
    },
    {
      question: "Wymazy z gardła, nosa",
      answer:
        "Powinny być wykonywane rano, przed umyciem zębów i spożyciem posiłku. Nie należy stosować płukanek do jamy ustnej ani aerozoli do nosa. Jeśli pacjent ma infekcję, warto skonsultować się z lekarzem w sprawie odpowiedniego terminu wykonania badania, aby uzyskać jak najbardziej wiarygodne wyniki.",
    },
  ],

  setQuestionsData: (questionsData) => set({ questionsData }),
  setBlogs: (blogs) => set({ blogs }),
 
}));

export default useStore;
