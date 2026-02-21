import "./Loginpage.css";
import { useNavigate } from "react-router-dom";


function Loginpage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Navigate to dashboard
    navigate("/dashboard");
  };


  return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      {/* Background icons */}
    <div className="login-bg" />

   <div className="relative w-full max-w-3xl bg-white rounded-[50px] shadow-[10px_20px_50px_20px_rgba(0,0,0,0.15)] overflow-hidden p-10 lg:p-20"> 
  {/* Blurred left panel */}
  <div className="absolute top-0 left-0 h-full w-1/3 backdrop-blur-2xl z-0" />

  {/* Main content */}
  <div className="relative z-10 flex flex-col items-center text-center">
    {/* Title */}
<h2 className="text-3xl font-bold text-green-500 font-poppins mb-6">Admin Login</h2> 
   <p className="text-xl font-semibold text-black font-poppins max-w-md mb-16"> 
  Access the campus transport control panel
</p>

    {/* Inputs */}
   {/* Inputs */}
<div className="w-full max-w-lg space-y-6 mb-10">
  <input
    type="text"
    placeholder="Admin ID"
    className="w-full bg-blue-50 rounded-[10px] px-5 py-4 text-base text-zinc-600 font-medium font-poppins focus:outline-none focus:ring-2 focus:ring-green-500"
  />
  <input
    type="password"
    placeholder="Password"
    className="w-full bg-blue-50 rounded-[10px] px-5 py-4 text-base text-zinc-600 font-medium font-poppins focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>


    {/* Forgot password + button */}
    <div className="w-full max-w-lg flex flex-col gap-5 mb-16"> 
      <div className="text-right text-green-500 text-sm font-semibold font-poppins">
        Forgot your password?
      </div>
      <button onClick={handleSignIn} className="w-full px-5 py-3.5 bg-green-500 rounded-[10px] shadow-[0px_10px_20px_rgba(203,214,255,1)] text-white text-xl font-semibold font-poppins">
        Sign in
      </button>
    </div>

    {/* Footer */}
    <div className="text-center mt-auto">
      <div className="text-green-500 text-sm font-semibold font-poppins mb-2">Secured & powered by</div>
      <div className="flex justify-center items-center gap-1 text-green-500 text-2xl font-bold font-poppins leading-tight tracking-tight">
        <span>BusBro</span>
        <span className="text-green-400">.</span>
      </div>
    </div>
  </div>
</div>

    </div>

  );
}

export default Loginpage;