import bcrypt from "bcrypt";

export const validatePassword = async (plainPassword, hashedPassword) => {
  const validatedPassword = await bcrypt.compare(plainPassword, hashedPassword);
    return validatedPassword;
};
