export type PageComponentName = "Create User" | "Profile" | "About" | "Contact";

export type NavigationItem = { path: string; name: PageComponentName };

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  date: Date | string;
  about?: string;
  image?: string;
};
