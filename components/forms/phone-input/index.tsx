// components/PhoneInput.tsx
import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <PhoneInput
        country={"sa"} // Default country
        onlyCountries={[
          'ae', // United Arab Emirates
          'bh', // Bahrain
          'dz', // Algeria
          'eg', // Egypt
          'iq', // Iraq
          'jo', // Jordan
          'kw', // Kuwait
          'lb', // Lebanon
          'ly', // Libya
          'ma', // Morocco
          'om', // Oman
          'ps', // Palestine
          'qa', // Qatar
          'sa', // Saudi Arabia
          'sd', // Sudan
          'sy', // Syria
          'tn', // Tunisia
          'ye', // Yemen
        ]} 
        preferredCountries={['sa']}
        value={value}
        onChange={onChange}
         inputClass="dark:bg-gray-800 text-gray-800 border-gray-700"
         dropdownClass="dark:bg-gray-800 dark:text-gray-800"
        inputProps={{
          required: true,
        }}
        inputStyle={{
          width: "100%",
          height: "35px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
          direction: "ltr",
        }}
        dropdownStyle={{
            direction: "ltr",
            borderRadius: "6px",
            color: "#666",
        }}
        containerStyle={{
            direction: "ltr",
            width: "100%",
        }}
      />
      {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default CustomPhoneInput;
