import {
  useForm,
} from "react-hook-form";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import { useAuthStore } from "../store/authStore";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const { setAuth } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response =
        await api.post(
          "/auth/login",
          data
        );

      setAuth(
        response.data.token,
        response.data.user
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          GigFlow Login
        </h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required:
                "Email is required",
            })}
            className="w-full p-3 border rounded-lg"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.email
                  .message
              }
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register(
              "password",
              {
                required:
                  "Password is required",
              }
            )}
            className="w-full p-3 border rounded-lg"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;