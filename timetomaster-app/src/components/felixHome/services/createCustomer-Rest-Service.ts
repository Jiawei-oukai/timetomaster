const baseuri = "http://localhost:9001";
export const createCustomer = async <T>(
  uri: string,
  requestBody: any = {}
): Promise<T[]> => {
  const response = await fetch(baseuri + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM1ZTczMDAyMGJiOTQyMGM3MDI1YzciLCJpc0FkbWluIjpmYWxzZSwidXNlck5hbWUiOiJ0ZXN0NCIsImlhdCI6MTY5MDc1OTI0M30.R8FByo8lhT-P-oUWYcMFCozVguJVQTPSjlK0dJPKPPs",
    },
    body: JSON.stringify(requestBody),
  });
  const data: T[] = (await response.json()) as any as T[];
  return data;
};
