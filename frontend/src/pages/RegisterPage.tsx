import {
  useForm,
} from "react-hook-form";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Mail,
  Lock,
  User,
} from "lucide-react";

import api from "../services/api";

interface RegisterFormData {
  name: string;

  email: string;

  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await api.post(
        "/auth/register",
        {
          ...data,
          role: "admin",
        }
      );

      toast.success(
        "Registration successful"
      );

      navigate("/");
    } catch {
      toast.error(
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join GigFlow
          </p>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full pl-12 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full pl-12 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              {...register(
                "password"
              )}
              className="w-full pl-12 p-3 rounded-xl bg-white/10 text-white border border-white/20 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition"
        >
          Register
        </button>

        <p className="text-center text-gray-300 mt-6">
          Already have account?{" "}

          <Link
            to="/"
            className="text-white font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;