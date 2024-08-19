import { create } from 'zustand'


const useStore = create((set) => ({
	isModalActive: false,
	setModalActive: (status) => set(() => ({isModalActive: status})),
	modalContent: null,
	setModalContent: (content) => set(() => ({modalContent: content}))
}))

export default useStore