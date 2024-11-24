export type PageComponentName = "Create User" | "Profile" | "Contact";

export type NavigationItem = {
  path: string;
  name: PageComponentName;
  displayText: string;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  date: Date | string;
  about?: string;
  image?: string;
};

export type LangItem = {
  label: string;
  value: string;
};

export type ProfileViewItem = {
  label: string;
  textContent?: string | Date | Number;
};

export type InputItem = {
  name: string;
  label: string;
  type: "string" | "number" | "date";
  placeholder?: string;
};
