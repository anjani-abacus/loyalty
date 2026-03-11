// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeClosed, Eye } from "lucide-react";
// import login_illustrations from "../../assets/images/login_illustrations.png";
// import logo from "../../../public/logo.png";
// import logoWhite from "../../../public/logo-White.png";
// import { toast } from "react-toastify";
// import { useLogin } from "./useData";


// export function Login({ className, ...props }) {
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const loginMutation = useLogin();


//   const isUserLoggedIn = localStorage.getItem("token");
//   useEffect(()=>{
//     if(isUserLoggedIn){
//       navigate('/dashboard')
//     }
//   }, [])


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     loginMutation.mutate(
//       { username, password },
//       {
//         onSuccess: (res) => {
//           toast.success("OTP Sent Successfully!")
//           navigate("/otpverification", {state:{contact:res?.conatct, masked_contact:res?.contact_01}});
//         },
//         onError: (err) => {
//           console.error("Login error:", err);
//           setErrorMessage("Invalid username or password. Please try again.");
//         },
//       }
//     );
//   };



//   return (
//     <div
//       className={cn(
//         "relative flex h-screen w-full items-center justify-center overflow-hidden ",
//         className
//       )}
//       {...props}
//     >
//       {(loginMutation.isPending ) && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md">
//           <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
//         </div>
//       )}

//       <div className="absolute inset-0 bg-gradient-theme w-full h-full">
//         <Card className="relative z-20 flex h-full w-full rounded-none p-10 bg-background-gradient">
//           {/* Left side illustration */}
//           <div className="hidden md:flex flex-col w-[60%] h-full items-center justify-center">
//             <img
//               src={login_illustrations}
//               alt="Login illustration"
//               className="max-w-[50%]"
//             />
//             <h2 className="text-2xl font-bold mt-6">
//               Custom Modules, Infinite Possibilities
//             </h2>
//             <p className="max-w-md text-center mt-4 md:mt-3 px-10 text-sm">
//               Our loyalty platform engages channel partners with QR-based apps,
//               customizable modules, flexible redemptions, real-time tracking,
//               and personalized rewards—easy to use, flexible, and designed to
//               keep partners motivated and performing.
//             </p>
//           </div>

//           {/* Right side form */}
//           <CardContent className="relative z-20 flex overflow-y-auto flex-1 h-full items-center justify-center bg-login-form backdrop-blur-lg border border-slate-200 text-foreground md:rounded-3xl shadow-2xl">
//             <form
//               onSubmit={isForgotPassword ? handleSendOtp : handleLogin}
//               className="w-full max-w-md space-y-18 px-8 md:px-4"
//             >
//               {/* Header */}
//               <div className="flex flex-col items-center text-center space-y-auto">
//                 <img src={logo} alt="Basiq360" className="w-28 h-auto mb-2" />

//                 <h1 className="text-3xl font-semibold tracking-tight text-foreground">

//                  {/*  text-slate-800 */}
//                   {isForgotPassword ? "Reset Password" : "Welcome Back"}
//                 </h1>
//                 <p className="text-muted-foreground text-sm">
//                   {isForgotPassword
//                     ? "Enter your email to receive an OTP for password reset"
//                     : "Login to your Stark Paints account"}
//                 </p>
//               </div>

//               {!isForgotPassword ? (
//                 <div className="space-y-6">
//                   <div className="grid gap-2">
//                     <Label htmlFor="username">Username</Label>
//                     <Input
//                       id="username"
//                       type="text"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter your username"
//                       required
//                     />
//                   </div>

//                   <div className="grid gap-2">
//                     <div className="flex items-center">
//                       <Label htmlFor="password">Password</Label>
//                       <button
//                         type="button"
//                         onClick={() => setIsForgotPassword(true)}
//                         className="ml-auto text-sm underline-offset-2 hover:underline"
//                       >
//                         Forgot your password?
//                       </button>
//                     </div>
//                     <div className="relative">
//                       <Input
//                         id="password"
//                         type={showPassword ? "text" : "password"}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         required
//                         className="pr-10"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-primary"
//                       >
//                         {showPassword ? (
//                           <Eye size={18} />
//                         ) : (
//                           <EyeClosed size={18} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   {errorMessage && (
//                     <p className="text-red-500 text-sm text-center">
//                       {errorMessage}
//                     </p>
//                   )}

//                   <Button
//                     type="submit"
//                     className="w-full bg-primary text-primary-foreground"
//                     disabled={loginMutation.isPending}
//                   >
//                     {loginMutation.isPending ? "Logging in..." : "Login"}
//                   </Button>

//                   <p className="text-center">
//                     Powered by{" "}
//                     <span className="underline text-blue cursor-pointer">
//                       AbacusDesk
//                     </span>
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="grid gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="m@example.com"
//                       required
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={sendOtpMutation.isPending}
//                   >
//                     {sendOtpMutation.isPending ? "Sending OTP..." : "Send OTP"}
//                   </Button>

//                   <button
//                     type="button"
//                     onClick={() => setIsForgotPassword(false)}
//                     className="text-sm underline-offset-2 hover:underline block mx-auto"
//                   >
//                     Back to Login
//                   </button>
//                 </div>
//               )}
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeClosed, Eye } from "lucide-react";
import login_illustrations from "../../assets/images/login_illustrations.png";
import logo from "../../../public/logo.png";
import logoWhite from "../../../public/logo-White.png";
import { toast } from "react-toastify";
import { useLogin } from "./useData";
import GradientText from '../../components/GradientText';


export function Login({ className, ...props }) {
  // ---------- small hook to detect dark mode ----------
  const useIsDarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const getDark = () => {
        const prefers =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        const hasClass =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        setIsDark(hasClass || !!prefers);
      };

      getDark();

      // listen for OS preference changes
      const mq =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)");
      const mqListener = (e) => {
        setIsDark(
          document.documentElement.classList.contains("dark") || (!!e && e.matches)
        );
      };

      if (mq) {
        if (mq.addEventListener) mq.addEventListener("change", mqListener);
        else if (mq.addListener) mq.addListener(mqListener);
      }

      // observe changes to <html class=""> (Tailwind 'dark' class toggles)
      let mo;
      if (typeof document !== "undefined" && window.MutationObserver) {
        mo = new MutationObserver(() => {
          const hasClass = document.documentElement.classList.contains("dark");
          const prefers =
            window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
          setIsDark(hasClass || !!prefers);
        });
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      }

      return () => {
        if (mq) {
          if (mq.removeEventListener) mq.removeEventListener("change", mqListener);
          else if (mq.removeListener) mq.removeListener(mqListener);
        }
        if (mo) mo.disconnect();
      };
    }, []);

    return isDark;
  };
  // ----------------------------------------------------

  const isDarkMode = useIsDarkMode();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginMutation = useLogin();

  const isUserLoggedIn = localStorage.getItem("token");
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (res) => {
          toast.success("OTP Sent Successfully!");
          navigate("/otpverification", {
            state: { contact: res?.conatct, masked_contact: res?.contact_01 },
          });
        },
        onError: (err) => {
          console.error("Login error:", err);
          setErrorMessage("Invalid username or password. Please try again.");
        },
      }
    );
  };

  // NOTE: sendOtpMutation referenced in forgot view is not defined in the snippet you shared.
  // If you have it in your original file, keep it; otherwise add that mutation (useSendOtp or similar).
  // For safety, avoid referencing undefined variable here.
  const sendOtpMutation = { isPending: false }; // temporary fallback if not provided

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden ",
        className
      )}
      {...props}
    >
      {loginMutation.isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-theme w-full h-full">
        <Card className="relative z-20 flex h-full w-full rounded-none p-10 bg-background-gradient">
          {/* Left side illustration */}
          <div className="hidden md:flex flex-col w-[60%] h-full items-center justify-center">
            <img src={login_illustrations} alt="Login illustration" className="max-w-[50%]" />
            <h2 className="text-2xl font-bold mt-6">Custom Modules, Infinite Possibilities</h2>
            <p className="max-w-md text-center mt-4 md:mt-3 px-10 text-sm">
              Our loyalty platform engages channel partners with QR-based apps, customizable
              modules, flexible redemptions, real-time tracking, and personalized rewards—easy to
              use, flexible, and designed to keep partners motivated and performing.
            </p>
          </div>

          {/* Right side form */}
          <CardContent className="relative z-20 flex overflow-y-auto flex-1 h-full items-center justify-center bg-login-form backdrop-blur-lg border border-slate-200 text-foreground md:rounded-3xl shadow-2xl">
            <form onSubmit={isForgotPassword ? () => { } : handleLogin} className="w-full max-w-md space-y-18 px-8 md:px-4">
              {/* Header */}
              <div className="flex flex-col items-center text-center space-y-auto">
                {/* switch logo based on dark mode */}
                <img src={isDarkMode ? logoWhite : logo} alt="Basiq360" className="w-28 h-auto mb-2" />

                <GradientText
                  colors={["#B7B9B9", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  // colors={["#4079ff"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class rounded-none"
                >

                  <h1 className="text-3xl mt-3 font-semibold tracking-tight">
                    {isForgotPassword ? "Reset Password" : "Welcome Back"}
                  </h1>
                </GradientText>
                <p className="text-muted-foreground  text-sm">
                  {isForgotPassword
                    ? "Enter your email to receive an OTP for password reset"
                    : "Login to your Stark Paints account"}
                </p>
              </div>

              {!isForgotPassword ? (
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-primary"
                      >
                        {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                      </button>
                    </div>
                  </div>

                  {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>

                  <p className="text-center">
                    Powered by <span className="underline text-blue cursor-pointer">AbacusDesk</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
                  </div>

                  <Button type="submit" className="w-full" disabled={sendOtpMutation.isPending}>
                    {sendOtpMutation.isPending ? "Sending OTP..." : "Send OTP"}
                  </Button>

                  <button type="button" onClick={() => setIsForgotPassword(false)} className="text-sm underline-offset-2 hover:underline block mx-auto">
                    Back to Login
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

