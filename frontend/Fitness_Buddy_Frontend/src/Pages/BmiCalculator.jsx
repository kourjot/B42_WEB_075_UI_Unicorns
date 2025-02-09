import React, { useState, useEffect } from "react";
import Navbar from "../Components/Common/Navbar";

const BmiCalculator = () => {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState(1);

  useEffect(() => {
    calculateBmi(height, weight);
  }, [height, weight]);

  const calculateBmi = (h, w) => {
    const bmiValue = parseFloat(w / (h / 100) ** 2).toFixed(2);
    setBmi(bmiValue);

    const categories = [
      [0, 18.49],
      [18.5, 24.99],
      [25, 29.99],
      [30, 34.99],
      [35, 39.99],
      [40, 100],
    ];
    const categoryIndex = categories.findIndex(
      (range) => range[0] <= bmiValue && bmiValue < range[1]
    );
    setBmiCategory(categoryIndex);
  };

  const formatHeight = (h) => {
    const inches = (0.393700787 * h).toFixed(0);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${h} cm / ${feet}' ${remainingInches}"`;
  };

  const formatWeight = (w) => {
    const pounds = (2.2046 * w).toFixed(2);
    return `${w} kg / ${pounds} lb`;
  };

  const categoryDescriptions = [
    "The WHO regards a BMI of less than 18.5 as underweight and may indicate malnutrition, an eating disorder, or other health problems.",
    "A BMI between 18.5 and 25 is considered normal and healthy.",
    "People who fall into this category may be at risk of developing obesity. This was earlier classified as 'overweight'.",
    "People with a BMI over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.",
    "People with a BMI over 35 may be at high risk for health complications.",
    "People with a BMI over 40 are considered to have severe obesity, which significantly increases health risks.",
  ];

  const categories = [
    "Underweight",
    "Normal",
    "Pre-obesity",
    "Obese I",
    "Obese II",
    "Obese III",
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/vector-damask-seamless-pattern-background-classical-luxury-old-fashioned-damask-ornament-royal-victorian-seamless-texture-wallpapers-textile-wrapping-exquisite-floral-baroque-template_1217-738.jpg?ga=GA1.1.2144125845.1737116705&semt=ais_hybrid')",
        }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8 mt-10">
          BMI Calculator
        </h2>

        <div className="max-w-lg mx-auto p-6 bg-transparent backdrop-blur-md shadow-lg rounded-xl border border-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Height
                <input
                  type="range"
                  min="150"
                  max="230"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(e.target.valueAsNumber)}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center text-sm text-gray-300 mt-2">
                  {formatHeight(height)}
                </div>
              </label>

              <label className="block text-sm font-medium text-white mt-4">
                Weight
                <input
                  type="range"
                  min="35"
                  max="200"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.valueAsNumber)}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center text-sm text-gray-300 mt-2">
                  {formatWeight(weight)}
                </div>
              </label>
            </div>

            <div className="text-center text-xl font-semibold my-4 text-white">
              Your BMI Is: <span className="text-blue-400">{bmi}</span>
            </div>

            <div className="space-y-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition duration-300 ${
                    bmiCategory === index
                      ? "bg-blue-600 border-blue-300 text-white shadow-lg"
                      : "bg-transparent border-white text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`bmi-g${index}`}
                      name="bmiCategory"
                      checked={bmiCategory === index}
                      readOnly
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`bmi-g${index}`}
                      className="font-semibold cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                  {bmiCategory === index && (
                    <p className="text-sm text-gray-200 mt-2">
                      {categoryDescriptions[index]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BmiCalculator;
