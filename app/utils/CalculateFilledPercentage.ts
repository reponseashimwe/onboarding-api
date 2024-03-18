const calculateFillPercentage = (employee: Record<any, any>) => {
  // Initialize variables
  let totalProperties = 0;
  let filledProperties = 0;

  // Iterate through each property of the employee object
  for (const key in employee) {
    const nestedData = employee[key];

    if (nestedData !== null) {
      if (Array.isArray(nestedData)) {
        if (nestedData.length > 0) {
          if (typeof nestedData[0] === "object") {
            for (let i = 0; i < nestedData.length; i++) {
              for (const k in nestedData[i]) {
                if (nestedData[i][k] !== null) filledProperties += 1;
                totalProperties += 1;
              }
            }
          } else {
            filledProperties += 1;
            totalProperties += 1;
          }
        } else {
          totalProperties += 1;
        }
      } else {
        if (nestedData !== null) filledProperties += 1;
        totalProperties += 1;
      }
    } else {
      totalProperties += 1;
    }
  }

  console.log(filledProperties, totalProperties);

  // Calculate and return the fill percentage
  return (filledProperties / totalProperties) * 100;
};

function notEmpty(value: any) {
  return value != "" && value !== null && value.length > 0;
}

export default calculateFillPercentage;
