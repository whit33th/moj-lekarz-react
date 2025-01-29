import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useResetPassword from "../../api/hooks/AuthHooks/useResetPassword";
import { useForm } from "react-hook-form";
import InputError from "../../components/UI/InputError/InputError";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const { mutate } = useResetPassword();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired link.");
    }
  }, [token]);

  function onSubmit(data) {
    const formData = {
      newPassword: data.newPassword,
      token: token,
    }
    mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset Password</h2>
      {token && (
        <div>
          <input
            type="password"
            placeholder="Nowe haslo"
            {...register("newPassword", {
              required: "Hasło jest wymagane",
              minLength: {
                value: 8,
                message: "Minimalna długość to 8 znaków ",
              },
            })}
          />
          <InputError errorField={"newPassword"} formState={formState} />
          <button>Reset Password</button>
        </div>
      )}
    </form>
  );
}
