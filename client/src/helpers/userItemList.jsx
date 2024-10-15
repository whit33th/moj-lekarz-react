import userAvatar from "../assets/img/profil.webp";

const userItems = [
  {
    img: userAvatar,
    name: "Victor Laplas",
    surname: "Laplas",
    birthDate: "28.11.2002",
    postcode: "61-000",
    houseNumber: "10",
    flatNumber: "5",
    address: "Ul. Przykładowa 10/5",
    height: "180 cm",
    weight: "75 kg",
    phone: "+48 123 456 789",
    comments: [
      { name: "Doctor", type: "Follow-up required" },
      { name: "Nurse", type: "Check medication" }
    ],
    history: [
      { doctor: "Dr. Smith", name: "Visit for check-up", date: "2024-01-15" },
      { doctor: "Dr. Jones", name: "Annual physical exam", date: "2023-11-12" }
    ],
    id: 890127650,
    gender: "W",
    lastMessage: "Lol",
    status: "Inactive",
    passport: "FG332254",
    firmName: "PharmaCorp",
    reports: 'Aktywność użytkowników'
  },
  {
    img: userAvatar,
    name: "Anna Johnson",
    surname: "Johnson",
    date: "2024.01.15",
    time: "10:30",
    id: 645323456,
    gender: "W",
    lastMessage: "ahh",
    status: "Active",
    firmName: "MediHealth",
    reports: 'Aktywność użytkowników',
    comments: [
      { name: "Dr. Smith", type: "Initial Consultation" },
    ],
    history: [
      { doctor: "Dr. Brown", name: "Checkup", date: "2024-02-20" },
    ],
    pesel: "12345678902",
    birthDate: "1985-02-02",
    postcode: "60-002",
    houseNumber: "3",
    flatNumber: "4",
    address: "Another Address, City",
    height: "165 cm",
    weight: "60 kg",
    phone: "+48123456780"
  },
  {
    img: userAvatar,
    name: "Michael Smith",
    date: "2024.02.20",
    time: "11:45",
    id: 112223456,
    gender: "M",
    lastMessage: "Bye",
    status: "Active",
    firmName: "WellnessPharma" // Название фармацевтической компании
  },
  {
    img: userAvatar,
    name: "Emily Davis",
    date: "2024.03.05",
    time: "14:00",
    id: 877773456,
    gender: "W",
    lastMessage: "52",
    info: "bla-bla-blaa..",
    firmName: "CureAll" // Название фармацевтической компании
  },
  {
    img: userAvatar,
    name: "James Brown",
    date: "2024.04.10",
    time: "16:30",
    id: 543765456,
    gender: "M",
    lastMessage: "Can u pls...",
    firmName: "HealthFirst" // Название фармацевтической компании
  },
  {
    img: userAvatar,
    name: "Sophia Wilson",
    date: "2024.05.25",
    time: "08:15",
    id: 660123446,
    gender: "W",
    lastMessage: "",
    info: "Lorem ipsum dolor sit amet, consectetur...",
    firmName: "BioPharma" // Название фармацевтической компании
  },
];

const myData = {
  name: "Satoru",
  surname: "Gojo",
  age: 18,
  country: "Ukraine",
  clinic: "Przychodnia 36",
  city: "Poznan",
  street: "Ul. Szylinga 13",
};

export { userItems, myData };
