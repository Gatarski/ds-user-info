import { FormValues } from "../types/types";

class Backend {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private handleResponse = async (response: Response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return response.json();
  };

  getUser = async (): Promise<FormValues | undefined> => {
    try {
      // IMPORTANT: We don't have currently backend hence we return data to localstorage

      // const response = await fetch(`${this.baseUrl}/user`, {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // });
      // return await this.handleResponse(response);

      // We simulate backend delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = localStorage.getItem("user") as string;
          const parsedData = JSON.parse(data) as FormValues;
          resolve(parsedData);
        }, 1000);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`)
      }
    }
  };

  createUser = async (data: FormValues) => {
    try {
      // IMPORTANT: We don't have currently backend hence we add data to localstorage

      // const response = await fetch(`${this.baseUrl}/user`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // return await this.handleResponse(response);

      // We simulate backend delay

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(data));
          resolve(data);
        }, 1000);
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${error}`)
      }
    }
  };
}

const backend = new Backend("https://no-backend-dummy.com");

export default backend;
