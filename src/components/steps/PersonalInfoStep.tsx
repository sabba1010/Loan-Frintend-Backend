import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  sin: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

const provinces = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Accept any format with at least 7 digits
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 7;
};

const validateSIN = (sin: string): boolean => {
  if (sin === "") return true; // Optional field
  return /^\d{9}$/.test(sin);
};

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    sin?: string;
  }>({});

  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    onChange({ ...data, [field]: value });
    
    // Clear error when user starts typing
    setErrors({ ...errors, [field]: undefined });
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (field === "email" && value) {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }
    
    if (field === "phone" && value) {
      if (!validatePhone(value)) {
        newErrors.phone = "Please enter a valid phone number (at least 7 digits)";
      } else {
        delete newErrors.phone;
      }
    }
    
    if (field === "sin" && value) {
      if (!validateSIN(value)) {
        newErrors.sin = "SIN must be 9 digits";
      } else {
        delete newErrors.sin;
      }
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => validateField("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g., (647) 555-0123"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={(e) => validateField("phone", e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="mm/dd/yyyy"
            value={data.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sin">SIN (optional)</Label>
          <Input
            id="sin"
            placeholder="9 digits, numbers only"
            maxLength={9}
            value={data.sin}
            onChange={(e) => handleChange("sin", e.target.value.replace(/\D/g, ""))}
            onBlur={(e) => validateField("sin", e.target.value)}
            className={errors.sin ? "border-red-500" : ""}
          />
          {errors.sin && <p className="text-sm text-red-500">{errors.sin}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street address</Label>
          <Input
            id="streetAddress"
            placeholder=""
            value={data.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder=""
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select value={data.province} onValueChange={(value) => handleChange("province", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal code</Label>
          <Input
            id="postalCode"
            placeholder="A1A 1A1"
            value={data.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value.toUpperCase())}
          />
        </div>
      </div>
    </div>
  );
}
