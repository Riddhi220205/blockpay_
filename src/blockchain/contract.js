export const subscribe = async (planId) => {
  console.log("Mock subscribe:", planId);

  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};