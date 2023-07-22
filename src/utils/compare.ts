import { cartItemInterface } from "@/types/cart";

export const cartComparison = (arr1: cartItemInterface[], arr2: cartItemInterface[]) => {
    // Step 1: Check if lengths are equal
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Step 2: Sort both arrays based on the 'id' property
    const sortedArr1 = arr1.slice().sort((a, b) => a.id.localeCompare(b.id));
    const sortedArr2 = arr2.slice().sort((a, b) => a.id.localeCompare(b.id));
  
    // Step 3: Compare each object's 'id' and 'count' properties
    for (let i = 0; i < sortedArr1.length; i++) {
      const obj1 = sortedArr1[i];
      const obj2 = sortedArr2[i];
  
      if (obj1.id !== obj2.id || obj1.count !== obj2.count) {
        return false;
      }
    }
  
    // Step 4: Arrays are equal
    return true;
  }