// src/redux/someSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './axios'; // Исправлено импорт

// Определение начального состояния
const initialState = {
  profileState: {
    id: 0,
    userImg: '',
    userName: 'Tomasz',
    userSurname: 'Jankowski',
    gender: 'M',
    phone: '',
    email: '',
    pesel: '',
    address: {
      city: '',
      cityCode: '',
      street: '',
      numberHouse: '',
    },
  },
  visitsState: {
    plannedVisits: [
      {
        id: 0,
        date: '19.07.2023',
        time: '19:00 - 19:15',
        doctorName: 'Ania Kaczmarska',
        doctorType: 'Ortoped',
        clinicalName: 'NZOZ Poznańskie Centrum Zdrowia',
        clinicalAddress: 'Osiedle Zwycięstwa 108',
        phone: '234 000 211',
        serviceName: 'Konsultacja ginekologiczna',
        servicePrice: '290,00 zł'

      },
      {
        id: 1,
        date: '19.07.2023',
        time: '19:00 - 19:15',
        doctorName: 'Ania Kaczmarska',
        doctorType: 'Ortoped',
        clinicalName: 'NZOZ Poznańskie Centrum Zdrowia',
        clinicalAddress: 'Osiedle Zwycięstwa 108',
        phone: '234 000 211',
        serviceName: 'Konsultacja ginekologiczna',
        servicePrice: '290,00 zł'

      },
    ],
    completedVisits: [
      {
        id: 0,
        date: '19.07.2023',
        time: '19:00 - 19:15',
        doctorName: 'Ania Kaczmarska',
        doctorType: 'Ortoped',
        clinicalName: 'NZOZ Poznańskie Centrum Zdrowia',
        clinicalAddress: 'Osiedle Zwycięstwa 108',
        phone: '234 000 211',
        serviceName: 'Konsultacja ginekologiczna',
        servicePrice: '290,00 zł'

      },
      {
        id: 1,
        date: '19.07.2023',
        time: '19:00 - 19:15',
        doctorName: 'Ania Kaczmarska',
        doctorType: 'Ortoped',
        clinicalName: 'NZOZ Poznańskie Centrum Zdrowia',
        clinicalAddress: 'Osiedle Zwycięstwa 108',
        phone: '234 000 211',
        serviceName: 'Konsultacja ginekologiczna',
        servicePrice: '290,00 zł'

      },
    ],
  },
  stateResaerchResult: {
    researchResults: [
      {
        id: 0,
        name: 'Morfologia  krwi ',
        date: '12.12.2023',
        fileUrl: './assets/imageblog.webp'
      },
    ],
    otherDocs: [
      {
        id: 0,
        name: 'Morfologia  krwi ',
        date: '12.12.2023',
        fileUrl: './assets/imageblog.webp'
      },
      {
        id: 0,
        name: 'Morfologia  kssrwi ',
        date: '12.12.2023',
        fileUrl: './assets/imageblog.webp'
      },
      {
        id: 0,
        name: 'Morfologia  krwi ',
        date: '12.12.2023',
        fileUrl: './assets/imageblog.webp'
      },
      {
        id: 0,
        name: 'Morfologia  krwi ',
        date: '12.12.2023',
        fileUrl: './assets/imageblog.webp'
      }
    ],
  },
  stateRecipes: {
    active: [
      {
        id: 8488,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      },
      {
        id: 8788,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      }
    ],
    disactive: [
      {
        id: 8488,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      },
      {
        id: 8738,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      },
      {
        id: 8878,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      },
      {
        id: 8,
        userName: 'Daniel Novikov',
        date: '12.12.2023 - 12.02.2023',
        description: 'lorem lorem lorem Moscow'

      }
    ],
  },
  questionsData: [
    {
      question: "Badanssia wymagające szczególnego przygotowania - test obciążenia glukozą (OGTT) i test obciążenia insuliną?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio enim consectetur delectus labore doloremque, ex sed dolorem porro esse eius corrupti iste nostrum? Explicabo reprehenderit ex perspiciatis pariatur illum!"
    },
    {
      question: "Badania wymagające pobrania krwi żylnej",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio enim consectetur delectus labore doloremque, ex sed dolorem porro esse eius corrupti iste nostrum? Explicabo reprehenderit ex perspiciatis pariatur illum!"
    },
    {
      question: "Badania moczu",
      answer: "Zaleca się pobranie porannej porcji moczu, ze środkowego strumienia po uprzednim podmyciu się (pierwszą porcję oddaje się do ubikacji, drugą do pojemnika); pojemnik nie musi być jałowy, ważne by był zakupiony w aptece. Objętość ok. 10-20 ml (1/3 pojemnika wystarczy)."
    },
    {
      question: "Badania kału",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio enim consectetur delectus labore doloremque, ex sed dolorem porro esse eius corrupti iste nostrum? Explicabo reprehenderit ex perspiciatis pariatur illum!"
    },
    {
      question: "Wymazy z gardła, nosa",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio enim consectetur delectus labore doloremque, ex sed dolorem porro esse eius corrupti iste nostrum? Explicabo reprehenderit ex perspiciatis pariatur illum!"
    },
    {
      question: "Badania wymagające szczególnego przygotowania - test obciążenia glukozą (OGTT)",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio enim consectetur delectus labore doloremque, ex sed dolorem porro esse eius corrupti iste nostrum? Explicabo reprehenderit ex perspiciatis pariatur illum!"
    },
  ],
  blogs: [
    {
      id: 0,
      categoryName: "Lorem ipsum tea",
      data: [
        { id: 0, img: '/assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined", text: "Vestibulum non lectus eu massa tristique vehicula eu vel massa. Nullam euismod facilisis nisi ac fermentum. Donec non dolor sed odio hendrerit porttitor sit amet vel elit. Sed aliquet eleifend quam, vel cursus elit egestas quis. Donec quam est, dictum nec malesuada id, accumsan ut magna. Nunc ullamcorper eu velit non tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin semper quam vitae nunc ornare, ut suscipit quam molestie." },
        { id: 1, img: '/assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined", text: "lorooorem" },
        { id: 2, img: '/assets/imageblog.webp', name: "tttt.", link: "undefined" },
        { id: 3, img: '/assets/imageblog.webp', name: "www.", link: "undefined" },
        { id: 4, img: '/assets/imageblog.webp', name: ".Lorem ipsum dolor sit amet, consectetur adipiscing elit", link: "undefined" },
        { id: 5, img: '/assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined", text: "lorooorem" },
      ]
    },
    {
      id: 1,
      categoryName: "Lorem ipsum coffee",
      data: [
        { id: 0, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined" },
        { id: 1, img: 'assets/imageblog.webp', name: "1999 году умер ", link: "undefined" },
        { id: 2, img: 'assets/imageblog.webp', name: "txit", link: "undefined" },
        { id: 3, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined" },
        { id: 4, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing элит.", link: "undefined" },
      ]
    },
    {
      id: 2,
      categoryName: "Lorem ipsum coca-cola",
      data: [
        { id: 0, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", link: "undefined" },
        { id: 1, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing элит.", link: "undefined" },
        { id: 2, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing элит.", link: "undefined" },
        { id: 3, img: 'assets/imageblog.webp', name: "Lorem ipsum dolor sit amet, consectetur adipiscing элит.", link: "undefined" },
      ]
    },
  ],
  doctorCard: [
    { id: 0, name: 'Ania Kaczmarska', type: "ortoped", imglink: '/assets/doctor.jpg', rating: 5, address: { street: "'Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211" }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 1, name: 'Ania Kaczmarska', type: "logoped", imglink: '/assets/doctor.jpg', rating: 5, address: { street: "'Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211" }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 2, name: 'Ania Kaczmarska', type: "ortoped", imglink: '/assets/imageblog.webp', rating: 5, address: { street: "'Ul. Kutrzeby 10, 61-714 ", city: 'NYC' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211" }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 3, name: 'Anna Kacszmarska', type: "surgeon", imglink: '/assets/imageblog.webp', rating: 5, address: { street: "'Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.08.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '15.08.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211" }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' }

  ],
  clinicCard: [
    { id: 0, name: 'Centrum Medyczne POLMED', uslugiAndPrice: [{ name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }, { name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }], types: ["Chirurg", "Endokrynolog", "Ginekolog", "Kardiolog"], imglink: './assets/imageblog.webp', rating: 5, address: { street: "Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211", nip: '2734168924', email: 'firma@gmail.com' }, graphics: { "Pn": '07:00-21:00', "Wt": '07:00-21:00', "Śr": '07:00-21:00', "Cz": '07:00-21:00', "Pi": '07:00-21:00', 'So': '07:00-17:00', 'Ni': 'Zamknięte' }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 1, name: 'Centrum Medyczne POLMED', uslugiAndPrice: [{ name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }, { name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }], types: ["Chirurg", "Endokrynolog", "Ginekolog", "Kardiolog"], imglink: './assets/imageblog.webp', rating: 5, address: { street: "Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211", nip: '2734168924', email: 'firma@gmail.com' }, graphics: { "Pn": '07:00-21:00', "Wt": '07:00-21:00', "Śr": '07:00-21:00', "Cz": '07:00-21:00', "Pi": '07:00-21:00', 'So': '07:00-17:00', 'Ni': 'Zamknięte' }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 2, name: 'Centrum Medyczne POLMED', uslugiAndPrice: [{ name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }, { name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }], types: ["Chirurg", "Endokrynolog", "Kardiolog"], imglink: './assets/imageblog.webp', rating: 5, address: { street: "Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211", nip: '2734168924', email: 'firma@gmail.com' }, graphics: { "Pn": '07:00-21:00', "Wt": '07:00-21:00', "Śr": '07:00-21:00', "Cz": '07:00-21:00', "Pi": '07:00-21:00', 'So': '07:00-17:00', 'Ni': 'Zamknięte' }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 3, name: 'Centrum Medyczne POLMED', uslugiAndPrice: [{ name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }, { name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }], types: ["Chirurg", "Endokrynolog", "Ginekolog"], imglink: './assets/imageblog.webp', rating: 5, address: { street: "Ul. Kutrzeby 10, 61-714 ", city: 'Tokyo' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211", nip: '2734168924', email: 'firma@gmail.com' }, graphics: { "Pn": '07:00-21:00', "Wt": '07:00-21:00', "Śr": '07:00-21:00', "Cz": '07:00-21:00', "Pi": '07:00-21:00', 'So': '07:00-17:00', 'Ni': 'Zamknięte' }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },
    { id: 4, name: 'Centrum Medyczne POLMED', uslugiAndPrice: [{ name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }, { name: 'Ortopeda ', list: [{ name: 'Konsultacja ortopedyczna', link: 'vk.com', price: '250' }, { name: 'Kwalifikacja do operacji', link: 'vk.com', price: '150' }] }], types: ["Chirurg", "Endokrynolog", "Ginekolog", "logoped"], imglink: './assets/imageblog.webp', rating: 5, address: { street: "Ul. Kutrzeby 10, 61-714 ", city: 'Poznań' }, price: '190', dates: [{ date: '18.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }, { date: '22.05.2024', hours: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00',] }], profileLink: 'vk.com', medCenterInfo: { name: 'NZOZ Poznańskie Centrum Zdrowia', address: 'Osiedle Zwycięstwa 108', phone: "234 000 211", nip: '2734168924', email: 'firma@gmail.com' }, graphics: { "Pn": '07:00-21:00', "Wt": '07:00-21:00', "Śr": '07:00-21:00', "Cz": '07:00-21:00', "Pi": '07:00-21:00', 'So': '07:00-17:00', 'Ni': 'Zamknięte' }, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. Aliquam erat volutpat. Morbi sit amet turpis euismod, tincidunt libero ac, ultrices elit. Vestibulum non lectus eu massa tristique vehicula eu vel massa.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue viverra felis, vel condimentum diam porttitor vel. ' },

  ],
  status: 'idle',
  error: null,
};

// Создание асинхронного действия для загрузки данных блогов
export const fetchBlogs = createAsyncThunk('some/fetchBlogs', async () => {
  const response = await axios.get('/blogs');
  return response.data;
});

const someSlice = createSlice({
  name: 'some',
  initialState,
  reducers: {
    setQuestionsData: (state, action) => {
      state.questionsData = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    deleteVisitById: (state, action) => {
      const idToDelete = action.payload;
      state.visitsState.plannedVisits = state.visitsState.plannedVisits.filter(visit => visit.id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Экспорт действия deleteVisitById
export const { setQuestionsData, setBlogs, deleteVisitById } = someSlice.actions;
export default someSlice.reducer;