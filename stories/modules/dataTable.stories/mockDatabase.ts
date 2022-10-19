export interface TextData {
  id: number;
  chName: string;
  enName: string;
  contactNumber: string;
  email: string;
  pCode: string;
  city: string;
  gender: string;
  buildTime: string;
  birthdate: string;
}
class TextDatabase {
  constructor() {
    this.generateData();
  }

  data: Array<TextData> = [];

  generateData = () => {
    for (let i: any = 0; i < 200; i++) {
      this.data.push({
        id: i,
        chName: `${i}-Chen X Gen`,
        enName: `${i}-Chen X Gen`,
        contactNumber: `${i}-091XXXXXXX535`,
        email: `${i}-loremipsum@email.com`,
        pCode: `${i}-236`,
        city: `${i}-New Taipei City`,
        gender: `Female`,
        buildTime: `2022-04-27`,
        birthdate: `19-10-1989 | 32 Years Old`,
      });
    }
  };
}

export const TextDB = new TextDatabase();
export interface Data {
  id: number;
  text: string;
  tag: string;
  option: boolean;
  name: string;
  email: string;
  date: string;
  inputText: string;
}
class MockDatabase {
  constructor() {
    this.generateData();
  }

  data: Array<Data> = [];

  generateData = () => {
    for (let i: any = 0; i < 100; i++) {
      this.data.push({
        id: i,
        text: `${i}-Test Event for Users`,
        tag: `${i}-Lorem Inpsum Dolar Sit Amet`,
        option: i % 2 === 0,
        name: `${i}-Lai James`,
        email: `${i}-egroup.james@gmail.com`,
        date: new Date().toLocaleString("en"),
        inputText: `https://www.yourwebsite.com`,
      });
    }
  };

  updateData = (id, newData) => {
    this.data[id] = newData;
  };

  deleteData = (id) => {
    this.data = this.data.filter((d) => d.id !== id);
  };
}

const DB = new MockDatabase();
export default DB;
