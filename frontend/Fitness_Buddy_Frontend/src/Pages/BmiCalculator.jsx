import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';

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
    "People who fall into this category may be at risk of developing obesity. This was earlier classified as \"overweight\".",
    "People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.",
    "People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health.",
    "People who have BMI equal or over 30 may have obesity, which is defined as an abnormal or excessive accumulation of fat that may harm health."
  ];

  const categories = [
    "Underweight", "Normal", "Pre-obesity", "Obese I", "Obese II", "Obese III"
  ];

  return (
    <>
    <Navbar/>
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-20">
          Add Today's Workout 
        </h2>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl  mb-4">
      
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height
            <input
              type="range"
              min="150"
              max="230"
              step="0.5"
              value={height}
              onChange={(e) => setHeight(e.target.valueAsNumber)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-2">
              {formatHeight(height)}
            </div>
          </label>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Weight
            <input
              type="range"
              min="35"
              max="200"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.valueAsNumber)}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-sm text-gray-600 mt-2">
              {formatWeight(weight)}
            </div>
          </label>
        </div>

        <div className="text-center text-xl font-semibold my-4">
          Your BMI Is: <span className="text-blue-600">{bmi}</span>
        </div>

        <div className="space-y-2">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${
                bmiCategory === index 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'bg-gray-50 border-gray-200'
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
                  className="font-semibold text-gray-800"
                >
                  {category}
                </label>
              </div>
              {bmiCategory === index && (
                <p className="text-sm text-gray-600 mt-2">
                  {categoryDescriptions[index]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BmiCalculator;