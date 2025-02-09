import React, { createContext, useContext, useState } from 'react';

interface NutritionContextType {
  totalCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  addNutrition: (nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  }) => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(
  undefined
);

export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const addNutrition = (nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  }) => {
    setTotalCalories((prev) => prev + nutrition.calories);
    setProtein((prev) => prev + nutrition.protein);
    setCarbs((prev) => prev + nutrition.carbohydrates);
    setFats((prev) => prev + nutrition.fat);
  };

  return (
    <NutritionContext.Provider
      value={{ totalCalories, protein, carbs, fats, addNutrition }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
