import Cookies from "js-cookie";
import { create } from "zustand";

const useStore = create((set) => ({
  //role state
  role: Cookies.get("role") === undefined ? "patient" : Cookies.get("role"),
  setRole: (role) => set({ role: role }),

  //userId state
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
  todayDate: new Date().toISOString().split("T")[0],
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

  setQuestionsData: (questionsData) => set({ questionsData }),
  setBlogs: (blogs) => set({ blogs }),
}));

export default useStore;
