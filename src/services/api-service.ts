import axios from "axios";

class UserApi {
  async buyHouse(homeId: number, userId: string, price: number) {
    const response = await axios.post("https://pablohouse.su:88/buyHome", {
      homeId: homeId,
      userId: userId,
      price: price,
    });
    //@ts-ignore
    return response.data.message;
  }

  async getHouses() {
    try {
      const response = await axios.get("https://pablohouse.su:88/getHomes");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async get(id: string) {
    try {
      const response = await axios.get(
        `https://pablohouse.su:8080/user/get/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBalance(id: string, balance: number) {
    try {
      const response = await axios.put(
        `https://pablohouse.su:8080/user/updateBalance/${id}`,
        {
          balance: balance,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateGems(id: string, gems: number) {
    try {
      const response = await axios.put(
        `https://pablohouse.su:8080/user/updateGems/${id}`,
        {
          gems: gems,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateKeys(id: string, keys: number) {
    try {
      const response = await axios.put(
        `https://pablohouse.su:8080/user/updateKeys/${id}`,
        {
          keys: keys,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserApi();
