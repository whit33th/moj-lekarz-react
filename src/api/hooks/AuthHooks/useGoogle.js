// import { useEffect } from "react";
// import useStore from "@data/store";
// import { useQuery } from "@tanstack/react-query";
// import { authService } from "@services/authServices";
// import axios from "axios";
// import clearAllCookies from "../../../utils/deleteAllCookies";

// export default function useGoogle() {
//   const { setIsAuth } = useStore();
//   axios.defaults.withCredentials = true;

//   const { data, isSuccess, isError, refetch } = useQuery({
//     queryKey: ["checkIsAuth"],
//     queryFn: () => authService.google(),
//     retry: false,
//   });

//   useEffect(() => {
//     // Проверяем, являемся ли мы на странице колбэка
//     if (window.location.pathname === '/auth/google/callback') {
//       // Запускаем проверку авторизации
//       refetch();
//     }
//   }, []);

// //   const handleGoogleLogin = async () => {
// //     try {
// //       // Добавляем обработку ошибок
// //       const currentUrl = window.location.href;
// //       if (currentUrl.includes('error=')) {
// //         console.error('Google authentication error');
// //         return;
// //       }
// //       await authService.google();
// //     } catch (error) {
// //       console.error("Google login error:", error);
// //     }
// //   };

//   useEffect(() => {
//     if (isSuccess) {
//       setIsAuth(true);
//       console.log("zxc");
//     }
//   }, [isSuccess, setIsAuth, data]);

//   useEffect(() => {
//     if (isError || !isSuccess) {
//       // clearAllCookies()
//       setIsAuth(false);
//     }
//   }, [isError, setIsAuth, isSuccess, data]);

//   return { data, isSuccess, isError, checkIsAuth: refetch, handleGoogleLogin };
// }
