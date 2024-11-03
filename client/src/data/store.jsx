import { create } from 'zustand'


const useStore = create((set) => ({
  isModalActive: false,
  setModalActive: (status) => set(() => ({ isModalActive: status })),
  modalContent: null,
  setModalContent: (content) => set(() => ({ modalContent: content })),
  clearModalContent: () => set({ modalContent: null }), //clear cached contet

  activeMoreInfoButtId: null,
  setActiveMoreInfoButtId: (id) => set({ activeMoreInfoButtId: id }),
  resetActiveMoreInfoButtId: () => set({ activeMoreInfoButtId: null }),

  activeDropdownId: null,
  setActiveDropdownId: (id) => set({ activeDropdownId: id }),
}));

export default useStore