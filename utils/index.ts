import { faker } from "@faker-js/faker";

// prettier-ignore
const colors = ["#958DF1", "#F98181", "#FBBC88", "#FAF594", "#70CFF8", "#94FADB", "#B9F18D", "#C3E2C2", "#EAECCC", "#AFC8AD", "#EEC759", "#9BB8CD", "#FF90BC", "#FFC0D9", "#DC8686", "#7ED7C1", "#F3EEEA", "#89B9AD", "#D0BFFF", "#FFF8C9", "#CBFFA9", "#9BABB8", "#E3F4F4"];

export function getDefaultContent() {
  return /* html */ `
  <h1>Welcome to Vue Fes Japan へようこそ 👋</h1>
  <p>
    This is a collaborative document. Feel free to edit and collaborate in real time!
    <br>
    これは共同作業用のドキュメントです。自由に編集し、リアルタイムで共同作業してください!
  </p>
  <p>
    <br>
    <br>
  </p>
`;
}

export function getRandomUser() {
  return {
    name: faker.person.fullName(),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}
