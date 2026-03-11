// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useLoginDetails, useSendOtp, useVerifyOtp } from "./useData";
// import { useParams } from "react-router-dom";

// import logo from "../../../public/logo.png";
// // import logoDark from "../../../public/logo-White.png";
// import login_illustrations from "../../assets/images/login_illustrations.png";
// import { useGetAllModule } from "../Roles&Permission/Designation/useData";
// // import { useTheme } from "../../utils/ThemeProvider"
// export default function OtpVerification({ className, ...props }) {
//   const [contact, setContact] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("enterOtp");
//   const [error, setError] = useState("");
//   const location = useLocation();


//   const navigate = useNavigate();

//   useEffect(() => {
//     if (otp?.length == 6) {
//       handleVerifyOtp()
//     }
//   }, [otp])

//   const sendOtpMutation = useSendOtp();
//   const { mutate: verifyOtpMutation } = useVerifyOtp();
//   const { data: loginDetails, refetch: fetchLoginDetails } = useLoginDetails();
//   const { fetchModules, moduleData, fetchModulesAsync } = useGetAllModule();
//   //  const { theme } = useTheme();

//   //   const isDark =
//   //   theme === "dark" ||
//   //   (theme === "system" &&
//   //     window.matchMedia("(prefers-color-scheme: dark)").matches);

//   const handleFetch = async () => {
//     const result = await fetchLoginDetails();
    
//     if (result?.data) {
//       console.log('✅ response ===> ', result.data);
//       localStorage.setItem("loginDetails", JSON.stringify(result.data?.data));
//     } else if (result?.error) {
//       console.error('error ===> ', result.error);
//     }
    
//     const moduleResult = await fetchModulesAsync({filter:{}})

//     console.log('moduleResult ==> ', moduleResult)

//     if(moduleResult?.data){
//       localStorage.setItem('modules', JSON.stringify(moduleResult?.data))
//     }

//   };

//   const handleSendOtp = (e) => {
//     if(e) e.preventDefault();
    
//     setError("");
//     sendOtpMutation.mutate(
//       { contact_01: location?.state?.contact },
//       {
//         onSuccess: (data) => {
//           setStep("enterOtp");
//         },

//         onError: (err) => {
//           console.error("Send OTP error:", err);
//           setError(err?.response?.data?.message || err.message || "Failed to send OTP");
//         }

//       }
//     );
//   };

//   const handleVerifyOtp = () => {
//     // e.preventDefault();
//     setError("");
//     verifyOtpMutation(
//       { contact_01: location?.state?.contact, otp: String(otp) },
//       {
//         onSuccess: (res) => {
//           const token = res.accessToken;
//           if (token) {
//             localStorage.setItem("token", token);
//           }

//           handleFetch()

//           navigate("/dashboard");
//         },
//         onError: (err) => {
//           console.log(err)
//           setError(err?.response?.data?.message || "Invalid OTP");
//         }
//       }
//     );
//   };

//   return (
//     <div
//       className={cn(
//         "relative flex h-screen w-full items-center justify-center overflow-hidden",
//         className
//       )}
//       {...props}
//     >
//       <div className="absolute inset-0 bg-gradient-theme w-full h-full" />

//       <Card className="relative z-20 flex h-full w-full rounded-none p-10 bg-background-gradient">
//         {/* Illustration */}
//         <div className="hidden md:flex flex-col w-[60%] h-full items-center justify-center">
//           <img
//             src={login_illustrations}
//             alt="Login illustration"
//             className="max-w-[50%]"
//           />
//           <h2 className="text-2xl font-bold mt-6">
//             Custom Modules, Infinite Possibilities
//           </h2>
//           <p className="max-w-md text-center mt-4 md:mt-3 px-10 text-sm">
//             Our loyalty platform engages channel partners with QR-based apps,
//             customizable modules, flexible redemptions, real-time tracking, and
//             personalized rewards—easy to use, flexible, and designed to keep
//             partners motivated and performing.
//           </p>
//         </div>

//         {/* OTP form section */}
//         <CardContent className="relative z-20 flex flex-1 h-full items-center justify-center  bg-login-form  backdrop-blur-lg border border-slate-200 text-foreground md:rounded-3xl shadow-2xl">
//           {step === "enterContact" ? (
//             <form
//               onSubmit={handleSendOtp}
//               className="w-full max-w-md space-y-8 px-6 md:px-0"
//             >
//               <div className="flex flex-col items-center text-center space-y-2">
//                 <img src={logo} alt="Basiq360" className="max-w-[50%]" />
//                 <h1 className="text-2xl font-bold">OTP Verification</h1>
//                 <p className="text-muted-foreground">
//                   Enter your phone number to receive OTP
//                 </p>
//               </div>

//               <div className="grid gap-3 mt-6">
//                 <Label htmlFor="contact">Phone Number</Label>
//                 <Input
//                   id="contact"
//                   type="tel"
//                   placeholder="+91XXXXXXXXXX"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   required
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-primary text-primary-foreground"
//                 disabled={sendOtpMutation.isPending}
//               >
//                 {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
//               </Button>

//               {error && <p className="text-red-500 text-sm">{error}</p>}
//             </form>
//           ) : (
//             <form
//               onSubmit={handleVerifyOtp}
//               className="w-full max-w-md space-y-8 md:px-0"
//             >
//               <div className="flex flex-col items-center text-center space-y-2">
//                 <img src={logo} alt="Basiq360" className="h-12 mb-2" />
//                 <h1 className="text-2xl font-bold">Enter OTP</h1>
//                 <p className="text-accent-foreground">
//                   We sent a code to {location?.state?.masked_contact}
//                 </p>
//               </div>

//               <div className="flex justify-center mt-6 text-foreground">
//                 <InputOTP
//                   maxLength={6}
//                   value={otp}
//                   onChange={(value) => {
//                     setOtp(String(value))
//                   }}
//                 >
//                   <InputOTPGroup className="flex gap-3 justify-between flex-1  ">
//                     {Array.from({ length: 6 }).map((_, i) => (
//                       <InputOTPSlot
//                         key={i}
//                         index={i}
//                         className="w-12 h-12 text-lg  font-semibold border-slate-300 rounded-xl text-center text-black focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all bg-white shadow-sm hover:border-primary/60"
//                       />
//                     ))}
//                   </InputOTPGroup>
//                 </InputOTP>
//               </div>

//               <div>
//                 <button type='button' onClick={handleSendOtp}>Resend OTP</button>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-primary text-primary-foreground"
//                 disabled={verifyOtpMutation.isPending}
//               >
//                 {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
//               </Button>

//               {error && (
//                 <p className="text-red-500 text-sm text-center">{error}</p>
//               )}
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginDetails, useSendOtp, useVerifyOtp } from "./useData";
import { useGetAllModule } from "../Roles&Permission/Designation/useData";

import logo from "../../../public/logo.png";
import logoWhite from "../../../public/logo-White.png";
import login_illustrations from "../../assets/images/login_illustrations.png";

export default function OtpVerification({ className, ...props }) {
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

  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enterOtp");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (otp?.length === 6) {
      handleVerifyOtp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const sendOtpMutation = useSendOtp();
  const { mutate: verifyOtpMutation, isLoading: isVerifying } = useVerifyOtp();
  const { data: loginDetails, refetch: fetchLoginDetails } = useLoginDetails();
  const { fetchModulesAsync } = useGetAllModule();

  const handleFetch = async () => {
    try {
      const result = await fetchLoginDetails();

      if (result?.data) {
        localStorage.setItem("loginDetails", JSON.stringify(result.data?.data));
      }

      const moduleResult = await fetchModulesAsync({ filter: {} });
      if (moduleResult?.data) {
        localStorage.setItem("modules", JSON.stringify(moduleResult?.data));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);


  const handleSendOtp = (e) => {
    if (e) e.preventDefault();

    setError("");
    sendOtpMutation.mutate(
      { contact_01: location?.state?.contact || contact },
      {
        onSuccess: () => {
          setStep("enterOtp");
        },
        onError: (err) => {
          console.error("Send OTP error:", err);
          setError(err?.response?.data?.message || err.message || "Failed to send OTP");
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    setError("");
    verifyOtpMutation(
      { contact_01: location?.state?.contact || contact, otp: String(otp) },
      {
        onSuccess: (res) => {
          const token = res.accessToken;
          if (token) {
            localStorage.setItem("token", token);
          }

          handleFetch();
        
          navigate("/dashboard", { replace: true });

        },

        
        onError: (err) => {
          console.log("Verify error:", err);
          setError(err?.response?.data?.message || "Invalid OTP");
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-theme w-full h-full" />

      <Card className="relative z-20 flex h-full w-full rounded-none p-10 bg-background-gradient">
        {/* Illustration */}
        <div className="hidden md:flex flex-col w-[60%] h-full items-center justify-center">
          <img src={login_illustrations} alt="Login illustration" className="max-w-[50%]" />
          <h2 className="text-2xl font-bold mt-6">Custom Modules, Infinite Possibilities</h2>
          <p className="max-w-md text-center mt-4 md:mt-3 px-10 text-sm">
            Our loyalty platform engages channel partners with QR-based apps, customizable
            modules, flexible redemptions, real-time tracking, and personalized rewards—easy to use,
            flexible, and designed to keep partners motivated and performing.
          </p>
        </div>

        {/* OTP form section */}
        <CardContent className="relative z-20 flex flex-1 h-full items-center justify-center bg-login-form backdrop-blur-lg border border-slate-200 text-foreground md:rounded-3xl shadow-2xl">
          {step === "enterContact" ? (
            <form onSubmit={handleSendOtp} className="w-full max-w-md space-y-8 px-6 md:px-0">
              <div className="flex flex-col items-center text-center space-y-2">
                <img src={isDarkMode ? logoWhite : logo} alt="Basiq360" className="max-w-[50%]" />
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <p className="text-muted-foreground">Enter your phone number to receive OTP</p>
              </div>

              <div className="grid gap-3 mt-6">
                <Label htmlFor="contact">Phone Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                disabled={sendOtpMutation.isPending}
              >
                {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
              </Button>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="w-full max-w-md space-y-8 md:px-0">
              <div className="flex flex-col items-center text-center space-y-2">
                <img src={isDarkMode ? logoWhite : logo} alt="Basiq360" className="h-12 mb-2" />
                <h1 className="text-2xl font-bold">Enter OTP</h1>
                <p className="text-accent-foreground">
                  We sent a code to {location?.state?.masked_contact || contact}
                </p>
              </div>

              <div className="flex justify-center mt-6 text-foreground">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(String(value));
                  }}
                >
                  <InputOTPGroup className="flex gap-3 justify-between flex-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 text-lg font-semibold border-slate-300 rounded-xl text-center text-black focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all bg-white shadow-sm hover:border-primary/60"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div>
                <button type="button" onClick={handleSendOtp} className="underline">
                  Resend OTP
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
