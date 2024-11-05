export const sendFormData = async (formData) => {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export const sendAuthData = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('HTTP статус ответа:', response.status);

    if (response.status === 200) {
      const data = await response.json();
      console.log('Успешный ответ:', data);
      return data;
    } else {
      console.warn('Неуспешный ответ:', response.statusText);
      const errorData = await response.json();
      console.warn('Сообщение об ошибке:', errorData.message);
      return null; // Возвращаем null или другое значение, чтобы указать, что запрос не был успешным
    }
  } catch (error) {
    console.error('Произошла ошибка при выполнении запроса:', error);
    throw error;
  }
};

export const sendNewOrder = async (formData) => {
  try {
      const response = await fetch('http://localhost:5000/api/newOrder', {
          method: 'POST',
          body: formData, // Отправляем FormData напрямую
      });

      console.log('HTTP статус ответа:', response.status);

      if (response.status === 200) {
          const data = await response.json();
          console.log('Успешный ответ:', data);
          return data;
      } else {
          console.warn('Неуспешный ответ:', response.statusText);
          const errorData = await response.json();
          console.warn('Сообщение об ошибке:', errorData.message);
          return null;
      }
  } catch (error) {
      console.error('Произошла ошибка при выполнении запроса:', error);
      throw error;
  }
};