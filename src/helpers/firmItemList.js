// mockFirmData.js
const mockFirmData = {
  id: '890127650',
  name: 'PharmaCorp',
  specialization: 'Ortopedia',
  address: 'Ul. Kutrzeby 10', // Обновлен адрес
  contactPerson: {
    name: 'Tomasz',
    surname: 'Jankowski',
  },
  city: 'Warszawa',
  postalCode: '00-001',
  phone: '+48 322 000 111', // Обновлен номер телефона
  email: 'firma@gmail.com', // Обновлен email
  hiredDate: '01.06.2024', // Обновлена дата регистрации
  vacationDays: 27,
  workingHours: {
    Pn: '07:00 - 21:00',
    Wt: '07:00 - 21:00',
    Śр: '07:00 - 21:00',
    Cz: '07:00 - 21:00',
    Pi: '07:00 - 21:00',
    So: '07:00 - 17:00',
    Ni: 'Zamknięte',
  },
  nipNumber: '2734168924', // Номер NIP
  numberOfDoctors: 122, // Количество врачей
  idNumber: '472-123-456' // Номер ID
};

export default mockFirmData;
