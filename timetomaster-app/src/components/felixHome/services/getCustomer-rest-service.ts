const baseuri = "http://localhost:9001";
export const getCustomer = async <T>(uri: string): Promise<T[]> => {
   const response = await fetch(baseuri + uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: T[] = (await response.json()) as any as T[];
  return data;
};
