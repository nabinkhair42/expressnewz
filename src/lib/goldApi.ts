export interface MetalPrices {
    goldPrice: number;
    silverPrice: number;
    timestamp: string;
  }
  
  export const fetchMetalPrices = async (): Promise<MetalPrices | null> => {
    const API_KEY = process.env.NEXT_PUBLIC_METALPRICE_API_KEY;
    const url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=NPR&currencies=NPR,XAU,XAG`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const goldPrice = data.rates.NPRXAU;
      const silverPrice = data.rates.NPRXAG;
      const timestampInSeconds = data.timestamp; // Assuming timestamp is in seconds
      const time = new Intl.DateTimeFormat("ne-NP", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(timestampInSeconds * 1000)); // Convert to milliseconds
  
      return {
        goldPrice,
        silverPrice,
        timestamp: time,
      };
    } catch (error) {
      console.error("Error fetching metal prices:", error);
      return null;
    }
  };
  