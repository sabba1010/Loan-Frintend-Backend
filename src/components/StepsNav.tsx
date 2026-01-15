// import { Check } from "lucide-react";

// interface StepsNavProps {
//   currentStep: number;
// }

// const steps = ["Personal", "Employment", "Loan", "Uploads"];

// export function StepsNav({ currentStep }: StepsNavProps) {
//   return (
//     <div className="flex items-center justify-between mb-6">
//       {steps.map((label, i) => {
//         const stepNum = i + 1;
//         const isActive = currentStep === stepNum;
//         const isDone = currentStep > stepNum;
        
//         return (
//           <div key={label} className="flex flex-col items-center flex-1">
//             <div className="flex items-center w-full">
//               {i > 0 && (
//                 <div 
//                   className={`flex-1 h-0.5 transition-colors duration-300`}
//                   style={{ backgroundColor: currentStep > i ? "#00A63E" : "var(--border)" }}
//                 />
//               )}
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
//                   isDone
//                     ? "text-white"
//                     : isActive
//                     ? "text-primary-foreground ring-4"
//                     : "bg-muted text-muted-foreground"
//                 }`}
//                 style={isDone ? { backgroundColor: "#00A63E" } : isActive ? { backgroundColor: "#0066CC", boxShadow: "0 0 0 4px rgba(0, 102, 204, 0.2)" } : undefined}
//               >
//                 {isDone ? <Check className="w-4 h-4" /> : stepNum}
//               </div>
//               {i < steps.length - 1 && (
//                 <div 
//                   className={`flex-1 h-0.5 transition-colors duration-300`}
//                   style={{ backgroundColor: currentStep > stepNum ? "#00A63E" : "var(--border)" }}
//                 />
//               )}
//             </div>
//             <span 
//               className={`text-xs mt-2 font-medium transition-colors ${
//                 isActive || isDone ? "text-foreground" : "text-muted-foreground"
//               }`}
//             >
//               {label}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { Check } from "lucide-react";

interface StepsNavProps {
  currentStep: number;
}

const steps = ["Personal", "Employment", "Loan", "Uploads"];

export function StepsNav({ currentStep }: StepsNavProps) {
  return (
    <div className="relative w-full mb-10">
      {/* Background Connecting Line */}
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-10" />
      
      {/* Active/Completed Progress Line */}
      <div 
        className="absolute top-4 left-0 h-0.5 bg-green-600 transition-all duration-500 -z-10"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      <div className="flex justify-between">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;

          return (
            <div key={label} className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 z-10 ${
                  isDone
                    ? "text-white bg-green-600"
                    : isActive
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : stepNum}
              </div>

              {/* Label */}
              <span
                className={`text-xs mt-3 font-medium absolute translate-y-8 ${
                  isActive ? "text-slate-900 font-bold" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
