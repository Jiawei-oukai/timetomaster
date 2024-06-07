const baseuri = "http://localhost:9001";
export const AuthCustomer = async <T>(
  uri: string,
  requestBody: any = {}
): Promise<T[]> => {
  const response = await fetch(baseuri + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data: T[] = (await response.json()) as any as T[];
  return data;
};
