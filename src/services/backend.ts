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

  getUser = async () => {
    try {
      // IMPORTANT: We don't have currently backend hence we return data to localstorage

      // const response = await fetch(`${this.baseUrl}/user`, {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // });
      // return await this.handleResponse(response);

      return localStorage.getItem("user");
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  };

  createUser = async (data: any) => {
    try {
      // IMPORTANT: We don't have currently backend hence we add data to localstorage

      // const response = await fetch(`${this.baseUrl}/user`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // return await this.handleResponse(response);

      localStorage.setItem("user", data);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  };
}

const backend = new Backend("https://no-backend-dummy.com");

export default backend;
